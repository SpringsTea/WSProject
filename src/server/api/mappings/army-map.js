'use-strict';

/**
 * NOTE: This mapping is an incomplete example meant to represent how the 
 * mapping will function when enabled.
 * 
 * This file maps specific cards as "army" cards, or cards that are valid in 
 * Neo-Standard decks at a quantity greater than the standard of 4.
 * 
 * Cards are mapped by their Card No. (without any art-variant indicator) 
 * to their legal maximum quantity. 
 * 
 * Cards with unlimited legal quantites are mapped to: -1
 * 
 */

module.exports = {
    "AOT/S50-088": -1, // "Pursuit" Titan
    "AOT/S50-095": -1, // "Predation" Titan
    "SY/WE09-019": 8   // Endless Eight
}