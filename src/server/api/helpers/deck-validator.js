'use strict';

// mappings
const armyMap = require('../mappings/army-map');

const checkNeoStandard = require('./get-neo-standard-sets');

module.exports = async(deck, carddata) => {
    // deck legality object
    let deckLegality = {
        deckvalid: false,
        neoLegal: false,
        neoSets: [],
        failReason: null
    };

    // check card array length
    if (!(deck.cards.length === 50)) {
        deckLegality.failReason = "Deck did not contain 50 cards.";
        return deckLegality;
    } 

    // check deck for card limits
    let cardCount = {};
    let cxCount = 0;
    let setCodes = new Set();
    for (let cardID of deck.cards) {

        //get card data from ID
        let card = carddata.find( c => c._id == cardID );

        //If the cardID dosnt exist something has gone really wrong
        if (!card || card === undefined){
            deckLegality.failReason = `Card could not be found: ${cardID}`;
            return deckLegality;
        }

        // build card number (remove variant indicators)
        let cardNumber = `${card.set}/${card.side}${card.release}-${card.sid.replace(/[a-z]$/g, '')}`;
        // add card set to Set 
        setCodes.add(card.set);
        // check if card count has exceeded standard of 4
        if (cardCount[cardNumber] === undefined || cardCount[cardNumber] < 4) {
            cardCount[cardNumber] = cardCount[cardNumber] ? cardCount[cardNumber] + 1 : 1;
            // count climaxes
            if (card.cardtype == "CX") {
                cxCount++;
            }
        } else {
            // if the card number is in the army map, evaluate
            if (armyMap[cardNumber] !== undefined) {
                // check unlimited flag
                if (armyMap[cardNumber] === -1) {
                    cardCount[cardNumber] = cardCount[cardNumber] ? cardCount[cardNumber] + 1 : 1;
                } 
                // else, there is a defined limit
                else {
                    // If card is not over specified limit, count
                    if (cardCount[cardNumber] < armyMap[cardNumber]) {
                        cardCount[cardNumber] = cardCount[cardNumber] ? cardCount[cardNumber] + 1 : 1;
                    } 
                    // else, deck is not legal
                    else {
                        deckLegality.failReason = card.name + " (" + cardNumber + ") was over per-card limit.";
                        return deckLegality;
                    }
                }
            }
            // else, deck is not legal
            else {
                deckLegality.failReason = cardNumber + " was over per-card limit.";
                return deckLegality;
            }
        }
    }

    // check if climaxes exceed maximum of 8
    if (cxCount > 8) {
        deckLegality.failReason = "Too many Climax cards.";
        return deckLegality;
    }

    // Deck has passed all valid checks
    deckLegality.deckvalid = true;

    // Check for Neo Standard Legality
    let setArray = Array.from(setCodes);

    let neoStandardSets = await checkNeoStandard(setArray);

    if (neoStandardSets.length > 0) {
        deckLegality.neoLegal = true; 
        deckLegality.neoSets = neoStandardSets.map( (set) => set._id );
    }
    else{
        deckLegality.failReason = `Sets not neo legal: ${setArray.join(',')}`
    }

    return deckLegality;
};