<template>
	<div class="contain">
		<el-form :label-position='labelPostion' label-width="100px" :model='roleQueryParams'>
			<el-row>
				<el-col :span="6">
					<el-form-item label="角色编号">
						<el-input v-model="roleQueryParams.role_id" @change="searchRole()">

						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="角色名词">
						<el-input v-model="roleQueryParams.role_name" @change="searchRole()">

						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="角色状态">
						<el-select v-model="roleQueryParams.status" @change="searchRole()">
							<el-option label="运行中" value="1">
							</el-option>
							<el-option label="禁用中" value="0">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="创建时间">
						<el-date-picker align="center" v-model="roleQueryParams.create_timeSection" type="daterange"
							range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row class="btns">
			<el-col :span="24">
				<el-button @click="searchRole()" type="primary">
					搜索
				</el-button>
				<el-button @click="resetCondition()" type="">
					重置
				</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				labelPostion: 'right',
				roleQueryParams: {
					role_id: "",
					role_name: "",
					status: "",
					create_timeSection: "",
				},
			}
		},
		computed: {
			time() {
				return this.roleQueryParams.create_timeSection
			}
		},
		methods: {
			searchRole() {
				this.$emit('searchRole', this.roleQueryParams)
			},
			resetCondition() {
				this.roleQueryParams.role_id = ""
				this.roleQueryParams.role_name = ""
				this.roleQueryParams.status = ""
				this.roleQueryParams.create_timeSection = ""
				this.$emit('resetUserList')
			}
		}
	}
</script>

<style scoped lang="less">
	.contain {
		padding-top: 30px;
	}

	.btns {
		padding-left: 30px;
	}
</style>
