import request from 'core/request/request';

export function getQr(id: string) {
    return request('/qr/'+ id);
}

export function sendPush(id: string) {
    return request('/push/'+ id);
}
