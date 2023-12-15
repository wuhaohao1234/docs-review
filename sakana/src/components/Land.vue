<template>
	<div id="login_container">
		<el-card class="box-card login_box" v-show="formShow">
			<div class="avater_box">
				<div class="avater_img">
					<img src="../assets/imgs/login_head.png" alt="">
				</div>
				<svg width="100px" height="100px">
					<text x="5%" y="55%">yuri</text>
				</svg>
			</div>
			<div class="land_form">
				<el-form :model="userForm" :rules="rules" ref="formLand" class="demo-ruleForm">
					<el-form-item label="用户名" prop="name">
						<el-input prefix-icon="el-icon-user-solid" v-model="userForm.name" placeholder="输入用户名">
						</el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input @keydown.enter="land" type="password" prefix-icon="el-icon-s-cooperation" v-model="userForm.password"
							placeholder="输入密码">
						</el-input>
					</el-form-item>
					<el-form-item class="btns" label="" >
						<div class="btns_contain">
							<el-button type="success" @click="formShow=false">注册</el-button>
							<el-button type="primary"  @click="land">登录</el-button>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="regist_card" v-show="!formShow">
			<div class="regist_box">
			</div>
			<div class="regist_form" v-show="!formShow">
				<el-form :model="registForm" :rules="registRule" ref="registForm">
					<el-form-item label="账号名" prop="user_name">
						<el-input type="text" v-model="registForm.user_name" />
					</el-form-item>
					<el-form-item label="账号密码" prop="password">
						<el-input type="password" v-model="registForm.password" />
					</el-form-item>
					<el-form-item class="btns" label="">
						<div class="btns_contain">
							<el-button type="success" @click="registUser()">注册</el-button>
						</div>
					</el-form-item>
				</el-form>
				<div class="back_row">
					<div @click="formShow=true" class="back">
						返回登录页面
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		teacherLand,
		teacherRegist
	} from '../http/api.js'
	import Cookies from "js-cookie";
	export default {
		data() {
			return {
				dialogVisible: false,
				formShow: true, //控制表单展示
				registForm: {
					user_name: '',
					password: ''
				},
				registRule: {
					user_name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},

					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
				userForm: {
					name: '',
					password: '',
					rememberMe: true
				},
				rules: {
					name: [{
						required: true,
						message: '用户名',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'change'
					}],
				},
			}
		},
		computed: {
			user() {
				return this.$store.user
			}
		},
		mounted() {},
		methods: {
			toLandCard() {
				this.formShow = true
				this.dialogVisible = false
			},
			// 注册账号
			registUser() {
				this.$refs.registForm.validate(valid => {
					if (valid) {
						teacherRegist({
							username: this.registForm.user_name,
							password: this.registForm.password,
						}).then(res => {

						})
					} else {
						this.$message.error("请检查表单")
					}
				})
			},
			to(value) {
				console.log(value);
			},
			land() {
				this.$refs.formLand.validate(valid => {
					if (valid) {
						var obj = {
							username: this.userForm.name,
							password: this.userForm.password,
							userType: "2",
						}
						teacherLand(obj).then(res => {
							if (res.code == 200) {
								console.log('登录成功');
								obj.userId = res.data.userId
								this.$store.commit('setUserData', obj)
								this.$router.push('/IndexView')
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
	#login_container {
		width: 600px;
		background-color: rgba(0, 0, 0, 0.1);

		.login_box {
			.avater_box {
				display: flex;
				justify-content: center;
				margin-bottom: 30px;

				.avater_img {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100px;
					height: 100px;
					border: solid 10px rgba(255, 255, 255, 0.6);
					// padding: 10px;
					border-radius: 50%;
					box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
					overflow: hidden;

					img {
						width: 100%;
					}
				}
			}

			.land_form {
				.btns {
					.btns_contain {
						display: flex;
						align-items: center;
						justify-content: space-around;
						width: 100%;
					}
				}
			}
		}

		.regist_card {
			background-color: #fff;

			.regist_box {
				height: 160px;
				background-image: url('../assets/imgs/login_bg_l.png');
				background-size: 100%;
				background-position: center;
			}

			.regist_form {
				margin-top: 10px;
			}

			.btns {
				margin-top: 50px;

				.btns_contain {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;

					.el-button {
						width: 100%;
						background-color: #695edc;
						border-color: #695edc;
						padding: 18px 20px;
						font-size: 19px;
						letter-spacing: 5px;
					}
				}
			}

			.back_row {
				margin-top: 15px;
				display: flex;
				justify-content: flex-end;

				.back {
					&:hover {
						cursor: pointer;
					}

					color: #4395ff;
					border-bottom: solid 0.5px #4395ff;
					padding-bottom: 1px;
				}
			}
		}

	}

	.btns {
		.btns_contain {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
		}
	}

	svg text {
		font-size: 35px;
		font-weight: 900;
		stroke-width: 2px;
		fill: transparent;
		stroke: #ffc8dd;
		letter-spacing: 4px;
		stroke-dasharray: 100% !important;
		stroke-dashoffset: 100%;
		animation: line-anm 5s infinite;
	}

	@keyframes line-anm {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
