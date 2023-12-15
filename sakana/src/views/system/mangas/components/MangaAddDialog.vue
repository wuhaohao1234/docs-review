<template>
	<!-- 漫画添加弹窗 -->
	<el-dialog class="add_dialog" title="新增漫画" :visible.sync="show"  v-loading.fullscreen.lock="fullscreenLoading">
		<el-form ref="addForm" :rules='AddRules' :model="addForm">
			<el-row>
				<el-col :span="6" class="row_to_column">
					<el-form-item label="漫画封面" :label-width="formLabelWidth" prop="manga_cover">
						<el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview"
							:on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit='1'>
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
				</el-col>
				<el-col :span="18">
					<el-row>
						<el-col :span="12">
							<el-form-item label="漫画编号" :label-width="formLabelWidth" prop="manga_id">
								<el-input @blur="mangaRepeat()" v-model="addForm.manga_id" autocomplete="off">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="漫画名" :label-width="formLabelWidth" prop="manga_name">
								<el-input @blur="mangaRepeat()" v-model="addForm.manga_name" autocomplete="off">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="漫画状态" :label-width="formLabelWidth" prop="status">
								<el-select v-model="addForm.status" placeholder="请选择漫画状态">
									<el-option value="1" label="启用中"></el-option>
									<el-option value="0" label="禁用中"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="漫画权限" :label-width="formLabelWidth" prop="pms_char">
								<el-select v-model="addForm.pms_char" placeholder="漫画权限符">
									<el-option value="x-26"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="漫画作者" :label-width="formLabelWidth" prop="manga_writer">
								<el-input v-model="addForm.manga_writer" placeholder="漫画作者">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="漫画负责人" :label-width="formLabelWidth" prop="manga_editer">
								<el-input v-model="addForm.manga_editer" placeholder="漫画负责人">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="类别" :label-width="formLabelWidth" prop="category">
								<el-select v-model="addForm.category" placeholder="请选择漫画类别">
									<el-option value="1" label="少女漫画"></el-option>
									<el-option value="0" label="女青漫画"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="标签" :label-width="formLabelWidth" prop="label">
								<el-select v-model="addForm.label" placeholder="请选择漫画标签">
									<el-option value="青春" label="青春"></el-option>
									<el-option value="爱情" label="爱情"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="连载状态" :label-width="formLabelWidth" prop="serial_status">
								<el-select v-model="addForm.serial_status" placeholder="请选择漫画连载状态">
									<el-option value="1" label="连载中"></el-option>
									<el-option value="0" label="完结"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="漫画简介" :label-width="formLabelWidth" prop="serial_status">
						<el-input
						  type="textarea"
						  :rows="4"
						  placeholder="请输入内容"
						  v-model="addForm.manga_introduce">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show=false">取 消</el-button>
			<el-button type="primary" @click="addFormSubmmit('addForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				fullscreenLoading:false,
				show: false,
				addForm: {
					manga_id: "123",
					manga_name: "年若青华",
					status: "0",
					pms_char: "x-25",
					manga_writer: '未知',
					manga_editer: '未知',
					category: '女青漫画',
					label: '百合',
					serial_status: '1',
					manga_introduce:'cmd'
				},
				formLabelWidth: '100px',
				AddRules: {
					manga_cover: [{
						required: false,
						message: '请上传漫画封面',
						trigger: 'blur'
					}],
					manga_id: [{
						required: true,
						message: '请输入漫画id',
						trigger: 'blur'
					}],
					manga_name: [{
						required: true,
						message: '请输入漫画名',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '请选择漫画状态',
						trigger: 'blur'
					}],
					pms_char: [{
						required: true,
						message: '请选择漫画权限符',
						trigger: 'blur'
					}],
					manga_writer: [{
						required: true,
						message: '请输入漫画作者',
						trigger: 'blur'
					}],
					manga_editer: [{
						required: true,
						message: '请选择漫画负责人',
						trigger: 'blur'
					}],
					category: [{
						required: true,
						message: '请选择漫画分类',
						trigger: 'blur'
					}],
					label: [{
						required: true,
						message: '请选择漫画标签',
						trigger: 'blur'
					}],
					serial_status: [{
						required: true,
						message: '请选择漫画连载状态',
						trigger: 'blur'
					}, ],
				}
			}
		},
		props: ['mangasData'],
		computed: {},
		created() {
			this.busEventBind()
		},
		methods: {
			submitUpload() {
				// this.$refs.upload.submit();
				console.log(this.$refs.upload.uploadFiles[0]);
				var arr = this.$refs.upload.uploadFiles
				console.log(arr)
				// 创建传输格式
				var forms = new FormData()
				// 填充传输格式中的数据
				forms.append('arr', 'Nihao1')
				forms.append('manga_cover', arr[0].raw)
				this.$axios.post("http://localhost:3000/mangas/add", forms, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(res => {
					console.log(res)
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('addDialogShow', res => {
					this.show = true
				})
			},
			mangaRepeat() {
				var arr = this.mangasData
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].manga_id == this.addForm.manga_id) {
						this.$message({
							message: '漫画编号重复',
							type: 'error'
						})
						return false
					}
					if (arr[i].manga_name == this.addForm.manga_name) {
						this.$message({
							message: '漫画名重复',
							type: 'error'
						})
						return false;
					}
				}
				return true;
			},
			// 点击确认上传函数
			addFormSubmmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid && this.mangaRepeat()&&this.$refs.upload.uploadFiles[0]) {
						this.fullscreenLoading = true
						this.addManga()
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
						return false;
					}
				});
			},
			// 发送增加漫画请求函数
			addManga() {
				// 定时器防止超时
				var timer =null
				// 准备数据格式
				console.log(this.$refs.upload.uploadFiles[0]);
				var arr = this.$refs.upload.uploadFiles
				console.log(arr)
				// 创建传输格式
				var forms = new FormData()
				// 填充传输格式中的数据
				console.log(this.addForm)
				forms.append('addForm', JSON.stringify(this.addForm))
				// forms.append('addForm', this.addForm)
				forms.append('file', arr[0].raw) //必须和后端single的名字一样
				console.log(arr);
				console.log(forms);
				this.$axios.post("http://localhost:3000/mangas/add", forms, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(res => {
					var tothis = this
					timer = setTimeout(function(){
						this.fullscreenLoading= false
						tothis.$message({
							messsage:'请求超时',
							type:'error'
						})
					},20000)
					if (res.data.status) {
						this.show = false
						this.$emit('reloadTable')
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
					console.log(res)
				}).then(()=>{
					clearTimeout(timer)
					this.fullscreenLoading = false
				})

				// 成功案例
				// console.log(this.$refs.upload.uploadFiles[0]);
				// var arr = this.$refs.upload.uploadFiles
				// console.log(arr)
				// var formsdata = new FormData()
				// formsdata.append('cmd', '222')
				// formsdata.append('file', arr[0].raw)
				// this.$axios.post("http://localhost:3000/mangas/add", formsdata, {
				// 	"Content-Type": 'multipart/form-data'
				// }).then(res => {
				// 	res.data
				// })

				// this.$axios({
				// 	url: 'http://localhost:3000/mangas/add',
				// 	method: 'post',
				// 	params: {
				// 		manga_id: this.addForm.manga_id,
				// 		manga_name: this.addForm.manga_name,
				// 		status: this.addForm.status,
				// 		pms_char: this.addForm.pms_char,
				// 	}
				// }).then(res => {
				// 	if (res.data.status) {
				// 		this.show = false
				// 		this.$emit('reloadTable')
				// 	}
				// 	this.$message({
				// 		message: res.data.message,
				// 		type: res.data.status ? 'success' : 'error'
				// 	})
				// })
			}

		}
	}
</script>

<style scoped lang="less">

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
</style>
