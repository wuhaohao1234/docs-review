<template>
	<div class="upload-progress">
		<!-- 我的：{{progress}} -->
		<div class="pr-img">
			<img src="" alt="">
		</div>
		<div class="pr-content">
			<div class="title">
				上传文件{{uploadData.index}}
			</div>
			<div class="progress-line">
				<!-- 进度条 -->
				<div class="progress-active" :style="'width:'+totalWidth*progress+'px'">
				</div>
			</div>
			<div class="pr-mation">
				<div class="file-size">
					<span v-show="!completed">
						{{totalSize}}
					</span>
					<span v-show="completed">
						已完成
					</span>
				</div>
				<div v-show="!completed" class="upload-speed">
					{{uploadSpeed}}{{speedCompany}}
				</div>
			</div>
		</div>
		<div class="pr-operation">
			<div class="upload">
				<img v-show="downloading" @click="stopDownload" src="@/assets/imgs/stop.png" alt="">
				<img v-show="!downloading" @click="continueDownload" src="@/assets/imgs/download.png" alt="">
			</div>
			<div class="cancel">
				<img @click='cancelLoading' src="@/assets/imgs/cancel.png" alt="">
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
			// this.$axios.post("http://localhost:7735/filesm/upload")
			// 	.then(response => {
			// 		console.log("文件上传成功", response);
			// 	})
			// 	.catch(error => {
			// 		console.log("文件上传失败：" + error.message);
			// 	});
			console.log(this.uploadData)
			this.submitFile(this.uploadData.data)
		},
		methods: {
			// 取消上传 
			cancelLoading() {
				// this.$source.cancel('中止上传');
				// this.$source = this.$CancelToken.source(); //CancelToken
				// this.$emit('cancelLoading', this.uploadData.index, this.totalSize)
			},
			// 停止上传,只有分片上传才支持暂停
			stopDownload() {
				this.downloading = false //隐藏按钮
			},
			// 继续上传
			continueDownload() {
				this.downloading = true
			},
			// 获取文件名（不含后缀）并替换特殊字符
			getFileName(name) {
				let exts = name.split('.') //拿到源文件的后缀名
				var tmpName = ""
				for (let i = 0; i < exts.length - 1; i++) {
					tmpName += exts[i]
				}
				tmpName = tmpName.replace(/[\[\]{};',./:"<>?!@#$%^&*()_+【】、；‘，。、{}|：”“《》？！@#￥%……&*（）——+]*/g,
					""); //特殊字符均替换掉
				console.log(tmpName)
				return tmpName + exts[exts.length - 1]
			},
			submitFile(data) {
				console.log(data)
				// 准备数据格式
				var forms = new FormData()
				var _this = this
				const userMation = JSON.parse(localStorage.getItem("userMation"))
				// 填充传输格式中的数据
				forms.append("type_id", data.type_id) //操作类型
				forms.append("userId", userMation.id) //操作类型
				forms.append("username", userMation.username)

				for (let i = 0; i < data.list.length; i++) {
					// data.list[i].raw.name = this.getFileName(data.list[i].raw.name)
					forms.append('file', data.list[i].raw)
					console.log(data.list[i])
				}
				console.log(forms)
				// this.$axios.post("http://localhost:7735/filesm/upload", forms)
				// 	.then(response => {
				// 		console.log("文件上传成功", res);
				// 	})
				// 	.catch(error => {
				// 		console.log("文件上传失败：" + error.message);
				// 	});


				this.$axios({
					url: "http://localhost:7735/filesm/upload",
					// url: "http://1.12.43.54:7735/files/upload",
					// url: "http://124.222.1.2:7735/files/upload",
					method: 'post',
					data: forms,
					cancelToken: _this.$source.token,
					onUploadProgress(progressEvent) {
						// if(_this.downloading==false){
						// 	return
						// }
						if (progressEvent.lengthComputable) {
							// // 计算文件上传进度
							_this.totalSize = (progressEvent.total / 1024 / 1024).toFixed(2) + "MB" //总体加
							_this.uploadSpeed = ((progressEvent.loaded - _this.lastLoaded) / 1024).toFixed(2)
							if (_this.uploadSpeed > 1024) {
								_this.speedCompany = "MB/s"
								_this.uploadSpeed = (_this.uploadSpeed / 1024).toFixed(2)
							} else {
								_this.speedCompany = "KB/s"
							}
							let val = (progressEvent.loaded / progressEvent.total);
							_this.progress = val
							_this.lastLoaded = progressEvent.loaded
							if (val == 1) {
								_this.completed = true
								_this.$bus.$emit("fileListReload")
								_this.$emit("loadedAdd", _this.uploadData.index, _this.totalSize)
							}
							// // 通过判断进度到100后，代表完成，将允许跳转数据设置为true
							// if (self.num == 100) {
							// 	self.isRedic = true
							// }
						} else {

						}
					},
				}).then(res => {
					console.log(res)
				})

			}
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
				background-color: aquamarine;
				border-radius: 50%;
				margin-right: 10px;

				img {
					width: 28px;
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