'use strict';

// mappings
const neoStandardMap = require('../mappings/neo-standard-map');
const armyMap = require('../mappings/army-map');

module.exports = (deck) => {
    // deck legality object
    let deckLegality = {
        neoLegal: false,
        neoSets: [],
        failReason: "unknown"
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
    for (let card of deck.cards) {
        // build card number (remove variant indicators)
        let cardNumber = `${card.set}/${card.side}${card.release}-${card.sid.replace(/[a-z]/g, '')}`;
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

    // Check for Neo Standard Legality
    let setArray = Array.from(setCodes);
    let neoStandardSets = [];
    for (let neoStandardSet of Object.keys(neoStandardMap)) {
        if (setArray.every(checkSet => neoStandardMap[neoStandardSet].indexOf(checkSet) > -1)) {
            neoStandardSets.push(neoStandardSet);
        };
    }

    if (neoStandardSets.length > 0) {
        deckLegality.neoLegal = true; 
        deckLegality.failReason = "n/a";
        deckLegality.neoSets = neoStandardSets;
    }

    return deckLegality;
};