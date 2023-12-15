<template>
	<div id="container">
		<div class="classify" v-show="false">
			<userClassify></userClassify>
		</div>
		<div class="operation_btns">
			<el-button @click="dialogAddFormVisible = true" size="small" type="primary" plain icon="el-icon-plus">新增
			</el-button>
			<!-- <el-button size="small" type="success" disabled plain icon="el-icon-search">修改</el-button> -->
			<!-- <el-button size="small" type="danger" disabled plain icon="el-icon-delete">删除</el-button> -->
			<!-- <el-button size="small" type="info" plain icon="el-icon-download">导入</el-button> -->
			<!-- <el-button size="small" type="warning" plain icon="el-icon-upload2">导出</el-button> -->
		</div>
		<div class="form">
			<el-table stripe :data="queryParams.userList" style="width: 100%" :row-class-name="tableRowClassName"
				header-row-class-name='info-row'>
				<el-table-column type="index" :index="indexMethod">
				</el-table-column>
				<el-table-column prop="id" label="id" width="">
				</el-table-column>
				<el-table-column prop="username" label="用户名" width="">
				</el-table-column>
				<el-table-column prop="password" label="密码" width="">
				</el-table-column>
				<el-table-column prop="role" label="角色" width="">
					<template slot-scope="scope">
						{{ getRole(scope.row.role)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="400px">
					<template slot-scope="scope">
						<el-button v-if="scope.row.role!=1" @click="uploadUser(scope.row)" size="mini" type="success"
							plain icon="el-icon-search">修改
						</el-button>
						<el-button v-if="scope.row.role!=1" @click="dltUserOne(scope.row.id)" size="mini" type="danger"
							plain icon="el-icon-delete">删除</el-button>
						<!-- <el-button size="mini" type="info" plain icon="el-icon-more">更多</el-button> -->
					</template>
				</el-table-column>
			</el-table>

			<el-dialog class="add_dialog" title="新增用户" :visible.sync="dialogAddFormVisible">
				<el-form ref="userAddForm" :rules='userAddRules' :model="userAddForm">
					<el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="角色" :label-width="formLabelWidth" prop="role">
									<el-select v-model="userAddForm.role" placeholder="请选择角色">
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
						<el-row>
							<el-col :span="12">
								<el-form-item label="账号" :label-width="formLabelWidth" prop="username">
									<el-input v-model="userAddForm.username" autocomplete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
									<el-input v-model="userAddForm.password" autocomplete="off"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogAddFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="addFormSubmmit('userAddForm')">确 定</el-button>
				</div>
			</el-dialog>
			<Upload @loadUser="getAllUsers()" />
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryParams.pageNum" :page-sizes="[1, 5, 20, 40]" :page-size="queryParams.pageSize"
				layout="total, sizes, prev, pager, next, jumper" :total="queryParams.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		stuList,
		stuDelete,
		stuRevise,
		stuAdd,
		managerRegist
	} from '../../http/api.js'
	import userClassify from '../../components/userClassify.vue'
	import Upload from './roles/components/Upload.vue'
	export default {
		data() {
			return {
				// 查询参数
				queryParams: {
					pageNum: 1, //当前页数
					pageSize: 20, //每页显示多少条
					total: 0,
					userList: []
				},
				// 基础对象，包含了一些基础的数据如：部门有哪些种类，角色有哪些种类
				baseData: {},
				tableUserData: [], //用户data
				// 修改弹窗 对象
				uploadObj: {
					uploadVisible: false,
					data: {}
				},
				// 添加用户弹窗
				dialogAddFormVisible: false,
				userAddForm: {
					nickname: '默认用户',
					role: null,
					username: '',
					password: '',
					stt_time: "",
					end_time: ""
				},
				formLabelWidth: '100px',
				departmentsData: [],
				userAddRules: {
					nickname: [{
						required: false,
						message: '请输入用户昵称',
						trigger: 'blur'
					}],
					role: [{
						required: true,
						message: '请选择角色',
						trigger: 'blur'
					}],
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
				}
			}
		},
		components: {
			userClassify,
			Upload
		},
		created() {

		},
		mounted() {
			this.getAllUsers()
			// this.loadBaseData()
		},
		methods: {
			getRole(item) {
				if (item == 0) {
					return "普通用户"
				} else if (item == 1) {
					return "管理员"
				} else if (item == 2) {
					return "专家"
				}
			},
			getVip_time(item) {
				if (item == 0) {
					return "未成为会员"
				} else {
					return item
				}
			},
			getVip(item) {
				if (item == 1) {
					return "是"
				} else {
					return "不是"
				}
			},
			getSex(sex) {
				if (sex == "0") {
					return '男'
				} else if (sex == "1") {
					return '女'
				} else return ""
			},
			// 分页参数初始化
			queryParamsInit(num) {
				this.queryParams.total = num
			},

			// 每页 展示数量
			handleSizeChange(val) {
				this.queryParams.pageSize = val
				this.getAllUsers()
			},
			// 当前页码
			handleCurrentChange(val) {
				console.log('change');
				this.queryParams.pageNum = val
				this.getAllUsers()
			},
			// 加载基础数据
			loadBaseData() {
				this.$axios({
					url: 'http://localhost:3000/crc/baseData',
					method: 'get'
				}).then(res => {
					this.$store.commit('setBaseData', res.data)
					console.log(res.data)
				})
			},
			// 弹窗隐藏函数
			hanleUpVisb(value) {
				this.uploadObj.uploadVisible = value
			},
			// 修改user
			uploadUser(user) {
				this.$bus.$emit('stuReviseShow', user)

			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex == 1) {
					return 'warning-row';
				} else if (rowIndex == 3) {
					return 'success-row';
				}
				return '';
			},
			indexMethod(index) {
				return index;
			},
			getAllUsers() {
				stuList({
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize
				}).then(res => {
					console.log(res)
					if (res.status) {
						this.queryParams.userList = res.list
						this.queryParamsInit(res.total)
					} else {
						this.$message.error("查询失败")
					}
				})
			},
			// 用户名重复判断
			addFormInit() {
				for (let key in this.userAddForm) {
					this.userAddForm[key] = ""
				}
			},
			addFormSubmmit(formName) {
				// 验证表单
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var submitForm = {
							role: this.userAddForm.role,
							username: this.userAddForm.username,
							password: this.userAddForm.password,
						}
						console.log(submitForm, 'info_user add');
						managerRegist(submitForm).then(res => {
							console.log(res);
							if (res.status) {
								this.dialogAddFormVisible = false
								this.addFormInit()
								this.getAllUsers()
								this.$message.success("新增用户成功")
							} else {
								this.$message.error("新增用户失败")
							}
						})
					} else {
						this.$message({
							message: '请检查表单',
							type: 'error'
						})
					}
				})
			},
			// 删除单个用户
			dltUserOne(id) {
				stuDelete({
					id
				}).then(res => {
					console.log(res);
					if (res.status) {
						this.$message.success("删除用户成功")
						this.getAllUsers()

					} else {
						this.$message.error("删除用户失败")
					}
				})
			},
			// 修改用户信息
			changeUser() {
				// 找到该用户信息
			}



		},
	}
</script>
<style lang="less" scoped>
	#container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 10px;

		.operation_btns {
			margin-top: 20px;
		}
	}

	.warning-row {
		background-color: oldlace;
	}

	.success-row {
		background-color: #f0f9eb;
	}

	.info-row {
		background-color: #ccc;
	}

	.add_dialog {
		// width: 800px;
	}
</style>