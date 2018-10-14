import request from 'core/request/request';
import Page from 'types/page';

export function createPage(body: Page) {
    return request('/qr/create', 'POST', body);
}
export function editPage(body: Page, id: string) {
    return request(`/qr/${id}/edit`, 'POST', body);
}

export function getPage(id: string) {
    return request(`/qr/${id}`, 'GET');
}
