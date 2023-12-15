<template>
	<div class="upload" @click.stop.self='$emit("unshow")'>
		<div class="upload-card">
			<div class="upload-tabs">
				<div class="tabs-title">
					传输列表
				</div>
				<div class="tab-list">
					<div class="tab-item" :class="{'tab-item-active':tabObj.show}" @click="tabObj.show=true">
						文件上传（{{loadingList.length}}）
					</div>
					<div class="tab-item" :class="{'tab-item-active':!tabObj.show}" @click="tabObj.show=false">
						完成列表（{{loadedList.length}}）
					</div>
				</div>
			</div>
			<div class="tab-content">
				<div class="content-title" v-show="false">
					<!-- 上传完成 （0/0） -->
				</div>
				<div class="content-list">
					<div class="content-loading" v-show="tabObj.show">
						<!-- 上传中列表 -->
						<uploadProgress @cancelLoading='cancelLoading' @loadedAdd='loadedAdd'
							v-for="(item,index) in loadingList" :key='index' :uploadData='item'>
						</uploadProgress>
					</div>
					<div class="content-success" v-show="!tabObj.show">
						<!-- 完成列表 -->
						<uploadProgressCompleted @dltfromlist="dltFromList" :uploadData='item'
							v-for="(item,index) in loadedList" :key='index'>
						</uploadProgressCompleted>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import uploadProgress from "@/components/common/upload/uploadProgress"
	import uploadProgressCompleted from "@/components/common/upload/uploadProgressCompleted"

	export default {
		data() {
			return {
				x: 1,
				active_index: 1,
				tabObj: {
					show: true
				},
				uploadData: {
					list: [] //所有数据
				},
				loadingList: [], //上传中数据
				loadedList: [], //上传结束数据
			}
		},
		components: {
			uploadProgress,
			uploadProgressCompleted
		},
		created() {
			this.busBind()
		},
		methods: {
			// 删除已完成
			dltFromList(index) {
				console.log(index)
				for (var i = 0; i < this.loadedList.length; i++) {
					if (this.loadedList[i].data.index == index) {
						this.loadedList.splice(i, 1)
						this.loadedList[i]
						return
					}
				}
			},
			// 取消上传
			cancelLoading(index, totalSize) {
				var data = this.loadingList(index, 1)
				this.loadedList.push({
					data,
					status: false, //未上传完成
					totalSize
				})
			},
			// 上传完成
			loadedAdd(index, totalSize) {
				for (var i = 0; i < this.loadingList.length; i++) {
					if (this.loadingList[i].index == index) {
						var data = this.loadingList.splice(i, 1)[0]
						this.loadedList.push({
							data,
							status: true,
							totalSize
						})
						return
					}
				}
			},
			busBind() {
				this.$bus.$on("filesReUpload", (data) => {
					
					for (var i = 0; i < this.loadedList.length; i++) {
						if(this.loadedList[i].data.index==data.index){
							this.loadedList.splice(i,1)
							break
						}
					}
					this.loadingList.push(data)
				})
				this.$bus.$on("filesUpload", data => {
					var obj = {
						data,
						index: this.uploadData.list.length
					}
					this.uploadData.list.push(obj)
					this.loadingList.push(obj)
					this.$emit('show')
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.upload {
		position: absolute;
		z-index: 777;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0);

		.upload-card {
			box-sizing: border-box;
			position: absolute;
			z-index: 888;
			right: 4px;
			top: 4px;
			display: flex;
			width: 700px;
			height: 400px;
			background-color: #fff;
			border-radius: 5px;
			padding: 0px 13px;
			box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);

			.upload-tabs {
				width: 140px;
				border-right: solid 1px #f4f4f4;
				padding-top: 12px;

				.tabs-title {
					color: #878c9c;
					letter-spacing: 0;
					line-height: 16px;
					font-size: 11px;
					margin-bottom: 10px;
				}

				.tab-list {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: left;
					padding-right: 10px;
					font-size: 13px;

					.tab-item {
						padding: 9px 11px;
						width: 100%;
						margin-bottom: 5px;

						&:hover {
							cursor: pointer;
						}
					}

					.tab-item-active {
						color: #06a7ff;
						background-color: #eef9fe;
						border-radius: 15px;

					}
				}

			}

			.tab-content {
				width: 560px;

				.content-title {
					display: flex;
					align-items: center;
					text-align: left;
					height: 40px;
					padding: 0px 16px;
					font-size: 15px;
					border-bottom: solid 1px #f4f4f4;
				}
			}
		}
	}
</style>
