import * as qs from 'qs';
import request from 'core/request/request';

export function getPages({search, sort, own}: {search?: string, sort?: string, own?: string}) {
    const params = qs.stringify({search, sort, own}, {addQueryPrefix: true});
    return request(`/${params}`);
}
