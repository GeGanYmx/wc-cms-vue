import axios from 'axios';

//创建实例
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    //配置基路径
    baseURL: 'http://rap2api.taobao.org/app/mock/225049/',
    // baseURL: 'http://localhost:3000/',
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use( config => {
    console.log('请求携带的token',sessionStorage.getItem('token'));
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

//响应拦截器
service.interceptors.response.use(response => {
    if(response.status === 200){
        console.log('服务器响应成功！',response.data);
        return response.data;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

let token=sessionStorage.getItem('token')||'adefaultstring8888';
axios.defaults.headers.common['Authorization'] = token;
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With';
// function get(url,params={}){
//     let token=sessionStorage.getItem('token')?sessionStorage.getItem('token'):'';
//     axios.defaults.headers.common['Authorization'] = token;
//     return new Promise((resolve, reject) => {
//         service({
//             url: url,
//             method: 'get',
//             params: params
//         }).then(response => {
//             resolve(response);
//         }).catch(error => {
//             reject(error);
//         });
//     });
// }

export default service;