import 'whatwg-fetch';
import {backendUrl} from '../../../core/config/config';

export function deletePage(id: string) {
    return fetch(`${backendUrl}/qr/${id}/delete`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: "cors",
        credentials: "include"
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
        return;
    });
}
