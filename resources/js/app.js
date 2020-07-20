/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Cookies from 'js-cookie';
import ElementUI from 'element-ui';
import enLang from 'element-ui/lib/locale/lang/en'

import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    locale: enLang
})


// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

import Auth from './auth'
import Helper from './helper'

if(window.QLogrRwvWpSNc6zePaiqVX1IBgeh0B6Y && window.wpvPenuHpeAxKttNLGOuLx4CeCayw4tL && window.Kgc2HIucTXXV0CSS8X70dmUkSKH68lAt){
    try{
        Vue.prototype.$auth = new Auth({
            'user' : Helper.decrypt(window.wpvPenuHpeAxKttNLGOuLx4CeCayw4tL),
            'roles' : Helper.decrypt(window.Kgc2HIucTXXV0CSS8X70dmUkSKH68lAt),
            'permissions' : Helper.decrypt(window.QLogrRwvWpSNc6zePaiqVX1IBgeh0B6Y)
        });
        console.log(Vue.prototype.$auth);
        if(Vue.prototype.$auth.hasAnyRole()){
            // console.log(store);
            store.dispatch('user/setUserToken',Vue.prototype.$auth.roles().shift());
            store.dispatch('user/getInfo');
            // store.dispatch('user/changeRoles',Vue.prototype.$auth.roles().shift());
        }

    } catch (e) {
        console.log(e.message);
    }
}


// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.use(ElementUI);

import './components'

const app = new Vue({
    el: '#app',
    router,
    store,
});
