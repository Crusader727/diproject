import 'whatwg-fetch';
import Page from 'types/page';

export function createPage(body: Page) {
    return fetch('https://velox-server.herokuapp.com/qr/create', {
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
    return fetch(`https://velox-server.herokuapp.com/qr/${id}/edit`, {
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
