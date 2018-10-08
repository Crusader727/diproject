import 'whatwg-fetch';
import {backendUrl} from '../../core/config/config';

export function sendToken(token: string) {
    return fetch(backendUrl + '/login/yandex', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({token})
    });
}

export function getUser() {
    return fetch(backendUrl + '/getuser', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
    });
}
