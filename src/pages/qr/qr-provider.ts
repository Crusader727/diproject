import 'whatwg-fetch';
import {backendUrl} from '../../core/config/config';

export function getQr(id: string) {
    return fetch(backendUrl + '/qr/'+ id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: "cors",
        credentials: "include"
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
        return res.json();
    });
}
