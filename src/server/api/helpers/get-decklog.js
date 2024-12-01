'use strict';

import axios from 'axios';
import { DECKLOG_EN, DECKLOG_JP } from '../../config/Bushiroad';

module.exports = async(decklogid, lang = 'EN') => {

    const DECKLOG = lang === 'EN' ? DECKLOG_EN : DECKLOG_JP;

    const decklogdataurl = `${DECKLOG}/system/${lang === 'EN' ? 'app-ja' : 'app'}/api/view/${decklogid}`;
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