<template>
	<div class="contain">
		<el-form :label-position='labelPostion' label-width="100px" :model='mangaQueryParams'>
			<el-row>
				<el-col :span="6">
					<el-form-item label="漫画编号">
						<el-input v-model="mangaQueryParams.manga_id" @change="searchManga()">

						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="漫画名称">
						<el-input v-model="mangaQueryParams.manga_name" @change="searchManga()">

						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item label="漫画状态">
						<el-select v-model="mangaQueryParams.status" @change="searchManga()">
							<el-option label="运行中" value="1">
							</el-option>
							<el-option label="禁用中" value="0">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="创建时间">
						<el-date-picker align="center" v-model="mangaQueryParams.create_timeSection" type="daterange"
							range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row class="btns">
			<el-col :span="24">
				<el-button @click="searchManga()" type="primary">
					搜索她
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
				mangaQueryParams: {
					manga_id: "",
					manga_name: "",
					status: "",
					create_timeSection: "",
				},
			}
		},
		computed: {
			time() {
				return this.mangaQueryParams.create_timeSection
			}
		},
		methods: {
			searchManga() {
				console.log('出现搜索');
				this.$emit('searchManga', this.mangaQueryParams)
			},
			resetCondition() {
				this.mangaQueryParams.manga_id = ""
				this.mangaQueryParams.manga_name = ""
				this.mangaQueryParams.status = ""
				this.mangaQueryParams.create_timeSection = ""
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
