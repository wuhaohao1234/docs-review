<template>
	<el-dialog class="detail_dialog" title="教师详情" :visible.sync="show">
		<el-form ref="detailForm" :rules='detailRules' :model="detailForm">
			<el-form ref="detailForm" :rules='detailRules' :model="detailForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="教师ID" :label-width="formLabelWidth" prop="teacher_id">
							<el-input disabled v-model="detailForm.teacherId" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="教师姓名" :label-width="formLabelWidth" prop="teacher_name">
							<el-input v-model="detailForm.teacher_name" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户名" :label-width="formLabelWidth" prop="user_name">
							<el-input v-model="detailForm.username" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
							<el-input v-model="detailForm.password" autocomplete="off">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
							<el-radio-group v-model="detailForm.sex">
								<el-radio label="0">男</el-radio>
								<el-radio label="1">女</el-radio>
							</el-radio-group>
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
				teacher: {}, //原版teacher数据
				detailForm: {
					teacher_id: "",
					teacher_name: "",
					status: "",
					pms_char: "",
				},
				detailRules: {
					teacher_cover: [{
						required: false,
						message: '请上传教师封面',
						trigger: 'blur'
					}],
					teacher_id: [{
						required: true,
						message: '请输入教师id',
						trigger: 'blur'
					}],
					teacher_name: [{
						required: true,
						message: '请输入教师名',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '请选择教师状态',
						trigger: 'blur'
					}],
					pms_char: [{
						required: true,
						message: '请选择教师权限符',
						trigger: 'blur'
					}],
					teacher_writer: [{
						required: true,
						message: '请输入教师作者',
						trigger: 'blur'
					}],
					teacher_editer: [{
						required: true,
						message: '请选择教师负责人',
						trigger: 'blur'
					}],
					category: [{
						required: true,
						message: '请选择教师分类',
						trigger: 'blur'
					}],
					label: [{
						required: true,
						message: '请选择教师标签',
						trigger: 'blur'
					}],
					serial_status: [{
						required: true,
						message: '请选择教师连载状态',
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
				this.$bus.$on('detailDialogShow', teacher => {
					// 加载数据
					this.detailForm = teacher
					this.teacher = teacher
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

	.teacher_cover {
		width: 180px;
		height: 240px;

		img {
			height: 100%;
		}
	}
</style>
