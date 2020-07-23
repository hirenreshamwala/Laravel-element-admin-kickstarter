import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const showErrorMessage = function (m, duration) {
    setTimeout(()=>{
        Message({
            message: m,
            type: 'error',
            showClose: true,
            duration: duration || (5 * 1000)
        })
    }, 100)
};
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data

        if(response.config.url === '/logout' && response.status === 200){
            return res;
        }

        const {status, message} = res;
        if (status){
            if(status === 'error'){
                Message({
                    message: message || 'Error',
                    type: 'error',
                    showClose: true,
                    duration: 5 * 1000
                })
                return Promise.reject(new Error(message || 'Error'))
            } else if(status === 'success' && message){
                Message({
                    message: message,
                    type: 'success',
                    showClose: true,
                    duration: 5 * 1000
                })
            }
        }

        return res;
    },error => {
        if(error.response && error.response.data){
            if (error.response.data.message){
                Message({
                    message: error.response.data.message,
                    type: 'error',
                    showClose: true,
                    duration: 5 * 1000
                })
            }
            for (let i in error.response.data.errors){
                const err = error.response.data.errors[i];
                if (typeof err === 'object' && Array.isArray(err)){
                    for (let j = 0; j < err.length; j++) {
                        showErrorMessage(err[j], 8*1000);
                    }
                } else if (typeof error.response.data.errors[i] === 'string'){
                    showErrorMessage(error.response.data.errors[i], 8*1000);
                }
            }
        }

        // console.log('err' + error) // for debug
        return Promise.reject(error)
    }

);

export default service
