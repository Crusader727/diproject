import 'whatwg-fetch';

export function getQr(id: string) {
    return fetch('https://velox-server.herokuapp.com/qr/'+ id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
}
