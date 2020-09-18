import Vue from 'vue'
import request from '@/utils/request'

export function login(data) {
    return axios.post('/api/admin/login',data);
  // return request({
  //   url: '/api/admin/login',
  //   method: 'post',
  //   data
  // })
}
export function fetchUser(id) {
    return request({
        url: `/api/admin/user/${id}`,
        method: 'get'
    })
}
export function fetchList(query) {
    return request({
        url: '/api/admin/user',
        method: 'get',
        params: query
    })
}
export function create(data) {
    return request({
        url: '/api/admin/user',
        method: 'post',
        data
    });
}
export function update(id, data) {
    return request({
        url: `/api/admin/user/${id}`,
        method: 'put',
        data
    });
}
export function destroy(id) {
    return request({
        url: `/api/admin/user/${id}`,
        method: 'delete'
    });
}
export function getInfo(token) {

    if (typeof Vue.prototype.$auth !== 'undefined' && typeof Vue.prototype.$auth.user.user !== 'undefined'){
        return new Promise(function(resolve, reject) {
            resolve({
                data: {
                    roles: Vue.prototype.$auth.roles(),
                    introduction: 'I am '+Vue.prototype.$auth.user.user.name,
                    avatar: Vue.prototype.$auth.avatar(),
                    name: Vue.prototype.$auth.user.user.name,
                    permissions: Vue.prototype.$auth.permissions(),
                    user: Vue.prototype.$auth.user.user
                }
            })
        });
    } else {
		return request({
			url: `/api/admin/info`,
			method: 'get'
		})
    }

}

export function logout() {
  return request({
    url: '/api/admin/logout',
    method: 'post'
  })
}
