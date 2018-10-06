import 'whatwg-fetch';
import {backendUrl} from '../../core/config/config';

export function sendCode(code: string) {
    return fetch(backendUrl + '/login/yandex/' + code, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
}
