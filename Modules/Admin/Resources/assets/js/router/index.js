import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    permission: 'user.list'      control the page permission (you can set single permission)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path*',
            component: () => import('@/views/redirect/index')
          }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', affix: true, icon:'dashboard', permission: 'dashboard.list' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/users',
  //   component: () => import('@/views/users/index'),
  //   name: 'Users',
  //   meta: { title: 'Users', roles: ['Super Admin', 'Admin'] }
  // },
    {
        path: '/users',
        component: Layout,
        redirect: '/list',
        meta: { title: 'Admin Users', affix: true, icon: 'peoples', permission:'user.list' },
        children: [
            {
                path: 'roles',
                component: () => import('@/views/userrole/index'),
                name: 'user_roles',
                meta: { title: 'Roles', affix: true, permission:'role.list' }
            },
            {
                path: 'role/add',
                component: () => import('@/views/userrole/form'),
                name: 'add_user_role',
                hidden: true,
                meta: { title: 'Add Role', permission:'role.add' }
            },
            {
                path: 'role/edit/:id',
                component: () => import('@/views/userrole/form'),
                name: 'edit_user_role',
                hidden: true,
                meta: { title: 'Edit Role', permission:'role.update' }
            },
            {
                path: 'list',
                component: () => import('@/views/users/index'),
                name: 'user_list',
                meta: { title: 'All Users', affix: true, permission:'user.list' }
            },
            {
                path: 'add',
                component: () => import('@/views/users/form'),
                name: 'Add User',
                meta: { title: 'Add User', affix: true, permission:'user.add' }
            },
            {
                path: 'edit/:id',
                component: () => import('@/views/users/form'),
                name: 'edit_user',
                hidden: true,
                meta: { title: 'Add User', affix: false, permission:'user.update' }
            },
        ]
    },
    {
        path: '/customers',
        component: Layout,
        redirect: '/list',
        meta: { title: 'Customers', affix: true, icon: 'people', permission:'customer.list' },
        children: [
            {
                path: 'list',
                component: () => import('@/views/customers/index'),
                name: 'list_customer',
                meta: { title: 'All Customers', affix: true, permission:'customer.list' }
            },
            {
                path: 'add',
                component: () => import('@/views/customers/form'),
                name: 'add_customer',
                meta: { title: 'Add Customer', affix: true, permission:'customer.add' }
            },
            {
                path: 'edit/:id',
                component: () => import('@/views/customers/form'),
                name: 'edit_customer',
                hidden: true,
                meta: { title: 'Edit Customer', affix: false, icon: 'peoples', permission:'customer.update' }
            },
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
