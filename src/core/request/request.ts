import 'whatwg-fetch';
import {backendUrl} from 'core/config/config';

type MethodType = 'GET' | 'POST' | 'DELETE';

function request(url: string, method?: MethodType, body?: any) {
    return fetch(backendUrl + url, {
        method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(body)
    }).then((res) => {
        if (!res.ok) {
            throw new Error;
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json();
        }
        return res.text();
    });
}

export default request;