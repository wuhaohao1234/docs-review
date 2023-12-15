<template>
	<el-dialog class="revise_dialog" title="修改教师" :visible.sync="show">
		<el-form ref="reviseForm" :rules='reviseRules' :model="reviseForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="教师编号" :label-width="formLabelWidth" prop="teacher_id">
						<el-input disabled v-model="reviseForm.teacherId" autocomplete="off">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户名" :label-width="formLabelWidth" prop="user_name">
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
						<el-radio v-model="reviseForm.sex" label="0">男</el-radio>
						<el-radio v-model="reviseForm.sex" label="1">女</el-radio>
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
		teacherRevise
	} from '../../../../http/api.js'
	export default {
		data() {
			return {
				fullscreenLoading: false,
				show: false,
				labelPosition: 'top',
				formLabelWidth: '100px',
				teacher: {}, //原版teacher数据
				reviseForm: {
					teacher_id: "",
					teacher_name: "",
					user_name: "",
					password: "",
					sex: null
				},
				reviseRules: {
					teacher_name: [{
						required: true,
						trigger: 'blur',
						message: "请输入教师姓名"
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
					}]
				}
			}
		},
		props: ['teachersData'],
		created() {
			this.busEventBind()
		},
		mounted() {},
		methods: {
			cancelRevise() {
				this.reviseForm = this.teacher
				this.show = false
			},
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('reviseDialogShow', teacher => {
					// 加载数据
					this.reviseForm = teacher //保存teacher用于展示
					this.teacher = JSON.parse(JSON.stringify(teacher)) //保存teacher用于回复，点击取消时回复this.reviseForm
					this.show = true
				})
			},
			// 角色重复判断
			teacherRepeat() {
				var arr = this.teachersData
				if (this.reviseForm.teacher_id == this.teacher.teacher_id ||
					this.reviseForm.teacher_name == this.teacher.teacher_name) {
					return;
				}
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].teacher_id == this.reviseForm.teacher_id) {
						this.$message({
							message: '角色编号重复',
							type: 'error'
						})
						return false
					}
					if (arr[i].teacher_name == this.reviseForm.teacher_name) {
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
				teacherRevise({
					teacherId: this.reviseForm.teacher_id,
					username: this.reviseForm.user_name,
					password: this.reviseForm.password,
					sex: this.reviseForm.sex
				}).then(res => {
					console.log(res);
					if(res.code==200){
						this.show = false
						this.$emit("reloadTable")
					}
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

	.teacher_cover {
		width: 180px;
		height: 240px;

		img {
			height: 100%;
		}
	}
</style>
