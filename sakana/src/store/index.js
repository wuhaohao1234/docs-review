import Vue from 'vue'
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)

// 准备action 用于响应组件中的动作
const actions = {}
// 准备mutations 用于操作数据（state)
const mutations = {
	setUserData: function(state, user) {
		console.log(user);
		state.user.baseData = user
		state.user.landStatus = true
	},
	clearUserData: function(state, user) {
		state.user.baseData = null
		state.user.landStatus = true
	}
}
// 准备state 用于存储数据
const state = {
	baseData: {},
	user: {
		landStatus: false,
		baseData: null
	}
}
// 创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
