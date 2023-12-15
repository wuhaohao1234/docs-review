<template>
	<el-dialog class="detail_dialog" title="管理员详情" :visible.sync="show">
		<el-form ref="detailForm" :rules='detailRules' :model="detailForm">
			<el-form ref="detailForm" :rules='detailRules' :model="detailForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="管理员ID" :label-width="formLabelWidth" prop="userId">
							<el-input disabled :value="detailForm.userId" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
							<el-select disabled :value="detailForm.roleId">
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
						<el-form-item label="用户名" :label-width="formLabelWidth" prop="user_name">
							<el-input disabled :value="detailForm.username" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
							<el-input disabled :value="detailForm.password" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
							<el-select disabled :value="detailForm.sex">
								<el-option label="男" value="0">
								</el-option>
								<el-option label="女" value="1">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
							<el-input disabled :value="detailForm.email" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="创建时间" :label-width="formLabelWidth" prop="creatTime">
							<el-input disabled :value="detailForm.createTime" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="上次更新时间" :label-width="formLabelWidth" prop="updateTime">
							<el-input  disabled :value="detailForm.updateTime" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show=false">取 消</el-button>
			<el-button type="primary" @click='show=false'>确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				fullscreenLoading: false,
				show: false,
				labelPosition: 'top',
				formLabelWidth: '100px',
				manager: {}, //原版manager数据
				detailForm: {
					manager_id: "",
					manager_name: "",
					status: "",
					pms_char: "",
				},
				detailRules: {
					manager_cover: [{
						required: false,
						message: '请上传管理员封面',
						trigger: 'blur'
					}],
					manager_id: [{
						required: true,
						message: '请输入管理员id',
						trigger: 'blur'
					}],
					manager_name: [{
						required: true,
						message: '请输入管理员名',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '请选择管理员状态',
						trigger: 'blur'
					}],
					pms_char: [{
						required: true,
						message: '请选择管理员权限符',
						trigger: 'blur'
					}],
					manager_writer: [{
						required: true,
						message: '请输入管理员作者',
						trigger: 'blur'
					}],
					manager_editer: [{
						required: true,
						message: '请选择管理员负责人',
						trigger: 'blur'
					}],
					category: [{
						required: true,
						message: '请选择管理员分类',
						trigger: 'blur'
					}],
					label: [{
						required: true,
						message: '请选择管理员标签',
						trigger: 'blur'
					}],
					serial_status: [{
						required: true,
						message: '请选择管理员连载状态',
						trigger: 'blur'
					}, ],
				}
			}
		},
		created() {
			this.busEventBind()
		},
		mounted() {},
		methods: {
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('detailDialogShow', manager => {
					// 加载数据
					this.detailForm = manager
					this.manager = manager
					this.show = true
				})
			},
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
