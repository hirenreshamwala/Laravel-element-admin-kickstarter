import request from '@/utils/request'


export function fetchUser(id) {
    return request({
        url: `/api/admin/customer/${id}`,
        method: 'get'
    })
}
export function fetchList(query) {
    return request({
        url: '/api/admin/customer',
        method: 'get',
        params: query
    })
}
export function create(data) {
    return request({
        url: '/api/admin/customer',
        method: 'post',
        data
    });
}
export function update(id, data) {
    return request({
        url: `/api/admin/customer/${id}`,
        method: 'put',
        data
    });
}
export function destroy(id) {
    return request({
        url: `/api/admin/customer/${id}`,
        method: 'delete'
    });
}
