<template>
	<el-dialog title="用户信息修改" :visible.sync="show" :model="newUserForm">
		<el-form :label-position="labelPosition">
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户昵称">
						<el-input v-model="newUserForm.nickName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="归属部门">
						<el-select v-model="newUserForm.department" placeholder="请选择">
							<el-option v-for="item in baseStc.department" :key="item.departmentId"
								:value="item.departmentName">
								<span style="float: left">{{ item.departmentName }}</span>
								<span
									style="float: right; color: #8492a6; font-size: 13px">{{ item.departmentId }}</span>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="手机号码">
						<el-input v-model="newUserForm.phoneNumber"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱">
						<el-input v-model="newUserForm.address"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户性别">
						<el-select v-model="newUserForm.sex" placeholder="请选择">
							<el-option key="0" value="男">
								<div class="row">
									<div class="row_left">
										男
									</div>
									<div class="row_right">
									</div>
								</div>
							</el-option>
							<el-option key="1" value="女">
								<div class="row">
									<div class="row_left">
										女
									</div>
									<div class="row_right">
									</div>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="职位">
						<el-select v-model="newUserForm.role" placeholder="请选择">
							<el-option v-for="item in baseStc.role" :key="item.role_id" :value="item.role_name">
								<div class="row">
									<div class="row_left">
										{{ item.role_name }}
									</div>
									<div class="row_right">
										{{ item.role_id }}
									</div>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="备注">
						<el-input type="textarea" autosize placeholder="请输入内容" v-model="newUserForm.remark">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" class="btns">
					<el-button @click="sure()" type="primary">确认</el-button>
					<el-button>取消</el-button>
				</el-col>
			</el-row>
		</el-form>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				labelPosition: 'top',
			}
		},
		computed: {
			baseStc() {
				return this.$store.state.baseData
			},
			newUserForm() {
				return this.user
			}

		},
		props: ['uploadVisible', 'user'],
		created() {},
		mounted() {},
		methods: {
			sure() {
				console.log('修改后数据', this.newUserForm);
				// 提交数据
				this.$axios({
					url: 'http://localhost:3000/users/update',
					method: 'post',
					params: {
						user: this.newUserForm
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
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.row_left {}

		.row_right {
			font-size: 13px;
			color: #ccc;
		}
	}

	.btns {
		display: flex;
		justify-content: flex-end;
	}
</style>
