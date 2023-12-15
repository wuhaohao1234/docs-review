<template>
	<!-- 角色添加弹窗 -->
	<el-dialog class="add_dialog" title="新增角色" :visible.sync="show">
		<el-form ref="addForm" :rules='AddRules' :model="addForm">
			<el-form-item label="角色编号" :label-width="formLabelWidth" prop="role_id">
				<el-input @blur="roleRepeat()" v-model="addForm.role_id" autocomplete="off">
				</el-input>
			</el-form-item>
			<el-form-item label="角色名" :label-width="formLabelWidth" prop="role_name">
				<el-input @blur="roleRepeat()" v-model="addForm.role_name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色状态" :label-width="formLabelWidth" prop="status">
				<el-select v-model="addForm.status" placeholder="请选择角色状态">
					<el-option value="1" label="启用中"></el-option>
					<el-option value="0" label="禁用中"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色权限" :label-width="formLabelWidth" prop="pms_char">
				<el-select v-model="addForm.pms_char" placeholder="请选择角色权限">
					<el-option value="x-23"></el-option>
				</el-select>
			</el-form-item>
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
				show: false,
				addForm: {
					role_id: "",
					role_name: "",
					status: "",
					pms_char: "",
				},
				formLabelWidth: '100px',
				AddRules: {
					role_id: [{
							required: true,
							message: '输入角色ID',
							trigger: 'blur',
						},
						{
							required: true,
							min: 3,
							message: '长度至少3个字符',
							trigger: 'blur'
						}
					],
					role_name: [{
							required: true,
							message: '请输入角色名',
							trigger: 'blur'
						},
						{
							required: true,
							min: 1,
							message: '长度至少3个字符',
							trigger: 'blur'
						}
					],
					status: [{
						required: true,
						message: '请输入角色名',
						trigger: 'blur'
					}, ],
					pms_char: [{
						required: true,
						message: '请选择角色状态',
						trigger: 'blur'
					}]
				}
			}
		},
		props: ['rolesData'],
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
			roleRepeat() {
				var arr = this.rolesData
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].role_id == this.addForm.role_id) {
						this.$message({
							message: '角色编号重复',
							type: 'error'
						})
						return false
					}
					if (arr[i].role_name == this.addForm.role_name) {
						this.$message({
							message: '角色名重复',
							type: 'error'
						})
						return false;
					}
				}
				return true;
			},
			addFormSubmmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid && this.roleRepeat()) {
						this.addRole()
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
						return false;
					}
				});
			},
			// 发送增加角色请求函数
			addRole() {
				this.$axios({
					url: 'http://localhost:3000/roles/add',
					method: 'post',
					params: {
						role_id: this.addForm.role_id,
						role_name: this.addForm.role_name,
						status: this.addForm.status,
						pms_char: this.addForm.pms_char,
					}
				}).then(res => {
					if (res.data.status) {
						this.show = false
						this.$emit('reloadTable')
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
				})
			}

		}
	}
</script>

<style scoped lang="less">
</style>
