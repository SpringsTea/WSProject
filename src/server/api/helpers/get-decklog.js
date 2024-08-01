'use strict';

import axios from 'axios';
import { DECKLOG } from '../../config/Bushiroad';

module.exports = async(decklogid) => {

    const decklogdataurl = `${DECKLOG}/system/app/api/view/${decklogid}`;
    const decklogreferer = `${DECKLOG}/view/${decklogid}`;

    const headers = {
        'Referer': decklogreferer
    }

    const request = axios.post(decklogdataurl, {}, {
        headers
    })
    .then(({data}) => {
        return data;
    })

    return request;
}