import 'whatwg-fetch';
import * as qs from 'qs';
import {backendUrl} from '../../core/config/config';

export function getPages({search, sort, own}: {search?: string, sort?: string, own?: string}) {
    const params = qs.stringify({search, sort, own});
    return fetch(`${backendUrl}/${params}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: "cors",
        credentials: "include"
    });
}
