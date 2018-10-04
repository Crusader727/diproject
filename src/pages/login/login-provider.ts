import 'whatwg-fetch';

export function sendCode(code: string) {
    return fetch('https://velox-server.herokuapp.com/login/yandex/' + code, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    });
}
