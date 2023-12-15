import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueClipBoard from 'vue-clipboard2'


// axios.defaults.withCredentials = true;
let CancelToken = axios.CancelToken; //axios的config中提供了一个cancelToken属性，可以通过传递一个新的CancelToken对象来在请求的任何阶段关闭请求。
let source = CancelToken.source();
Vue.prototype.$source = source
Vue.prototype.$CancelToken = CancelToken
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// Vue.use(contextmenu);
Vue.use(ElementUI);
Vue.use(VueClipBoard)

var vm = new Vue({
	router,
	store,
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	}
}).$mount('#app')
// vm.$axios.withCredentials = true
// // 添加请求拦截器
// vm.$axios.interceptors.request.use(function(config) {
// 	// Do something before request is sent
// 	return config;
// }, function(error) {
// 	// Do something with request error
// 	return Promise.reject(error);
// });
// // 添加响应拦截器
// vm.$axios.interceptors.response.use(function(response) {
// 	// 对响应数据做点什么
// 	console.log(response)
// 	if (response.data.toLand) {
// 		vm.$message({
// 			message: response.data.message,
// 			type: 'error'
// 		})
// 		vm.$router.push('land')
// 		return;
// 	}
// 	return response
// }, function(error) {
// 	// 对响应错误做点什么
// 	return Promise.reject(error)
// });
export default vm