'use strict';

import NeoSet from '../models/neoset'

module.exports = async (setcodes) => {
    try {
        let neosets = NeoSet.find(
            {setcodes: {$all : setcodes}, enabled: true}, 
            'setcodes name'
        )

        await neosets.exec();

        return neosets;
    } catch (error) {
        console.log(error);
        return [];
    }
}