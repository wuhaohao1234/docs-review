<template>
	<!-- 教师添加弹窗 -->
	<el-dialog class="add_dialog" title="新增教师" :visible.sync="show" v-loading.fullscreen.lock="fullscreenLoading">
		<el-form ref="addForm" :rules='AddRules' :model="addForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="账号" :label-width="formLabelWidth" prop="user_name">
						<el-input v-model="addForm.user_name" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
						<el-input v-model="addForm.password" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
						<el-radio-group v-model="addForm.sex">
							<el-radio :label="0">男</el-radio>
							<el-radio :label="1">女</el-radio>
						</el-radio-group>
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
	import {
		teacherAdd
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				fileList: [],
				fullscreenLoading: false,
				show: false,
				addForm: {
					user_name: "",
					password: "",
					sex: ""
				},
				formLabelWidth: '100px',
				AddRules: {
					user_name: [{
						required: true,
						trigger: 'blur',
						message: "请输入用户名"
					}],
					password: [{
						required: true,
						trigger: 'blur',
						message: "请输入密码"
					}],
					sex: [{
						required: false,
						trigger: 'blur',
						message: "请选择性别"
					}]
				}
			}
		},
		props: ['teachersData'],
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
				forms.append('teacher_cover', arr[0].raw)
				this.$axios.post("http://localhost:3000/teachers/add", forms, {
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
			teacherRepeat() {
				var arr = this.teachersData
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].teacher_id == this.addForm.teacher_id) {
						this.$message({
							message: '教师编号重复',
							type: 'error'
						})
						return false
					}
					if (arr[i].teacher_name == this.addForm.teacher_name) {
						this.$message({
							message: '教师名重复',
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
					if (valid) {
						this.fullscreenLoading = true
						this.addTeacher()
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
						return false;
					}
				});
			},
			// 表单初始化
			formInit() {
				for (let item in this.addForm) {
					this.addForm[item] = ""
				}
			},
			// 发送增加教师请求函数
			addTeacher() {
				teacherAdd({
					username: this.addForm.user_name,
					password: this.addForm.password,
					sex: this.addForm.sex
				}).then(res => {
					console.log(res);
					this.fullscreenLoading = false
					if (res.code !== 200) {
						
					} else {
						this.$emit("reloadTable")
						this.formInit() //表单初始化
						this.show = false
					}
				})
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
