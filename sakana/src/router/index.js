import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'
import LandView from '../views/LandView.vue'
import HomeView from '../views/HomeView.vue'
// 系统管理页面
import usersView from '../views/system/usersView.vue'
import reviewView from '../views/system/reviewView.vue'
// 资源管理
import plantListView from '../views/plant/plantListView.vue'
import txtsListView from '../views/plant/txtsListView.vue'
import imgsListView from '../views/plant/imgsListView.vue'
import paragListView from '../views/plant/paragView.vue'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'LandView',
		component: LandView
	},
	{
		path: '/land',
		name: 'land',
		component: LandView
	},
	{
		path: '/IndexView',
		component: IndexView,
		children: [{
				path: '/',
				component: HomeView,
				meta: {
					requireToken: true
				}
			},

			{
				path: '/homes',
				component: HomeView,
				meta: {
					requireToken: true
				}
			},

			{
				path: '/review',
				component: reviewView,
				meta: {
					requireToken: true
				}
			},
			{
				path: '/users',
				component: usersView,
				meta: {
					requireToken: true
				}
			},
			{
				path: '/plantList',
				component: plantListView,
				meta: {
					requireToken: true
				}
			},
			{
				path: '/txtList',
				component: txtsListView,
				meta: {
					requireToken: true
				}
			},
			{
				path: '/imgList',
				component: imgsListView,
				meta: {
					requireToken: true
				}
			},
			{
				path: '/parag',
				component: paragListView,
				meta: {
					requireToken: true
				}
			},
		]
	},
	// {
	//   path: '/about',
	//   name: 'about',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	// }
]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
	routes
})

// 全局前置路由守卫，初始化的时候被调用，每次路由切换前被调用
router.beforeEach((to, from, next) => {
	// if (to.path === '/login') return next();
	return next()
	// const tokenStr = window.sessionStorage.getItem('token')
	// 没有token，就强制跳转到登录页面
	// if (!tokenStr) {
	// 	return next()
	// }
	// console.log(to);
	// // 如果跳转的是land
	// if (to.name == 'land' || to.name == 'LandView') {
	// 	// 跳转land
	// 	console.log('跳转land');
	// 	return next()
	// }
	// // 如果跳转的是不是land就检查token
	// else if (!tokenStr) {
	// 	return next('/land?unland=true')
	// }
})
export default router