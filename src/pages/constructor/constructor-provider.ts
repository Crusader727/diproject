import 'whatwg-fetch';
import {backendUrl} from '../../core/config/config';
import Page from 'types/page';

export function createPage(body: Page) {
    return fetch(backendUrl + '/qr/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body)
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
        return res.json();
    });
}
export function editPage(body: Page, id: string) {
    return fetch(`${backendUrl}/qr/${id}/edit`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body)
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
    });
}

export function getPage(id: string) {
    return fetch(`${backendUrl}/qr/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
        return res.json();
    });
}
