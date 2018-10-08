import 'whatwg-fetch';
import {backendUrl} from '../../core/config/config';

export function getPages() {
    return fetch(backendUrl + '/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: "cors",
        credentials: "include"
    });
}
