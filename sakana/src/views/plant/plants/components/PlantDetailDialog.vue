<template>
	<el-dialog class="detail_dialog" title="漫画详情" :visible.sync="show">
		<el-form ref="detailForm" :rules='detailRules' :model="detailForm">
			<el-row>
				<el-col :span="6" class="row_to_column">
					<el-form-item label="漫画封面" :label-width="formLabelWidth" prop="manga_cover">
						<div class="manga_cover">
							<img :src="`http://localhost:3000/imgs/manga/${detailForm.cover_name}`" alt="">
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="18">
					<el-row>
						<el-col :span="12">
							<el-form-item label="漫画编号" :label-width="formLabelWidth" prop="manga_id">
								<el-input disabled disabled  :value="detailForm.manga_id" autocomplete="off">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="漫画名" :label-width="formLabelWidth" prop="manga_name">
								<el-input disabled  :value="detailForm.manga_name" autocomplete="off">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="漫画状态" :label-width="formLabelWidth" prop="status">
								<el-select disabled :value="detailForm.status" placeholder="请选择漫画状态">
									<el-option value="1" label="启用中"></el-option>
									<el-option value="0" label="禁用中"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="漫画权限" :label-width="formLabelWidth" prop="pms_char">
								<el-select disabled :value="detailForm.pms_char" placeholder="漫画权限符">
									<el-option value="x-26"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="漫画作者" :label-width="formLabelWidth" prop="manga_writer">
								<el-input disabled :value="detailForm.manga_writer" placeholder="漫画作者">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="漫画负责人" :label-width="formLabelWidth" prop="manga_editer">
								<el-input disabled :value="detailForm.manga_editer" placeholder="漫画负责人">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="类别" :label-width="formLabelWidth" prop="category">
								<el-select disabled :value="detailForm.category" placeholder="请选择漫画类别">
									<el-option value="1" label="少女漫画"></el-option>
									<el-option value="0" label="女青漫画"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="标签" :label-width="formLabelWidth" prop="label">
								<el-select disabled :value="detailForm.label" placeholder="请选择漫画标签">
									<el-option value="青春" label="青春"></el-option>
									<el-option value="爱情" label="爱情"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="连载状态" :label-width="formLabelWidth" prop="serial_status">
								<el-select disabled :value="detailForm.serial_status" placeholder="请选择漫画连载状态">
									<el-option value="1" label="连载中"></el-option>
									<el-option value="0" label="完结"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row style="margin-top: 40px;">
				<el-col :span="24">
					<el-form-item label="漫画简介" :label-width="formLabelWidth" prop="serial_status">
						<el-input disabled type="textarea" :rows="4" placeholder="请输入内容" :value="detailForm.manga_introduce">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show=false">取 消</el-button>
			<el-button type="primary" @click='show=false'>确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				fullscreenLoading: false,
				show: false,
				labelPosition: 'top',
				formLabelWidth: '100px',
				manga: {}, //原版manga数据
				detailForm: {
					manga_id: "",
					manga_name: "",
					status: "",
					pms_char: "",
				},
				detailRules: {
					manga_cover: [{
						required: false,
						message: '请上传漫画封面',
						trigger: 'blur'
					}],
					manga_id: [{
						required: true,
						message: '请输入漫画id',
						trigger: 'blur'
					}],
					manga_name: [{
						required: true,
						message: '请输入漫画名',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '请选择漫画状态',
						trigger: 'blur'
					}],
					pms_char: [{
						required: true,
						message: '请选择漫画权限符',
						trigger: 'blur'
					}],
					manga_writer: [{
						required: true,
						message: '请输入漫画作者',
						trigger: 'blur'
					}],
					manga_editer: [{
						required: true,
						message: '请选择漫画负责人',
						trigger: 'blur'
					}],
					category: [{
						required: true,
						message: '请选择漫画分类',
						trigger: 'blur'
					}],
					label: [{
						required: true,
						message: '请选择漫画标签',
						trigger: 'blur'
					}],
					serial_status: [{
						required: true,
						message: '请选择漫画连载状态',
						trigger: 'blur'
					}, ],
				}
			}
		},
		created() {
			this.busEventBind()
		},
		mounted() {},
		methods: {
			// 全局总线事件绑定
			busEventBind() {
				this.$bus.$on('detailDialogShow', manga => {
					// 加载数据
					this.detailForm = manga
					this.manga = manga
					this.show = true
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.btns {
		display: flex;
		justify-content: flex-end;
	}
	.manga_cover{
		width: 180px;
		height: 240px;
		img{
			height: 100%;
		}
	}
</style>
