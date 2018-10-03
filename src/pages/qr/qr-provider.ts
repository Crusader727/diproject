import 'whatwg-fetch';

export function getQr(id: string) {
    return fetch('http://127.0.0.1:5000/qr/'+ id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
}
