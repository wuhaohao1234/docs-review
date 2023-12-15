<template>
	<div class="contain">
		<el-form :label-position='labelPostion' label-width="100px" :model='teacherQueryParams'>
			<el-row>
				<el-col :span="4">
					<el-form-item label="教师ID">
						<el-input v-model="teacherQueryParams.teacher_id" @change="searchTeacher()">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="教师名称">
						<el-input v-model="teacherQueryParams.teacher_name" @change="searchTeacher()">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item label="性别">
						<el-select v-model="teacherQueryParams.sex" placeholder="请选择">
							<el-option label="男" :value="0">
							</el-option>
							<el-option label="女" :value="1">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6" style="margin-left: 30px;">
					<el-button @click="searchTeacher()" type="primary">
						搜索
					</el-button>
					<el-button @click="resetCondition()" type="">
						重置
					</el-button>
				</el-col>
			</el-row>
		</el-form>
		<el-row class="btns">

		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				labelPostion: 'right',
				teacherQueryParams: {
					teacher_id: "",
					teacher_name: "",
					sex: null,
				},
			}
		},
		computed: {
			time() {
				return this.teacherQueryParams.create_timeSection
			}
		},
		methods: {
			searchTeacher() {
				console.log('出现搜索');
				this.$emit('searchTeacher', this.teacherQueryParams)
			},
			resetCondition() {
				for (let item in this.teacherQueryParams) {}
				console.log(this.teacherQueryParams);
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
