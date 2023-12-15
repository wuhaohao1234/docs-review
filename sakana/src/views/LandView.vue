<template>
	<div id="index_container">
		<div class="login_view">
			<div class="yuri-sider">
				<div class="logo">
					管理
					<div class="deraction">
					</div>
				</div>
				<div class="sider-footer">
					<!-- Eolink 致力于为全球开发者和科技型企业提供领先的 API 技术产品，帮助科技企业通过 API 创造更大的价值。 -->
				</div>
			</div>
			<div class="yuri-mainer">
				<div class="yuri-card_land">
					<div class="title">
						欢迎进入
					</div>
					<div class="land_view">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="登录" name="land">
								<el-form :model="landForm" ref="landForm" :rules="landRules">
									<el-form-item prop="username">
										<el-input v-model="landForm.username" placeholder="请输入账户" type="text">

										</el-input>
									</el-form-item>
									<el-form-item prop="password">
										<el-input v-model="landForm.password" placeholder="请输入密码" type="password">

										</el-input>
									</el-form-item>
								</el-form>
							</el-tab-pane>
							<el-tab-pane label="注册" name="regist">
								<el-form :model="registForm" ref="registForm" :rules="registRules">
									<el-form-item prop="role">
										<el-select v-model="registForm.role" placeholder="请选择角色">
											<el-option label="用户" value="0">
											</el-option>
											<el-option label="管理员" value="1">
											</el-option>
											<el-option label="专家" value="2">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item prop="username">
										<el-input v-model="registForm.username" placeholder="请输入账户" type="text">

										</el-input>
									</el-form-item>
									<el-form-item prop="password">
										<el-input v-model="registForm.password" placeholder="请输入密码" type="password">

										</el-input>
									</el-form-item>
								</el-form>
							</el-tab-pane>
						</el-tabs>
					</div>
					<div class="yuri-btn">
						<button v-show='landShow' @click="land('landForm')" class="yuri-green">
							登录
						</button>
						<button v-show='!landShow' @click="regist('registForm')" class="yuri-green">
							注册
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		managerLand,
		managerRegist
	} from '../http/api.js'
	import Land from "../components/Land.vue"
	export default {
		data() {
			return {
				landShow: true,
				landRules: {
					username: [{
						required: true,
						trigger: 'blur',
						message: "请输入账户"
					}],
					password: [{
						required: true,
						trigger: 'blur',
						message: "请输入密码"
					}]
				},
				landForm: {

					username: "",
					password: ""
				},
				registRules: {
					role: [{
						required: true,
						trigger: 'blur',
						message: "请选择角色"
					}],
					username: [{
						required: true,
						trigger: 'blur',
						message: "请输入账户"
					}],
					password: [{
						required: true,
						trigger: 'blur',
						message: "请输入密码"
					}]
				},
				registForm: {
					role: null,
					username: "",
					password: ""
				},


				activeName: 'land',
				input: '',
				input2: '',
				show: false
			}
		},
		components: {
			Land
		},
		mounted() {
			this.landStatus()
			this.show = true
		},
		methods: {
			land(formName) {
				// console.log("登录")
				this.$refs[formName].validate(valid => {
					if (valid) {
						var obj = {
							username: this.landForm.username,
							password: this.landForm.password,
						}
						console.log(obj)
						managerLand(obj).then(res => {
							console.log(res)
							if (res.back.queryResult) {
								this.$message.success("登录成功")
								localStorage.setItem("userMation", JSON.stringify(res.data))
								this.$router.push('/IndexView')
							}

						})
					} else {
						this.$message.error("请检查表单")
					}
				})
			},
			handleClick(tab, event) {
				console.log(tab, event);
				if (tab.index == 0) {
					this.landShow = true
				} else {
					this.landShow = false
				}
			},
			// 登录 获取页面url参数
			landStatus() {
				var {
					unland
				} = this.$route.query
				if (unland) {
					this.$message.error('请登录后查看')
				}
			},
			// 注册
			regist(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						var obj = {
							username: this.registForm.username,
							password: this.registForm.password,
							role: this.registForm.role
						}
						console.log(obj)
						managerRegist(obj).then(res => {
							console.log(res)
							if (res.status) {
								this.$message.success("注册成功")
							} else {
								this.$message.error(res.message)
							}

						})
					} else {
						this.$message.error("请检查表单")
					}
				})
			}
		},
	}
</script>
<style lang="less" scoped>
	* {
		box-sizing: border-box;
	}

	#index_container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		// background-image: url('../assets/imgs/login_bg.png');
		background-size: 100%;

		// &:before {
		// 	position: absolute;
		// 	content: '';
		// 	width: 100%;
		// 	height: 100%;
		// 	backdrop-filter: blur(3px);
		// }

		.land {
			position: relative;
			z-index: 200;
		}
	}

	.login_view {
		width: 100%;
		height: 100%;
		display: flex;

		.yuri-sider {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 360px;
			// height: 100%;
			background-image: url('../assets/imgs/bc_sider2.png');
			background-repeat: no-repeat;
			background-size: auto 100%;

			.logo::after {
				position: absolute;
				left: 1px;
				top: 0px;
				width: 2px;
				height: 40px;
				background-color: #00906a;
			}

			.logo {
				position: relative;
				padding: 0px 50px;
				height: 64px;
				color: aliceblue;
				line-height: 64px;
				font-size: 28px;
				font-weight: bold;
				word-spacing: 3px;
				letter-spacing: 6px;

				.deraction {
					position: absolute;
					left: 38px;
					top: 17px;
					width: 2px;
					height: 34px;
					background-color: #00906a;
				}

				&::before {
					position: absolute;
					content: "";
					left: 28px;
					top: 17px;
					width: 5px;
					height: 34px;
					background-color: #00906a;
				}
			}

			.sider-footer {
				padding: 25px 50px;
				color: #fff;
				line-height: 36px;
				font-size: 13px;
			}
		}

		.yuri-mainer {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;

			.yuri-card_land {
				width: 372px;

				.title {
					margin-bottom: 0.5em;
					color: #000000d9;
					font-weight: 600;
					font-size: 30px;
					line-height: 1.35;
				}

				.land_view {}
			}
		}
	}

	.yuri-btn {

		.yuri-green {
			width: 100%;
			background-color: #00785a;
			border-color: #00785a;
			outline: none;
			display: inline-block;
			line-height: 1;
			white-space: nowrap;
			cursor: pointer;
			color: #fff;
			text-align: center;
			box-sizing: border-box;
			outline: none;
			margin: 0;
			transition: .1s;
			font-weight: 500;
			padding: 12px 20px;
			font-size: 14px;
			border-radius: 4px;
			border: none;

		}

		.yuri-green:hover {
			background-color: #00906a;
		}

		.yuri-green:target {
			background-color: #006b50;
		}
	}
</style>
<style lang="less">
	.land_view {
		.el-tabs__item.is-active {
			color: #009d75;
		}

		.el-tabs__active-bar {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 2px;
			background-color: #009d75;
			z-index: 1;
			transition: transform .3s cubic-bezier(.645, .045, .355, 1);
			list-style: none;
		}

		.el-input.is-active .el-input__inner,
		.el-input__inner {
			// background-color: #e8f0fe;
			// outline: 0;
		}

		.el-input.is-active .el-input__inner,
		.el-input__inner:focus {
			border-color: #009d75;
			outline: 0;
		}
	}
</style>