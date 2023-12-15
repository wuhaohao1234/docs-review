<template>
	<div id="container">
		<manager-query v-show='false' @searchManager='searchManager' @resetUserList='resetUserList' />
		<manager-operation @dltMore='dltMore()' :operationShow='operationShow' />
		<el-table stripe :data="queryParams.userList" style="width: 100%" :row-class-name="tableRowClassName"
			header-row-class-name='info-row' @selection-change="handleSelectionChange">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称" width="">
			</el-table-column>
			<el-table-column prop="username" label="账户" width="">
			</el-table-column>
			<el-table-column prop="password" label="密码" width="">
			</el-table-column>
			<el-table-column label="操作" width="400px">
				<template slot-scope="scope">
					<!-- <el-button @click="reviseDialogShow(scope.row)" size="mini" type="success" plain
						icon="el-icon-search">修改
					</el-button> -->
					<el-button @click="dltOne(scope.row.id)" size="mini" type="danger" plain icon="el-icon-delete">
						删除</el-button>
					<!-- <el-button @click="detailDialogShow(scope.row)" size="mini" type="info" plain icon="el-icon-more">
						更多
					</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="queryParams.pageNum" :page-sizes="[1, 2, 3, 4,20]" :page-size="queryParams.pageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="queryParams.total">
		</el-pagination>
		<manager-add-dialog @reloadTable='loadManagers()' />
		<manager-revise-dialog @reloadTable='loadManagers()' />
		<manager-detail-dialog />
	</div>
</template>

<script>
	import {
		managerList,
		managerDelete,
	} from '../../http/api.js'
	import ManagerQuery from './managers/components/ManagerQuery'
	import ManagerOperation from './managers/components/ManagerOperation'
	import ManagerAddDialog from './managers/components/ManagerAddDialog'
	import ManagerReviseDialog from './managers/components/ManagerReviseDialog'
	import ManagerDetailDialog from './managers/components/ManagerDetailDialog'
	export default {
		data() {
			return {
				// table选中数据
				selectRowArr: [],
				queryParams: {
					pageNum: 1, //当前页数
					pageSize: 4, //每页显示多少条
					total: 0,
					userList: [{
						managerId: "132",
						manager_name: "hoshimiya",
						user_name: "hoshimiya124314214",
						password: "11f1",
						sex: 0,
						create_time: "123124124"
					}, {
						managerId: "132",
						manager_name: "hoshimiya",
						user_name: "hoshimiya124314214",
						password: "asfasfaewf",
						sex: 0,
						create_time: "123124124"
					}], //真实渲染的数据
				},
				// 保存后端传过来的数据，不用于渲染，用于保存原始数据
				backData: {
					data: [],
					total: 0
				},
				// // 后端数据的备份，用于存储符合筛选条件的数据
				managersTable: [],
				// 控制各个弹窗的出现
				dialogShow: {
					add: false,
				},
				// 控制operation 组件的启用
				operationShow: {
					batchRevise: true,
					batchDelete: true,
				}
			};
		},
		components: {
			ManagerQuery, //查询
			ManagerOperation, //批量操作
			ManagerAddDialog, //添加弹窗
			ManagerReviseDialog, //修改信息弹窗
			ManagerDetailDialog, //详情信息弹窗
		},
		created() {
			// 加载后端数据
			this.loadManagers()
		},
		methods: {
			getRole(roleId) {
				switch (roleId) {
					case 3:
						return "教师"
						break;
					case 4:
						return "学生"
						break;
					case 5:
						return "超级管理员"
						break;
					default:
				}
			},
			getSex(sex) {
				if (sex == "0") {
					return '男'
				} else if (sex == "1") {
					return '女'
				} else return ""
			},
			// 删除多个角色
			dltMore() {
				var id_arr = []
				for (var i = 0; i < this.selectRowArr.length; i++) {
					id_arr.push(this.selectRowArr[i].managerId)
				}
				this.$axios({
					url: 'http://localhost:3000/managers/dltMore',
					method: 'POST',
					params: {
						id_arr: id_arr
					}
				}).then(res => {
					console.log(res);
					if (res.data.status) {
						this.show = false
						this.loadManagers()
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
				}).catch(err => {
					console.log(err);
				})
			},
			// table被选中
			handleSelectionChange(val) {
				if (val.length) {
					this.operationShow.batchRevise = false
					this.operationShow.batchDelete = false
					this.selectRowArr = val
					// this.$bus.$emit('batchReviseDialogShow',val)
				} else {
					this.operationShow.batchRevise = true
					this.operationShow.batchDelete = true
				}
			},
			// 控制修改角色弹窗展示
			reviseDialogShow(manager) {
				this.$bus.$emit('reviseDialogShow', manager)
			},
			// 详情弹窗显示
			detailDialogShow(manager) {
				this.$bus.$emit('detailDialogShow', manager)
			},
			// add manager重复判断
			managerRepeat(addForm) {},
			// 删除角色
			dltOne(id) {
				managerDelete({
					id
				}).then(res => {
					if (res.status = 200) {
						if (res.data.status) {
							this.$message.success("删除用户成功")
							this.loadManagers()
						} else {
							this.$message.error("删除用户失败")
						}
					}
				})
			},
			// 条件重置，重新加载数据
			resetUserList() {
				this.loadManagers()
			},
			// 按条件搜索角色
			searchManager(params) {
				console.log(params)
				var arr = this.backData.data
				this.managersTable = []
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].managerId.indexOf(params.managerId) != -1 &&
						arr[i].manager_name.indexOf(params.manager_name) != -1 &&
						(arr[i].status == params.status || params.status == "")
					) {
						this.managersTable.push(arr[i])
					}
				}
				this.queryParamsInit()
				this.userListLoad()
			},
			// 控制每行index
			indexMethod(index) {
				return index + 1;
			},
			// 控制每行样式
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
			// 每页 展示数量
			handleSizeChange(val) {
				this.queryParams.pageSize = val
				this.loadManagers()
			},
			// 当前页码
			handleCurrentChange(val) {
				this.queryParams.pageNum = val
				this.loadManagers()
			},
			// 分页参数初始化
			queryParamsInit(total) {
				this.queryParams.total = total
			},
			// 根据query参数不同加载表单数据
			userListLoad() {
				// 拿到原版所有数据
				var arr = this.managersTable
				var newArr = []
				// 计算区间,当前页码*每页数量 2*2=4 2*（2-1）=2 arr[4]为5
				var prev = (this.queryParams.pageNum - 1) * (this.queryParams.pageSize)
				var after = (this.queryParams.pageNum) * (this.queryParams.pageSize) - 1
				// 先得到指定分页数组
				this.queryParams.userList = arr.slice(prev, after + 1)
			},
			// 加载后端数据
			loadManagers() {
				managerList({
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize
				}).then(res => {
					// 用于渲染的数据
					console.log(res);
					if (res.status == 200) {
						this.queryParams.userList = res.data.list
						// 初始化总数，后台总数
						this.queryParamsInit(res.data.total)
					} else {
						this.$message.error("查询失败")
					}

				}).then(() => {

				})
				// this.$axios({
				// 	url: 'http://localhost:3000/managers/all',
				// 	method: 'get',
				// }).then(res => {
				// 	console.log(res)
				// 	this.backData.data = res.data.managerData
				// 	this.backData.total = res.data.managerData.length
				// 	this.queryParams.userList = res.data.managerData
				// 	this.managersTable = res.data.managerData
				// })
				// .then(() => {
				// 	this.queryParamsInit()
				// 	this.userListLoad()
				// })

			}
		},
	}
</script>
<style lang="less">
	#container {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
</style>
