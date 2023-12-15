<template>
	<div id="container">
		<role-query @searchRole='searchRole' @resetUserList='resetUserList' />
		<role-operation @dltMore='dltMore()' :operationShow='operationShow' />
		<el-table stripe :data="queryParams.userList" style="width: 100%" :row-class-name="tableRowClassName"
			header-row-class-name='info-row' @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="role_id" label="角色编号" width="">
			</el-table-column>
			<el-table-column prop="role_name" label="角色名词" width="">
			</el-table-column>
			<el-table-column prop="pms_char" label="权限符" width="">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="">
			</el-table-column>
			<el-table-column prop="createtime" label="创建时间" width="220px">
			</el-table-column>
			<el-table-column label="操作" width="400px">
				<template slot-scope="scope">
					<el-button @click="reviseDialogShow(scope.row)" size="mini" type="success" plain
						icon="el-icon-search">修改
					</el-button>
					<el-button @click="dltOne(scope.row.role_id)" size="mini" type="danger" plain icon="el-icon-delete">
						删除</el-button>
					<el-button size="mini" type="info" plain icon="el-icon-more">更多</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="queryParams.pageNum" :page-sizes="[1, 2, 3, 4,20]" :page-size="queryParams.pageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="queryParams.total">
		</el-pagination>
		<role-add-dialog :rolesData="backData.data" @reloadTable='loadRoles()' />
		<RoleReviseDialog :rolesData="backData.data" @reloadTable='loadRoles()' />
	</div>
</template>

<script>
	import RoleQuery from './roles/components/RoleQuery'
	import RoleOperation from './roles/components/RoleOperation'
	import RoleAddDialog from './roles/components/RoleAddDialog'
	import RoleReviseDialog from './roles/components/RoleReviseDialog'
	export default {
		data() {
			return {
				// table选中数据
				selectRowArr: [],
				queryParams: {
					pageNum: 1, //当前页数
					pageSize: 4, //每页显示多少条
					total: 0,
					userList: [], //真实渲染的数据
				},
				// 保存后端传过来的数据，不用于渲染，用于保存原始数据
				backData: {
					data: [],
					total: 0
				},
				// // 后端数据的备份，用于存储符合筛选条件的数据
				rolesTable: [],
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
			RoleQuery,
			RoleOperation,
			RoleAddDialog,
			RoleReviseDialog
		},
		created() {
			// 加载后端数据
			this.loadRoles()
		},
		methods: {
			// 删除多个角色
			dltMore() {
				var id_arr = []
				for (var i = 0; i < this.selectRowArr.length; i++) {
					id_arr.push(this.selectRowArr[i].role_id)
				}
				this.$axios({
					url: 'http://localhost:3000/roles/dltMore',
					method: 'POST',
					params: {
						id_arr: id_arr
					}
				}).then(res => {
					console.log(res);
					if (res.data.status) {
						this.show = false
						this.loadRoles()
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
				}).catch(err=>{
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
			reviseDialogShow(role) {
				this.$bus.$emit('reviseDialogShow', role)
			},
			// add role重复判断
			roleRepeat(addForm) {},
			// 删除角色
			dltOne(role_id) {
				this.$axios({
					url: 'http://localhost:3000/roles/dlt',
					method: 'post',
					params: {
						role_id: role_id
					}
				}).then(res => {
					if (res.data.status) {
						this.show = false
						this.loadRoles()
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
				})
			},
			// 条件重置，重新加载数据
			resetUserList() {
				this.loadRoles()
			},
			// 按条件搜索角色
			searchRole(params) {
				console.log(params)
				var arr = this.backData.data
				this.rolesTable = []
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].role_id.indexOf(params.role_id) != -1 &&
						arr[i].role_name.indexOf(params.role_name) != -1 &&
						(arr[i].status == params.status || params.status == "")
					) {
						this.rolesTable.push(arr[i])
					}
				}
				this.queryParamsInit()
				this.userListLoad()
			},
			// 控制每行index
			indexMethod(index) {
				return index;
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
				this.userListLoad()
			},
			// 当前页码
			handleCurrentChange(val) {
				this.queryParams.pageNum = val
				this.userListLoad()
			},
			// 分页参数初始化
			queryParamsInit() {
				this.queryParams.total = this.rolesTable.length
			},
			// 根据query参数不同加载表单数据
			userListLoad() {
				// 拿到原版所有数据
				var arr = this.rolesTable
				var newArr = []
				// 计算区间,当前页码*每页数量 2*2=4 2*（2-1）=2 arr[4]为5
				var prev = (this.queryParams.pageNum - 1) * (this.queryParams.pageSize)
				var after = (this.queryParams.pageNum) * (this.queryParams.pageSize) - 1
				// 先得到指定分页数组
				this.queryParams.userList = arr.slice(prev, after + 1)
			},
			// 加载后端数据
			loadRoles() {
				this.$axios({
					url: 'http://localhost:3000/roles/all',
					method: 'get',
				}).then(res => {
					this.backData.data = res.data.roleData
					this.backData.total = res.data.roleData.length
					this.queryParams.userList = res.data.roleData
					this.rolesTable = res.data.roleData
				}).then(() => {
					this.queryParamsInit()
					this.userListLoad()
				})
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
