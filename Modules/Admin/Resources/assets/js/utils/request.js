import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true;
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
      config.headers['X-Token'] = getToken();
      // config.headers['Authorization'] = `bearer ${getToken()}`;
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
        console.log(response);
        const res = response.data

        if(response.config.url === '/logout' && response.status === 200){
            return res;
        }

        const {status, success, error, message} = res;
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
        if (error){
			Message({
				message: message || 'Error',
				type: 'error',
				showClose: true,
				duration: 5 * 1000
			})
			return Promise.reject(new Error(message || 'Error'))
		}
        if (success && message){
			Message({
				message: message,
				type: 'success',
				showClose: true,
				duration: 5 * 1000
			})
		}

        return res;
    },error => {
        console.log(error);
    	const { data } = error.response;
        if(data){
            if (data.message && (!data.errors || data.errors.length === 0)){
                Message({
                    message: data.message,
                    type: 'error',
                    showClose: true,
                    duration: 5 * 1000
                })
            }
            for (let i in data.errors){
                const err = data.errors[i];
                if (typeof err === 'object' && Array.isArray(err)){
                    for (let j = 0; j < err.length; j++) {
                        showErrorMessage(err[j], 8*1000);
                    }
                } else if (typeof data.errors[i] === 'string'){
                    showErrorMessage(data.errors[i], 8*1000);
                }
            }
        }

        return Promise.reject(error)
    }, final => {
        console.log(final);
    }

);

export default service
