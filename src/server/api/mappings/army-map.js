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
    "SY/WE09-019": 8,  // Endless Eight
    "KC/S25-166": -1,  // Maruyu, Type 3 Submerged Transport Ship
    "RG/W26-023": -1,  // Sisters
    "GG/S23-087": -1,  // Whalesquid
    "SG/W19-038": -1,  // Noise (Episode 4)
    "KS/W55-089": -1,  // "Walking on the Street" Axis Cultist
    "KI/S44-015": -1,  // Goromin
    "DG/S02-038": -1,  // Prinny
    "DG/S02-T02": -1,  // Prinny again
    "PY/S38-078": -1,  // Red Puyo
    "FXX/S57-014": -1, // Mass-Produced Franxx
    "TF/S32-084": -1,  // "Abominable Being" Terraformar
    "PD/S29-046": 8,   // Hatsune Miku "Conflict"
    "GL/S52-094": -1,  // Mugann
    "RZ/S55-015": -1,  // Fingertips
    "KS/W49-057": -1,  // Cabbage
}