<template>
	<div id="container">
		<!-- <div class="card">
			<div class="top">
				<div class="title">
					兑换码网址
				</div>
				<div class="content">
					<el-input v-model="vip_url.url"></el-input>
				</div>
			</div>
			<div class="footer">
				<el-button @click="submitVipURL" type="primary">
					提交
				</el-button>
			</div>	
		</div> -->
		<Wave></Wave>
	</div>
</template>

<script>
	import {
		getVipUrl,
		setVipUrl
	} from '../http/api.js'
	import Wave from '../components/animate/Wave.vue'



	export default {
		data() {
			return {
				date: "",
				vip_url: {
					url: "",
					id: null
				},

			}
		},
		components: {
			Wave
		},
		mounted() {
			// this.baseInit()
		},
		methods: {
			submitVipURL() {
				setVipUrl({
					url: this.vip_url.url,
					id: this.vip_url.id
				}).then(res => {
					console.log(res)
					if (res.data.status) {
						this.$message.success("设置成功")

					} else {
						this.$message.error("设置失败")
					}
					this.baseInit()
				})
			},
			baseInit() {
				getVipUrl().then(res => {
					console.log(res)
					if (res.data.status) {
						this.vip_url = res.data.data
					} else {
						// this.$message.error("获取数据失败")
					}
				})
			},
		},
	}
</script>
<style lang="less" scoped>
	#container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 20px;

		.card {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 400px;
			height: 220px;
			padding: 15px;
			box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
			border-radius: 8px;

			.title {
				font-size: 20px;
				font-weight: bold;
			}

			.content {
				margin-top: 10px;
			}

			.footer {
				display: flex;
				flex-direction: row-reverse;
			}
		}
	}

	.yuri-card-list {
		display: flex;
		justify-content: space-between;
		padding: 30px;

		.yuri-card_data {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 290px;
			height: 194px;
			box-shadow: 0 0 12px 2px rgba(92, 186, 159, 0.2);

			.img {
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;
				background-color: blanchedalmond;
				margin-bottom: 15px;
			}

			.title {
				position: relative;
				font-size: 16px;
				font-family: "LouisGeorgeCafe";
				// color: rgb(255, 255, 255);
				text-align: center;
				margin-bottom: 15px;

				&::after {
					position: absolute;
					content: "";
					bottom: -13px;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 0;
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-top: 10px solid #3170a7;
				}
			}

			.num {
				font-size: 30px;
				font-family: "LouisGeorgeCafe";
				// color: rgb(255, 255, 255);
				// font-weight: bold;
				text-align: center;
			}
		}
	}
</style>