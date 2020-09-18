import { asyncRoutes, constantRoutes } from '@/router'
import { getInfo } from '@/api/user'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, permissions, route) {
    if(roles.indexOf('Super Admin') !== '-1'){
        return true;
    }
    if (route.meta && route.meta.roles) {
        if(route.meta.permission && permissions.indexOf(route.meta.permission) === -1){
            return false
        } else {
            return roles.some(role => route.meta.roles.includes(role))
        }
    } else if(route.meta && route.meta.permission && permissions.indexOf(route.meta.permission) === -1){
        return false
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles, permissions) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
        let accessedRoutes
        getInfo(state.token).then(response => {
            const {data} = response

            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, data.permissions)
            }
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        });

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
