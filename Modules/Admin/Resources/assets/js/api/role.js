import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoleList() {
	return request({
		url: '/api/admin/role/list',
		method: 'get'
	})
}

export function getAllPermissions() {
  return request({
    url: '/api/admin/permissions',
    method: 'get'
  })
}


export function getRoles(filter) {
	return request({
		url: '/api/admin/role',
		method: 'get',
		params: filter
	})
}

export function getRole(id) {
	return request({
		url: '/api/admin/role/'+id,
		method: 'get'
	})
}

export function addRole(data) {
  return request({
    url: '/api/admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/api/admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/admin/role/${id}`,
    method: 'delete'
  })
}
