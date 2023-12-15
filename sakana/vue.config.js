const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	// devServer: {
	// 	proxy: {
	// 		// 请求前缀
	// 		'/api': {
	// 			target: 'http://localhost:3000',
	// 			pathRewrite: {
	// 				'^/api': ''
	// 			},
	// 			ws: true, // 用于支持websocket
	// 			changeOrigin: false // 用于控制请求头中的host字段 默认true
	// 		},
	// 		'/carapi': {
	// 			target: 'http://localhost:5001',
	// 			pathRewrite: {
	// 				'^/carapi': ''
	// 			},

	// 		}
	// 	}
	// }
})
