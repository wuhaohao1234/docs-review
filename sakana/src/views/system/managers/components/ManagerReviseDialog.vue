<template>
	<el-dialog class="revise_dialog" title="修改管理员" :visible.sync="show">
		<el-form ref="reviseForm" :rules='reviseRules' :model="reviseForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="管理员编号" :label-width="formLabelWidth" prop="userId">
						<el-input disabled v-model="reviseForm.userId" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
						<el-select v-model="reviseForm.roleId">
							<el-option label="学生" value="4">
							</el-option>
							<el-option label="教师" value="3">
							</el-option>
							<el-option label="超级管理员" value="5">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
						<el-input v-model="reviseForm.username" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
						<el-input v-model="reviseForm.password" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
						<el-select v-model="reviseForm.sex">
							<el-option label="男" value="0">
							</el-option>
							<el-option label="女" value="1">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
						<el-input v-model="reviseForm.email" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancelRevise()">取 消</el-button>
			<el-button type="primary" @click="reviseSubmmit('reviseForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		managerRevise
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				fullscreenLoading: false,
				show: false,
				labelPosition: 'top',
				formLabelWidth: '100px',
				manager: {}, //原版manager数据
				reviseForm: {
					userId: "",
					roleId: "",
					manager_name: "",
					user_name: "",
					password: "",
					sex: null,
					email: ""
				},
				reviseRules: {
					roleId: [{
						required: true,
						trigger: 'blur',
						message: "请选择角色"
					}],
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
					}],
					email: [{
						required: false,
						trigger: 'blur',
						message: "请输入邮箱"
					}]
				}
			}
		},
		created() {
			this.busEventBind()
		},
		mounted() {},
		methods: {
			cancelRevise() {
				this.reviseForm = this.manager
				this.show = false
			},
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('reviseDialogShow', manager => {
					// 加载数据
					this.reviseForm = manager //保存manager用于展示
					this.manager = JSON.parse(JSON.stringify(manager)) //保存manager用于回复，点击取消时回复this.reviseForm
					this.show = true
				})
			},
			// 角色重复判断
			// 提交修改后角色信息
			reviseSubmmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						managerRevise({
							userId: this.reviseForm.userId,
							roleId: this.reviseForm.roleId,
							username: this.reviseForm.user_name,
							password: this.reviseForm.password,
							sex: this.reviseForm.sex,
							email: ""
						}).then(res => {
							console.log(res);
							if (res.code == 200) {
								this.show = false
								this.$emit("reloadTable")
							}
						})
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
						return false;
					}
				});


			}
		},
	}
</script>

<style lang="less" scoped>
	.btns {
		display: flex;
		justify-content: flex-end;
	}

	.manager_cover {
		width: 180px;
		height: 240px;

		img {
			height: 100%;
		}
	}
</style>
