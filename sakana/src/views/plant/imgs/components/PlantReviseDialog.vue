<template>
	<el-dialog v-loading.fullscreen.lock="fullscreenLoading" width="70%" :modal-append-to-body="false"
		class="revise_dialog" title="修改图片信息" :visible.sync="show">
		<el-form ref="reviseForm" :rules='reviseRules' :model="reviseForm">
			<el-row>
				<el-col :span="18">
					<el-row>
						<el-col :span="12">
							<el-form-item label="图片名" :label-width="formLabelWidth" prop="name">
								<el-input v-model="reviseForm.name" autocomplete="off">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属文件夹" :label-width="formLabelWidth" prop="ichitype_id">
								<el-select v-model="reviseForm.ichitype_id" placeholder='请选择'>
									<el-option v-for="(item,index) in baseData.ichiTypeList" :key="index"
										:label="item.name" :value="item.id">
									</el-option>

								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="是否免费" :label-width="formLabelWidth" prop="is_free">
								<el-select v-model="reviseForm.is_free" placeholder='请选择'>
									<el-option label="是" value='1'>

									</el-option>
									<el-option label="否" value='0'>

									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否置顶" :label-width="formLabelWidth" prop="is_top">
								<el-select v-model="reviseForm.is_top" placeholder='请选择'>
									<el-option label="是" value='1'>
						
									</el-option>
									<el-option label="否" value='0'>
						
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
			</el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancelRevise()">取 消</el-button>
			<el-button type="primary" @click="reviseSubmmit('reviseForm')">确 定</el-button>
		</div>
		<el-dialog class="enlarge_img" :visible.sync="enlargeImgshow" :modal-append-to-body="false">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</el-dialog>
</template>

<script>
	import {
		ichiGradePlantList,
		niGradePlantList,
		reviseFile
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				baseData: [],
				tabActive: 'character',
				plantType: [], //植物类型
				typeOption: [],
				// tabs 切换植物简介
				// 图片列表
				enlargeImgshow: false,
				dialogImageUrl: '',
				disabled: false,
				fullscreenLoading: false,
				show: false,
				labelPosition: 'top',
				formLabelWidth: '100px',
				plant: {}, //原版plant数据
				reviseForm: {
					name: "",
					ichitype_id: "",
					is_free: ""
				},
				reviseRules: {
					name: [{
						required: false,
						message: '名字不能为空',
						trigger: 'blur'
					}],
					ichitype_id: [{
						required: true,
						message: '所属文件夹不能为空',
						trigger: 'blur'
					}],
					is_free: [{
						required: true,
						message: '请设置是否免费',
						trigger: 'blur'
					}],
					is_top: [{
						required: true,
						message: '请设置是否指定',
						trigger: 'blur'
					}],
				}
			}
		},
		props: ['plantsData'],
		computed: {
			imgShow() {

			},
		},
		created() {
			this.busEventBind()
			this.baseInit()
		},
		mounted() {},
		watch: {
		},
		methods: {
			baseInit() {
				ichiGradePlantList({
					pageNum: 1,
					pageSize: 120,
					type_id: 3,
					all: true
				}).then(res => {
					// console.log(res)
					this.baseData.ichiTypeList = res.data.list
				})
			},
			handleClick() {
			},
			cancelRevise() {
				this.reviseForm = this.plant
				this.show = false
			},
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('reviseDialogShow', data => {
					// 加载数据
					this.reviseForm = data //保存plant用于展示
					this.plant = JSON.parse(JSON.stringify(data)) //保存plant用于回复，点击取消时回复this.reviseForm
					this.show = true
				})
			},
			// 提交修改后文件信息
			reviseSubmmit() {
				reviseFile(JSON.stringify(this.reviseForm)).then(res=>{
					console.log(res)
					if(res.data.status){
						this.$message.success("修改成功")
						this.show=false
					}else{
						this.$message.error("修改失败")
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.btns {
		display: flex;
		justify-content: flex-end;
	}

	.plant_cover {
		width: 180px;
		height: 240px;

		img {
			height: 100%;
		}
	}

	.enlarge_img {
		z-index: 999;
	}
</style>
<style lang="less">
	// 七个简介分段
	.tabs {
		transform: translateY(-19px);
	}

	.row {
		display: flex;
		margin-left: 20px;

		.left {
			& {
				width: 150px;
				height: 220px;
				overflow: hidden;
				margin-right: 10px;
			}

			.el-upload-list--picture-card .el-upload-list__item {
				width: 150px;
				height: 220px;
			}

			.el-upload--picture-card {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 150px;
				height: 220px;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.right_top {
				& {
					width: 250px;
					height: 120px;
					overflow: hidden;
				}

				.el-upload-list--picture-card .el-upload-list__item {
					width: 250px;
					height: 120px;

				}

				.el-upload--picture-card {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 250px;
					height: 120px;
				}
			}

			.right_bottom {
				display: flex;
				justify-content: space-between;

				.el-upload-list--picture-card .el-upload-list__item {
					width: 80px;
					height: 80px;

					.el-upload-list__item-actions {
						font-size: 13px !important;
					}
				}

				.el-upload--picture-card {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80px;
					height: 80px;
				}

				.img_upload_box {
					& {
						width: 80px;
						height: 80px;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
