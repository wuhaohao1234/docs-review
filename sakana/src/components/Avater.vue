<template>
	<div id="avater">
		<el-dropdown trigger="click" @click="leaveLand()">
			<span class="el-dropdown-link">
				<div class="avater_box">
					<div class="head_img">
						<img src="../assets/avater.png" alt="">
					</div>
					<div class="head_name">
						{{user? user.username:"未登录"}}
					</div>
					<div class="more_icon">
						<i class="el-icon-arrow-down"></i>
					</div>
				</div>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item class="user">
					<div class="user_box" @click="land(!user)">
						<div class="avater_img">
							<img src="../assets/avater.png" alt="">
						</div>
						<div class="avater_name">
							{{user? user.username:"未登录"}}
						</div>
						<div class="avater_userType">
							<!-- {{getUserType}} -->
						</div>
					</div>
				</el-dropdown-item>
				<el-dropdown-item class="avater_row" v-show="user">
					<div class="row_box" @click="switchUser()">
						<div class="left">
							切换账号
						</div>
						<div class="right">
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</el-dropdown-item>
				<el-dropdown-item class="avater_row" v-show="user">
					<div class="row_box" @click="leaveLand()">
						<div class="left">
							退出登录
						</div>
						<div class="right">
							<i class="el-icon-house"></i>
						</div>
					</div>
				</el-dropdown-item>
				<el-dropdown-item v-show="user" class="avater_row" divided>
					<div class="row_box">
						<div class="left">
							机密
						</div>
						<div class="right">
							<i class="el-icon-s-tools"></i>
						</div>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
			}
		},
		computed: {},
		created() {
			this.userInit()
		},
		mounted() {},
		methods: {
			userInit() {
				var mation = localStorage.getItem("userMation")
				if (mation) {
					this.user = JSON.parse(mation)
				}
			},
			land(status) {
				if (status) {
					this.$router.push('land')
				}
			},
			// 退出登录
			leaveLand() {
				window.sessionStorage.removeItem('token')
				localStorage.removeItem("userMation")
				this.$router.push('land')
			},
			// 切换用户
			switchUser() {
				window.sessionStorage.removeItem('token')
				this.$router.push('land')
			}
		},
	}
</script>
<style lang="less" scoped>
	#avater {
		height: 250px;
		display: flex;
		align-items: center;

		.el-dropdown {
			display: flex;
			align-items: center;
			height: 60px;
			width: 150px;

			.avater_box {
				display: flex;
				align-items: center;
				padding: 20px;
				height: 60px;
				padding: 0 10px;
				box-sizing: border-box;

				.head_img {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30px;
					height: 30px;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20px;

					img {
						width: 60px;
						height: 60px;
					}
				}

				.more_icon {
					margin-left: 10px;
				}
			}


		}
	}

	.user_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 150px;

		.avater_img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;

			img {
				width: 50px;
			}
		}

		.avater_userType {
			color: #ccc;
		}
	}

	.row_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50px;
	}

	.el-dropdown-menu {
		padding: 0px;
		width: 220px;
	}

	.el-dropdown-menu__item .user {
		height: 135px;
	}
</style>