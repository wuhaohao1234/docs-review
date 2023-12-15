<template>
	<el-dialog title="信息修改" :visible.sync="show">
		<el-form ref="reviseForm" class="upload_form" :model="newUserForm" :rules="userReviseRules">
			<el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item :label-width="formLabelWidth" label="账号" prop="username">
							<el-input v-model="newUserForm.username"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label-width="formLabelWidth" label="密码" prop="password">
							<el-input v-model="newUserForm.password"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item :label-width="formLabelWidth" label="角色" prop="className">
							<el-select v-model="newUserForm.role" placeholder="请选择角色">
								<el-option label="用户" value="0">
								</el-option>
								<el-option label="管理员" value="1">
								</el-option>
								<el-option label="专家" value="2">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show =false">取消</el-button>
			<el-button @click="sure('reviseForm')" type="primary">确认</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		stuRevise,
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				formLabelWidth: '100px',
				show: false,
				labelPostion: "left",
				userReviseRules: {

					username: [{
						required: true,
						message: '输入用户名',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入用户密码',
						trigger: 'blur'
					}, ],
					role: [{
						required: true,
						message: '请选择角色',
						trigger: 'blur'
					}, ],
				},
				newUserForm: {},
				labelPosition: 'left',
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				}
			}
		},
		computed: {
			baseStc() {
				return this.$store.state.baseData
			},
		},
		created() {
			this.busInit()
		},
		mounted() {},
		methods: {
			busInit() {
				this.$bus.$on('stuReviseShow', stu => {
					this.newUserForm = JSON.parse(JSON.stringify(stu))
					this.show = true
					console.log(stu);
				})
			},
			sure(formName) {
				console.log('修改后数据', this.newUserForm);
				// 验证表单
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 提交数据
						stuRevise(this.newUserForm).then(res => {
							console.log(res);
							if (res.status) {
								this.$message.success("修改成功")
								this.show = false
								this.$emit('loadUser')
							} else {
								this.$message.error("修改失败")
							}
						})
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
					}
				})
			}
		},
		watch: {
			uploadVisible: {
				handler(newValue, oldValue) {
					console.log('变化');
					this.show = newValue
				},
			},
			show: {
				handler(newValue, oldValue) {
					this.$emit('upVisb', newValue)
				}
			}
		}
	}
</script>

<style lang="less" scoped>

</style>