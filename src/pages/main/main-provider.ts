import 'whatwg-fetch';

export function getPages() {
    return fetch('http://127.0.0.1:5000/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
}
