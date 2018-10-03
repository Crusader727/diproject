import 'whatwg-fetch';

export function getPages() {
    return fetch('http://https://velox-server.herokuapp.com/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
}
