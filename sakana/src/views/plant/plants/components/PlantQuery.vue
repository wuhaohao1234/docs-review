<template>
	<div class="contain">
		<el-form :label-position='labelPostion' label-width="100px" :model='mangaQueryParams'>
			<el-row>
				<el-col :span="6">
					<el-form-item label="植物编号">
						<el-input v-model="mangaQueryParams.manga_id" @change="searchManga()">

						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="植物名称">
						<el-input v-model="mangaQueryParams.manga_name" @change="searchManga()">

						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row class="btns">
			<el-col :span="24">
				<el-button @click="searchManga()" type="primary">
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
