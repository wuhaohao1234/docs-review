<template>
	<div class="upload-progress">
		<!-- 我的：{{progress}} -->
		<div class="pr-img">
			<img src="" alt="">
		</div>
		<div class="pr-content">
			<div class="title">
				上传文件（{{uploadData.data.index}}）
			</div>
			<div class="progress-line">
				<!-- 进度条 -->
				<div class="progress-active" style="width:100%">
				</div>
			</div>
			<div class="pr-mation">
				<div class="file-size">
					<span>
						{{uploadData.totalSize}}
					</span>
				</div>
				<div class="upload-speed">
					{{uploadData.status?"已完成":"未完成"}}
				</div>
			</div>
		</div>
		<div class="pr-operation">
			<div class="upload">
				<img @click="reload" src="@/assets/imgs/reload.png" alt="">
			</div>
			<div class="cancel">
				<img @click='dltFromList' src="@/assets/imgs/cancel.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				progress: 0, //当前进度1为完成
				downloading: true, //是否暂停下载
				totalWidth: 240, //上传进度条宽
				totalSize: 0, //总体积
				lastLoaded: 0, //上次上传的大小，用于计算实时上传速度
				uploadSpeed: 0, //实时上传速度
				speedCompany: "KB/s", //上传速度单位
				completed: false, //上传是否完成
			}
		},
		props: ['uploadData', 'index'],
		mounted() {
			// console.log(this.uploadData)
		},
		methods: {
			// 从列表中删除上传 
			dltFromList() {
				console.log(this.uploadData)
				this.$emit('dltfromlist',this.uploadData.data.index)
			},
			// 重新上传
			reload() {
				this.$bus.$emit("filesReUpload",this.uploadData.data)
			},
			// 继续上传
			continueDownload() {
				this.downloading = true
			},
		}
	}
</script>

<style lang="less" scoped>
	.upload-progress {
		display: flex;
		align-items: center;
		height: 70px;
		border-bottom: solid 1px #f6f6f6;

		.pr-img {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 70px;
			height: 70px;

			img {
				width: 25px;
				height: 25px;
				background-color: aqua;
			}
		}

		.pr-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 70px;
			border-radius: 4px;
			padding: 8px 0px 10px 0px;
			margin-right: 20px;

			.title {
				font-size: 14px;
				color: #03081a;
				font-family: SFUIText, PingFangSC-Regular, Helvetica Neue, Helvetica, Arial, sans-serif;
			}

			.progress-line {
				width: 240px;
				height: 3px;
				background-color: #f5f6fa;
				border-radius: 10px;
				overflow: hidden;

				.progress-active {
					width: 0px;
					height: 3px;
					transition: all .6s;
					background-image: linear-gradient(90deg, #22d4ff 6%, #009dff 95%);
				}
			}

			.pr-mation {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.file-size {
					font-size: 12px;
					color: #878c9c;
					font-family: SFUIText, PingFangSC-Regular, Helvetica Neue, Helvetica, Arial, sans-serif;
				}

				.upload-speed {
					font-size: 11px;
					color: #06a7ff;
					font-family: SFUIText, PingFangSC-Regular, Helvetica Neue, Helvetica, Arial, sans-serif;
				}
			}
		}

		.pr-operation {
			height: 70px;
			display: flex;
			align-items: center;

			.upload {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f0faff;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				margin-right: 10px;

				img {
					width: 14px;
				}
			}

			.cancel {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: aquamarine;
				border-radius: 50%;

				img {
					width: 28px;
				}
			}
		}
	}
</style>
