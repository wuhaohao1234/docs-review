<template>
	<el-dialog class="revise_dialog" title="修改角色" :visible.sync="show">
		<el-form ref="reviseForm" :rules='reviseRules' :model="reviseForm">
			<el-form-item label="角色编号" :label-width="formLabelWidth" prop="role_id">
				<el-input @blur="roleRepeat()" v-model="reviseForm.role_id" autocomplete="off">
				</el-input>
			</el-form-item>
			<el-form-item label="角色名" :label-width="formLabelWidth" prop="role_name">
				<el-input @blur="roleRepeat()" v-model="reviseForm.role_name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色状态" :label-width="formLabelWidth" prop="status">
				<el-select v-model="reviseForm.status" placeholder="请选择角色状态">
					<el-option value="1" label="启用中"></el-option>
					<el-option value="0" label="禁用中"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色权限" :label-width="formLabelWidth" prop="pms_char">
				<el-select v-model="reviseForm.pms_char" placeholder="请选择角色权限">
					<el-option value="x-23"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show=false">取 消</el-button>
			<el-button type="primary" @click="reviseSubmmit('reviseForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				labelPosition: 'top',
				formLabelWidth: '100px',
				role: {}, //原版role数据
				reviseForm: {
					role_id: "",
					role_name: "",
					status: "",
					pms_char: "",
				},
				reviseRules: {
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
		created() {
			this.busEventBind()
		},
		mounted() {},
		methods: {
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('reviseDialogShow', role => {
					// 加载数据
					this.reviseForm = role
					this.role = role
					this.show = true
				})
			},
			// 角色重复判断
			roleRepeat() {
				var arr = this.rolesData
				if (this.reviseForm.role_id == this.role.role_id ||
					this.reviseForm.role_name == this.role.role_name) {
					return;
				}
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].role_id == this.reviseForm.role_id) {
						this.$message({
							message: '角色编号重复',
							type: 'error'
						})
						return false
					}
					if (arr[i].role_name == this.reviseForm.role_name) {
						this.$message({
							message: '角色名重复',
							type: 'error'
						})
						return false;
					}
				}
				return true;
			},
			// 提交修改后角色信息
			reviseSubmmit() {
				this.$axios({
					url: 'http://localhost:3000/roles/update',
					method: 'post',
					params: {
						role: this.reviseForm
					}
				}).then(res => {
					if (res.data.status) {
						this.show = false
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
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
</style>
