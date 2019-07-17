import axios from 'axios';

//创建实例
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    //配置基路径
    baseURL: 'https://api-test.ifans.pub/',
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use( config => {
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

//响应拦截器
service.interceptors.response.use(response => {
    if(response.status === 200){
        return response.data;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With';
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