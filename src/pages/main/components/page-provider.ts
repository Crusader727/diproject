import request from 'core/request/request';

export function deletePage(id: string) {
    return request(`/qr/${id}/delete`, 'DELETE');
}
