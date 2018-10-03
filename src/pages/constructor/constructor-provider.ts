import 'whatwg-fetch';
import Page from 'types/page';

export function createPage(body: Page) {
    return fetch('http://https://velox-server.herokuapp.com/qr/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body)
    });
}
