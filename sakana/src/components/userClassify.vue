<template>
	<div id="classify_container">
		<el-form ref="form" :model="form" label-position="left">
			<el-row type="flex" class="yuri-row">
				<el-col :span="4" class="yuri-row-col">
					<el-form-item label="学生ID">
						<el-input v-model="form.stuId" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="yuri-row-col">
					<el-form-item label="学生姓名">
						<el-input v-model="form.stuName" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="yuri-row-col">
					<el-form-item label="用户名">
						<el-input v-model="form.username" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="yuri-row-col">
					<el-form-item class="date" label="班级">
						<el-select v-model="form.class_name">
							<el-option label="初一1班" value="cy-1">
							</el-option>
							<el-option label="初一2班" value="cy-2">
							</el-option>
							<el-option label="初一3班" value="cy-3">
							</el-option>
							<el-option label="初一4班" value="cy-4">
							</el-option>
							<el-option label="初一5班" value="cy-5">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="yuri-row-col">
					<el-form-item class="date" label="性别">
						<el-select v-model="form.sex">
							<el-option label="男" value="0">
							</el-option>
							<el-option label="女" value="1">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="yuri-row-col">
					<el-form-item>
						<div class="search_btn">
							<el-button @click="search" class="search_btn_sch" type="primary">搜索</el-button>
							<el-button type="">重置</el-button>
						</div>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					stuId: '',
					stuName: '',
					username: '',
					class_name: '',
					sex: "",
				},
			}
		},
		mounted() {},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			search() {

			},
		},
	}
</script>
<style lang="less" scoped>
	.yuri-row {
		flex-wrap: wrap;
		width: 1600px;
	}

	.yuri-row-col {
		width: 300px;
	}

	#classify_container {
		width: 100%;
	}

	.el-form {
		display: flex;
		align-items: center;

		.date {
			display: flex;
		}

		.el-form-item {
			display: flex;
			align-items: center;
			margin-right: 10px;
		}
	}

	.search_btn {
		display: flex;
		align-items: center;
		flex-direction: row-reverse;

		.search_btn_sch {
			margin-right: 20px;
			margin-left: 20px;
		}
	}
</style>
<!-- users界面 搜索框 -->
