<template>
	<!-- 管理员添加弹窗 -->
	<el-dialog class="add_dialog" title="新增管理员" :visible.sync="show" v-loading.fullscreen.lock="fullscreenLoading">
		<el-form ref="addForm" :rules='AddRules' :model="addForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户昵称" :label-width="formLabelWidth" prop="nickname">
						<el-input v-model="addForm.nickname">
						</el-input>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="12">
					<el-form-item label="账户" :label-width="formLabelWidth" prop="username">
						<el-input v-model="addForm.username">
						</el-input>
					</el-form-item>
				</el-col> -->
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="账户" :label-width="formLabelWidth" prop="username">
						<el-input v-model="addForm.username" auto-complete="off">
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
			<!-- <el-row>
				<el-col :span="12">
					<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
						<el-radio-group v-model="addForm.sex">
							<el-radio :label="0">男</el-radio>
							<el-radio :label="1">女</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row> -->
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show=false">取 消</el-button>
			<el-button type="primary" @click="addFormSubmmit('addForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		managerAdd
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				fileList: [],
				fullscreenLoading: false,
				show: false,
				addForm: {
					nickname: "管理员",
					username: "",
					password: "",
				},
				formLabelWidth: '100px',
				AddRules: {
					nickname: [{
						required: false,
						trigger: 'blur',
						message: "请选择角色"
					}],
					username: [{
						required: true,
						trigger: 'blur',
						message: "请输入用户名"
					}],
					password: [{
						required: true,
						trigger: 'blur',
						message: "请输入密码"
					}],
				}
			}
		},
		props: ['managersData'],
		computed: {},
		created() {
			this.busEventBind()
		},
		methods: {
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('addDialogShow', res => {
					this.show = true
				})
			},
			managerRepeat() {
				var arr = this.managersData
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].manager_id == this.addForm.manager_id) {
						this.$message({
							message: '管理员编号重复',
							type: 'error'
						})
						return false
					}
					if (arr[i].manager_name == this.addForm.manager_name) {
						this.$message({
							message: '管理员名重复',
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
						this.addManager()
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
			// 发送增加管理员请求函数
			addManager() {
				managerAdd({
					nickname:this.addForm.nickname,
					username: this.addForm.username,
					password: this.addForm.password,
				}).then(res => {
					console.log(res);
					this.fullscreenLoading = false
					if (res.status == 200) {
						if (res.data.status) {
							this.$emit("reloadTable")
							this.formInit() //表单初始化
							this.show = false
							this.$message.success("新增用户成功")
						} else {
							this.$message.error("新增用户失败")
						}
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
