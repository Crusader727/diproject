import request from 'core/request/request';

export function sendToken(token: string) {
    return request('/login/yandex', 'POST', {token});
}

export function getUser() {
    return request('/getuser');
}
