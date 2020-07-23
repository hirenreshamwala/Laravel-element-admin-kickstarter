import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function fetchUser(id) {
    return request({
        url: `/admin/user/${id}`,
        method: 'get'
    })
}
export function fetchList(query) {
    return request({
        url: '/admin/user',
        method: 'get',
        params: query
    })
}
export function create(data) {
    return request({
        url: '/admin/user',
        method: 'post',
        data
    });
}
export function update(id, data) {
    return request({
        url: `/admin/user/${id}`,
        method: 'put',
        data
    });
}
export function destroy(id) {
    return request({
        url: `/admin/user/${id}`,
        method: 'delete'
    });
}
export function getInfo(token) {
    return new Promise(function(resolve, reject) {
        resolve({
            data: {
                roles: Vue.prototype.$auth.roles(),
                introduction: 'I am '+Vue.prototype.$auth.user.user.name,
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name: Vue.prototype.$auth.user.user.name,
                permissions: Vue.prototype.$auth.permissions(),
                user: Vue.prototype.$auth
            }
        })
    });
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
