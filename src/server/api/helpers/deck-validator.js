'use strict';

const neoStandardMap = require('../mappings/neo-standard-map');

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
    let armyCheck = {};
    let setCodes = new Set();
    for (let card of deck.cards) {
        // Add card set to Set (LOL)
        setCodes.add(card.set);
        if (cardCount[card.name] === undefined || cardCount[card.name] < 4) {
            cardCount[card.name] = cardCount[card.name] ? cardCount[card.name] + 1 : 1;
            // count climaxes
            if (card.cardtype == "CX") {
                cxCount++;
            }
        } else {
            // check if card is army if we haven't already
            if (armyCheck[card.name] === undefined) {
                armyCheck[card.name] = false;
                if (card.ability.toString().indexOf("You can put any number of cards with the same card name as this card into your deck.") > -1) {
                    // card is legal for multiple insert
                    armyCheck[card.name] = true;
                }
            }
            // evaluate if card is flagged as army
            if (armyCheck[card.name]) {
                cardCount[card.name] = cardCount[card.name] ? cardCount[card.name] + 1 : 1;
            } 
            else {
                deckLegality.failReason = card.name + " was over per-card limit.";
                return deckLegality;
            }
        }
    }

    if (cxCount !== 8) {
        deckLegality.failReason = "This deck didn't contain 8 climax cards.";
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