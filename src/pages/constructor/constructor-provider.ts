import request from 'core/request/request';
import PageCut from 'types/pagecut';

export function createPage(body: PageCut) {
    return request('/qr/create', 'POST', body);
}
export function editPage(body: PageCut, id: string) {
    return request(`/qr/${id}/edit`, 'POST', body);
}

export function getPage(id: string) {
    return request(`/qr/${id}`, 'GET');
}
