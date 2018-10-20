import request from 'core/request/request';

export function logout() {
    return request('/logout', 'GET');
}
