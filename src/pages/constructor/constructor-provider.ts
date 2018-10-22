import request from 'core/request/request';
import PageCut from 'types/pagecut';
import PageFull from 'types/pagefull';

export function createPage(body: PageCut) {
    return request('/qr/create', 'POST', body);
}
export function createContainer(body: PageFull) {
    return request('/qr/container/create', 'POST', body);
}
export function editContainer(body: PageFull, id: string) {
    return request(`/qr/container/${id}/edit`, 'POST', body);
}
export function editPage(body: PageCut, id: string) {
    return request(`/qr/${id}/edit`, 'POST', body);
}

export function getPage(id: string) {
    return request(`/qr/${id}`, 'GET');
}
