<template>
	<div id="container">
		<manga-query @searchManga='searchManga' @resetUserList='resetUserList' />
		<manga-operation @dltMore='dltMore()' :operationShow='operationShow' />
		<el-table stripe :data="queryParams.userList" style="width: 100%" :row-class-name="tableRowClassName"
			header-row-class-name='info-row' @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="manga_id" label="漫画编号" width="">
			</el-table-column>
			<el-table-column prop="manga_name" label="漫画名称" width="">
			</el-table-column>
			<el-table-column prop="pms_char" label="漫画权限符" width="">
			</el-table-column>
			<el-table-column prop="status" label="漫画状态" width="">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" active-text='激活中' inactive-text='禁用中'>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="createtime" label="上传时间" width="220px">
			</el-table-column>
			<el-table-column label="操作" width="400px">
				<template slot-scope="scope">
					<el-button @click="reviseDialogShow(scope.row)" size="mini" type="success" plain
						icon="el-icon-search">修改
					</el-button>
					<el-button @click="dltOne(scope.row.manga_id)" size="mini" type="danger" plain
						icon="el-icon-delete">
						删除</el-button>
					<el-button @click="detailDialogShow(scope.row)" size="mini" type="info" plain icon="el-icon-more">
						更多
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="queryParams.pageNum" :page-sizes="[1, 2, 3, 4,20]" :page-size="queryParams.pageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="queryParams.total">
		</el-pagination>
		<manga-add-dialog :mangasData="backData.data" @reloadTable='loadMangas()' />
		<manga-revise-dialog :mangasData="backData.data" @reloadTable='loadMangas()' />
		<manga-detail-dialog />
	</div>
</template>

<script>
	import MangaQuery from './mangas/components/MangaQuery'
	import MangaOperation from './mangas/components/MangaOperation'
	import MangaAddDialog from './mangas/components/MangaAddDialog'
	import MangaReviseDialog from './mangas/components/MangaReviseDialog'
	import MangaDetailDialog from './mangas/components/MangaDetailDialog'
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
				mangasTable: [],
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
			MangaQuery, //查询
			MangaOperation, //批量操作
			MangaAddDialog, //添加弹窗
			MangaReviseDialog, //修改信息弹窗
			MangaDetailDialog,//详情信息弹窗
		},
		created() {
			// 加载后端数据
			this.loadMangas()
		},
		methods: {
			// 删除多个角色
			dltMore() {
				var id_arr = []
				for (var i = 0; i < this.selectRowArr.length; i++) {
					id_arr.push(this.selectRowArr[i].manga_id)
				}
				this.$axios({
					url: 'http://localhost:3000/mangas/dltMore',
					method: 'POST',
					params: {
						id_arr: id_arr
					}
				}).then(res => {
					console.log(res);
					if (res.data.status) {
						this.show = false
						this.loadMangas()
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
			reviseDialogShow(manga) {
				this.$bus.$emit('reviseDialogShow', manga)
			},
			// 详情弹窗显示
			detailDialogShow(manga){
				this.$bus.$emit('detailDialogShow', manga)
			},
			// add manga重复判断
			mangaRepeat(addForm) {},
			// 删除角色
			dltOne(manga_id) {
				this.$axios({
					url: 'http://localhost:3000/mangas/dlt',
					method: 'post',
					params: {
						manga_id: manga_id
					}
				}).then(res => {
					if (res.data.status) {
						this.show = false
						this.loadMangas()
					}
					this.$message({
						message: res.data.message,
						type: res.data.status ? 'success' : 'error'
					})
				})
			},
			// 条件重置，重新加载数据
			resetUserList() {
				this.loadMangas()
			},
			// 按条件搜索角色
			searchManga(params) {
				console.log(params)
				var arr = this.backData.data
				this.mangasTable = []
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].manga_id.indexOf(params.manga_id) != -1 &&
						arr[i].manga_name.indexOf(params.manga_name) != -1 &&
						(arr[i].status == params.status || params.status == "")
					) {
						this.mangasTable.push(arr[i])
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
				this.userListLoad()
			},
			// 当前页码
			handleCurrentChange(val) {
				this.queryParams.pageNum = val
				this.userListLoad()
			},
			// 分页参数初始化
			queryParamsInit() {
				this.queryParams.total = this.mangasTable.length
			},
			// 根据query参数不同加载表单数据
			userListLoad() {
				// 拿到原版所有数据
				var arr = this.mangasTable
				var newArr = []
				// 计算区间,当前页码*每页数量 2*2=4 2*（2-1）=2 arr[4]为5
				var prev = (this.queryParams.pageNum - 1) * (this.queryParams.pageSize)
				var after = (this.queryParams.pageNum) * (this.queryParams.pageSize) - 1
				// 先得到指定分页数组
				this.queryParams.userList = arr.slice(prev, after + 1)
			},
			// 加载后端数据
			loadMangas() {
				this.$axios({
					url: 'http://localhost:3000/mangas/all',
					method: 'get',
				}).then(res => {
					console.log(res)
					this.backData.data = res.data.mangaData
					this.backData.total = res.data.mangaData.length
					this.queryParams.userList = res.data.mangaData
					this.mangasTable = res.data.mangaData
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
