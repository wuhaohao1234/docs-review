<template>
	<!-- 图片添加弹窗 -->
	<el-dialog width="70%" class="add_dialog" title="选择文件" :visible.sync="show"
		v-loading.fullscreen.lock="fullscreenLoading">
		<el-form ref="addForm" :rules='AddRules' :model="uploadData">
			<!-- 文件上传行 -->
			<el-row>
				<el-col :span="11">
					<div class="yuri-fileList-img">
						<el-upload :auto-upload="false" :with-credentials='true' ref="file_list" :on-change="fileChnage"
							:multiple='true' action="https://jsonplaceholder.typicode.com/posts/"
							list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
					</div>

				</el-col>
			</el-row>
		</el-form>
		<el-dialog class="enlarge_img" :visible.sync="enlargeImgshow" :modal-append-to-body="false">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show=false">取 消</el-button>
			<el-button type="primary" @click="addFormSubmmit('addForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		niGradePlantList,
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				// 测试上传
				dialogImageUrl: '',
				dialogVisible: false,
				uploadData: {
					ichitype_id: '',
					type_id: "3", //文本分类
					list: []
				},
				baseData: {
					ichiTypeList: [{
						id: 0,
						name: "世界"
					}]
				},


				// 简介列表
				tabActive: "character",
				// 图片列表
				enlargeImgshow: false,
				dialogImageUrl: '',
				fileList: [],
				fullscreenLoading: false,
				show: false,
				formLabelWidth: '100px',
				AddRules: {
					ichitype_id: [{
						required: true,
						message: "请选择图片所属文件夹",
						trigger: 'blur'
					}, ],
				}
			}
		},
		props: ['plantsData'],
		computed: {},
		created() {
			this.baseInit()
			this.busEventBind()
		},
		methods: {
			// 测试上传
			baseInit() {

			},
			dataInit() {
				this.uploadData['ichitype_id'] = ""
				this.uploadData['list'] = []
				this.$refs.file_list.clearFiles()
			},
			addFormSubmmit(formName) {
				if (this.uploadData.list.length == 0) {
					this.$message.error("请至少选择一张图片")
					return;
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$bus.$emit("filesUpload", this.uploadData)
						this.$nextTick(() => {
							this.dataInit()
						})
						this.show = false
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
					}
				})

			},
			fileChnage(file, fileList) {
				this.uploadData.list = fileList
			},
			// 图片大图预览
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.enlargeImgshow = true;
			},

			// 文件移除
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('addDialogShow', res => {
					this.show = true
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.row {
		display: flex;
		margin-left: 20px;
	}
</style>

<style lang="less">
	// 特殊css:更改组件
	.row_to_column {
		.el-form-item {
			display: flex;
			flex-direction: column;

			.el-form-item__content {
				margin-left: 0px !important;
			}
		}
	}

	.yuri-fileList-img {
		.el-upload--picture-card {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80px;
			height: 80px;
		}

		.el-upload-list--picture-card .el-upload-list__item {
			width: 80px;
			height: 80px;
		}
	}
</style>