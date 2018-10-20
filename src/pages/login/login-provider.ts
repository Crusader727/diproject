import request from 'core/request/request';

export function sendToken(token: string, service: string) {
    return request('/login/' + service, 'POST', {token});
}

export function getUser() {
    return request('/getuser');
}
