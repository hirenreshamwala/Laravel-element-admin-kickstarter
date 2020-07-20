import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
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
