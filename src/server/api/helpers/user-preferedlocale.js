'use strict';
//Given an array of card documents and the users config settings, locales are removed to meet locale requirments

module.exports = (cards, { preferredlocale = 'EN' }) => {	
    return cards.map((c) => ({
        ...c.toObject(),
        locale: !!c.locale[preferredlocale].name ? {[preferredlocale] : c.locale[preferredlocale]} : c.locale
    }))
}