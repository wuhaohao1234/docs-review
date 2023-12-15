<template>
	<div id="container">
		<iframe src="http://localhost:7735/index" frameborder="0" width="100%" height="500px"></iframe>
	</div>
</template>

<script>
	import {
		plantList,
		plantDelete,
	} from '../../http/api.js'
	import PlantQuery from './parag/components/PlantQuery'
	import PlantOperation from './parag/components/PlantOperation'
	import PlantAddDialog from './parag/components/PlantAddDialog'
	import PlantReviseDialog from './parag/components/PlantReviseDialog'
	import PlantDetailDialog from './parag/components/PlantDetailDialog'
	export default {
		data() {
			return {
				// table选中数据
				iframeSrc:"./parag/para.html",
				ichiType_list: {},
				selectRowArr: [],
				queryParams: {
					pageNum: 1, //当前页数
					pageSize: 20, //每页显示多少条
					total: 0,
					userList: [], //真实渲染的数据
				},
				// 保存后端传过来的数据，不用于渲染，用于保存原始数据
				backData: {
					data: [],
					total: 0
				},
				// // 后端数据的备份，用于存储符合筛选条件的数据
				plantsTable: [],
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
			PlantQuery, //查询
			PlantOperation, //批量操作
			PlantAddDialog, //添加弹窗
			PlantReviseDialog, //修改信息弹窗
			PlantDetailDialog, //详情信息弹窗
		},
		async created() {
			this.busInit()
			// 加载一级文件夹列表
			// await this.loadIchiType_list()
			// 加载后端数据
			await this.loadPlants()
		},
		methods: {
			

			timeFormat(time) {
				return time.replace("T", " ").replace(".000Z", "")
			},
			busInit() {
				this.$bus.$on("fileListReload", data => {
					this.loadPlants()
				})
			},
			getIchiType_name(id) {
				for (var i = 0; i < this.ichiType_list.length; i++) {
					if (this.ichiType_list[i].id == id) {
						return this.ichiType_list[i].name
					}
				}
			},
			loadIchiType_list() {

				// ichiGradePlantList({
				// 	pageNum: 0,
				// 	pageSize: 0,
				// 	type_id: 1,
				// 	userId: userMation.id,
				// 	all: true
				// }).then(res => {
				// 	console.log(res)
				// 	this.ichiType_list = res.list
				// })
			},
			// 删除多个角色
			dltMore() {
				var id_arr = []
				for (var i = 0; i < this.selectRowArr.length; i++) {
					id_arr.push(this.selectRowArr[i].plant_id)
				}
				this.$axios({
					url: 'http://localhost:3000/plants/dltMore',
					method: 'POST',
					params: {
						id_arr: id_arr
					}
				}).then(res => {
					console.log(res);
					if (res.status) {
						this.show = false
						this.loadPlants()
					}
					this.$message({
						message: res.message,
						type: res.status ? 'success' : 'error'
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
			reviseDialogShow(plant) {
				this.$bus.$emit('reviseDialogShow', plant)
			},
			// 详情弹窗显示
			detailDialogShow(plant) {
				this.$bus.$emit('detailDialogShow', plant)
			},
			// add plant重复判断
			plantRepeat(addForm) {},
			// 删除
			dltOne(id) {
				plantDelete({
					id
				}).then(res => {
					if (res.status) {
						this.$message.success("删除成功")
					} else {
						this.$message.error("删除失败")
					}
					this.loadPlants()
				})
			},
			// 条件重置，重新加载数据
			resetUserList() {
				this.loadPlants()
			},
			// 按条件搜索角色
			searchPlant(params) {
				console.log(params)
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
				this.loadPlants()
			},
			// 当前页码
			handleCurrentChange(val) {
				this.queryParams.pageNum = val
				this.loadPlants()
			},
			// 分页参数初始化
			queryParamsInit(total) {
				this.queryParams.total = total
			},
			// 加载后端数据
			loadPlants() {
				const userMation = JSON.parse(localStorage.getItem("userMation"))
				console.log(userMation)
				plantList({
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
					type_id: 4,
					userId: userMation.id,
					all: userMation.role == 1 || userMation.role == 2
				}).then(res => {
					console.log(res)
					this.queryParams.userList = res.list
					this.queryParamsInit(res.total)
				})
			},
			downloadRaw(tar, isRaw) {
				this.$axios({
						url: 'http://localhost:7735/filesm/download', // Express 服务器地址
						method: 'post',
						data: {
							id: tar.id,
							operationId: tar.operationId,
							tmpname: tar.tmpname,
							isRaw,
							type_id:tar.operationId
						},
						responseType: 'blob' // 指定响应类型为二进制流
					})
					.then(res => {
						console.log(res)
						const url = window.URL.createObjectURL(new Blob([res.data]));
						const link = document.createElement('a');
						link.href = url;
						link.setAttribute('download', `${tar.nativename}.${tar.fileType}`);
						document.body.appendChild(
							link);
						link.click();
					}).catch(error => {
						console.error('Error downloading file:', error);
					});
			},

		},
	}
</script>
<style lang="less" scoped>
	#container {
		width: 100%;
		height: 100%;
		background-color: #fff;

		.overbox {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&:hover {
				cursor: pointer;
				content: attr(title);
			}
		}
	}
</style>