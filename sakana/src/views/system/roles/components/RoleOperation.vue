<template>
	<el-row class="contain">
		<el-col :span="2">
			<el-button @click="addDialogShow()" size="small" type="primary" plain icon="el-icon-plus">
				新增
			</el-button>
		</el-col>
		<el-col :span="2">
			<el-button :disabled="operationShow.batchRevise" size="small" type="success" plain icon="el-icon-search">
				修改
			</el-button>
		</el-col>
		<el-col :span="2">
			<el-button @click="dltMore()" :disabled="operationShow.batchDelete" size="small" type="danger" plain icon="el-icon-delete">
				删除
			</el-button>
		</el-col>
		<el-col :span="2">
			<el-button size="small" type="info" plain icon="el-icon-download">
				导入
			</el-button>
		</el-col>
		<el-col :span="2">
			<el-button size="small" type="warning" plain icon="el-icon-upload2">
				导出
			</el-button>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: ['operationShow'],
		methods: {
			addDialogShow() {
				this.$bus.$emit('addDialogShow')
			},
			reviseDialogShow() {
				this.$bus.$emit('reviseDialogShow')
			},
			dltMore(){
				this.$emit('dltMore')
			}
		}
	}
</script>

<style scoped lang="less">
	.contain {
		padding-left: 30px;
		padding-top: 30px;
	}
</style>
