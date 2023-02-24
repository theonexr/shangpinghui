import axios from 'axios';
//进度条
import nprogress from 'nprogress';
// 当前模块中引入store
import store from '@/store'
//因为进度条样式咱们没有引入
import "nprogress/nprogress.css"
export const baseURL = 'http://gmall-h5-api.atguigu.cn/api'

const requests = axios.create({
    // 配置对象
    baseURL: baseURL,
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // Do something before request is sent
    //config，请求拦截器的一个配置对象
    if(store.state.detail.uuid_token){
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    //检测到程序发请求，请求拦截器可以检测到，进度条开始动
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    // Do something before request is sent
 //简化服务器返回的数据格式
    //服务器数据返回进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(error)
});


// 对外暴露
export default requests