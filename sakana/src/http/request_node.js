import axios from "axios"; //引入axios
import env from "./env";
import vm from '../main'
// 创建axios实例
// axios.defaults.baseURL = "http://82.157.248.119:8089"
const service = axios.create({
	//这里拿线上接口测试
	baseURL: env.node_dev.baseUrl,
	headers: { //请求头
		'Content-Type': 'application/json;charset=UTF-8',
	},
	settimeout: 50000, //超时时间
});
// 请求拦截器
service.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么 验证token之类的
		// console.log("请求的数据:", config);
		return config; //记得一定要 返回config
	},
	error => {
		// 对请求错误做些什么
		// console.log("请求的数据:", error);
		return Promise.reject(error);
	}
);
// 响应拦截器
service.interceptors.response.use(
	response => {
		// console.log("返回的数据", response);
		// 这里拦截401错误，并重新跳入登页重新获取token
		// if (response.status && response.status === 200) {
		// 	var msg = true
		// 	if (response.data.code != 200) {
		// 		msg = false
		// 	}
		// 	vm.$message({
		// 		message: (typeof response.data==String)? response,
		// 		type: msg ? "success" : 'error'
		// 	})
		// }
		return Promise.resolve(response.data)
	},
	error => {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);
export default service;