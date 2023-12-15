<template>
	<div class="container">
		<!-- 图片上传 -->
		<el-card class="card_img_upload">
			<div slot="header" class="clearfix">
				五图上传
			</div>
			<div class="card-content">
				<div class="row">
					<div class="left">
						<el-upload action="#" list-type="picture-card" :auto-upload="false">
							<i slot="default" class="el-icon-plus"></i>
							<div slot="file" slot-scope="{file}">
								<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
								<span class="el-upload-list__item-actions">
									<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
										<i class="el-icon-zoom-in"></i>
									</span>
									<span v-if="!disabled" class="el-upload-list__item-delete"
										@click="handleDownload(file)">
										<i class="el-icon-download"></i>
									</span>
									<span v-if="!disabled" class="el-upload-list__item-delete"
										@click="handleRemove(file)">
										<i class="el-icon-delete"></i>
									</span>
								</span>
							</div>
						</el-upload>
					</div>
					<div class="right">
						<div class="right_top">
							<el-upload action="#" list-type="picture-card" :auto-upload="false">
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{file}">
									<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
									<span class="el-upload-list__item-actions">
										<span class="el-upload-list__item-preview"
											@click="handlePictureCardPreview(file)">
											<i class="el-icon-zoom-in"></i>
										</span>
										<span v-if="!disabled" class="el-upload-list__item-delete"
											@click="handleDownload(file)">
											<i class="el-icon-download"></i>
										</span>
										<span v-if="!disabled" class="el-upload-list__item-delete"
											@click="handleRemove(file)">
											<i class="el-icon-delete"></i>
										</span>
									</span>
								</div>
							</el-upload>
						</div>
						<div class="right_bottom">
							<div class="img_upload_box">
								<el-upload action="#" list-type="picture-card" :auto-upload="false">
									<i slot="default" class="el-icon-plus"></i>
									<div slot="file" slot-scope="{file}">
										<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview"
												@click="handlePictureCardPreview(file)">
												<i class="el-icon-zoom-in"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleDownload(file)">
												<i class="el-icon-download"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleRemove(file)">
												<i class="el-icon-delete"></i>
											</span>
										</span>
									</div>
								</el-upload>
							</div>
							<div class="img_upload_box">
								<el-upload action="#" list-type="picture-card" :auto-upload="false">
									<i slot="default" class="el-icon-plus"></i>
									<div slot="file" slot-scope="{file}">
										<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview"
												@click="handlePictureCardPreview(file)">
												<i class="el-icon-zoom-in"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleDownload(file)">
												<i class="el-icon-download"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleRemove(file)">
												<i class="el-icon-delete"></i>
											</span>
										</span>
									</div>
								</el-upload>
							</div>
							<div class="img_upload_box">
								<el-upload action="#" list-type="picture-card" :auto-upload="false">
									<i slot="default" class="el-icon-plus"></i>
									<div slot="file" slot-scope="{file}">
										<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview"
												@click="handlePictureCardPreview(file)">
												<i class="el-icon-zoom-in"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleDownload(file)">
												<i class="el-icon-download"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleRemove(file)">
												<i class="el-icon-delete"></i>
											</span>
										</span>
									</div>
								</el-upload>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>图片上传</span>
			</div>
			<div class="card-content">
				<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload='false'
					:on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>图片上传</span>
			</div>
			<div class="card-content">
				<input type="file" @change="fileChange()" name="cmd">
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>图片上传</span>
			</div>
			<div class="card-content">
				<el-upload action="#" list-type="picture-card" :auto-upload="false" :limit='1'>
					<i slot="default" class="el-icon-plus"></i>
					<div class="file_preview" slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
								<i class="el-icon-download"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
								<i class="el-icon-delete"></i>
							</span>
						</span>
					</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
		</el-card>
		<el-card class="my-card">
			<div slot="header" class="clearfix">
				<span>五图上传</span>
			</div>
			<div class="card-content">
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="content_box box-column_main">
							<el-upload action="#" list-type="picture-card" :auto-upload="false">
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{file}">
									<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
									<span class="el-upload-list__item-actions">
										<span class="el-upload-list__item-preview"
											@click="handlePictureCardPreview(file)">
											<i class="el-icon-zoom-in"></i>
										</span>
										<span v-if="!disabled" class="el-upload-list__item-delete"
											@click="handleDownload(file)">
											<i class="el-icon-download"></i>
										</span>
										<span v-if="!disabled" class="el-upload-list__item-delete"
											@click="handleRemove(file)">
											<i class="el-icon-delete"></i>
										</span>
									</span>
								</div>
							</el-upload>
						</div>
					</el-col>
					<el-col :span="16">
						<el-row>
							<div class="content_box box-row_main">
								<el-upload action="#" list-type="picture-card" :auto-upload="false">
									<i slot="default" class="el-icon-plus"></i>
									<div slot="file" slot-scope="{file}">
										<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview"
												@click="handlePictureCardPreview(file)">
												<i class="el-icon-zoom-in"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleDownload(file)">
												<i class="el-icon-download"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleRemove(file)">
												<i class="el-icon-delete"></i>
											</span>
										</span>
									</div>
								</el-upload>
							</div>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="content_box box-row_enclosure">
									<el-upload action="#" list-type="picture-card" :auto-upload="false">
										<i slot="default" class="el-icon-plus"></i>
										<div slot="file" slot-scope="{file}">
											<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
											<span class="el-upload-list__item-actions">
												<span class="el-upload-list__item-preview"
													@click="handlePictureCardPreview(file)">
													<i class="el-icon-zoom-in"></i>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete"
													@click="handleDownload(file)">
													<i class="el-icon-download"></i>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete"
													@click="handleRemove(file)">
													<i class="el-icon-delete"></i>
												</span>
											</span>
										</div>
									</el-upload>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="content_box box-row_enclosure">
									<el-upload action="#" list-type="picture-card" :auto-upload="false">
										<i slot="default" class="el-icon-plus"></i>
										<div slot="file" slot-scope="{file}">
											<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
											<span class="el-upload-list__item-actions">
												<span class="el-upload-list__item-preview"
													@click="handlePictureCardPreview(file)">
													<i class="el-icon-zoom-in"></i>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete"
													@click="handleDownload(file)">
													<i class="el-icon-download"></i>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete"
													@click="handleRemove(file)">
													<i class="el-icon-delete"></i>
												</span>
											</span>
										</div>
									</el-upload>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="content_box box-row_enclosure">
									<el-upload action="#" list-type="picture-card" :auto-upload="false">
										<i slot="default" class="el-icon-plus"></i>
										<div slot="file" slot-scope="{file}">
											<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
											<span class="el-upload-list__item-actions">
												<span class="el-upload-list__item-preview"
													@click="handlePictureCardPreview(file)">
													<i class="el-icon-zoom-in"></i>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete"
													@click="handleDownload(file)">
													<i class="el-icon-download"></i>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete"
													@click="handleRemove(file)">
													<i class="el-icon-delete"></i>
												</span>
											</span>
										</div>
									</el-upload>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</el-card>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}]
			};
		},
		methods: {
			// input 图片选取
			fileChange(val) {
				console.log('图片选取', val)
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			}
		}
	}
</script>

<style lang="less">
	.card_img_upload {
		.row {
			display: flex;
			.left {
				& {
					width: 150px;
					height: 220px;
					overflow: hidden;
					margin-right: 10px;
				}

				.el-upload-list--picture-card .el-upload-list__item {
					width: 150px;
					height: 220px;
				}

				.el-upload--picture-card {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 150px;
					height: 220px;
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.right_top {
					& {
						width: 250px;
						height: 120px;
						overflow: hidden;
					}

					.el-upload-list--picture-card .el-upload-list__item {
						width: 250px;
						height: 120px;
					}

					.el-upload--picture-card {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 250px;
						height: 120px;
					}
				}

				.right_bottom {
					display: flex;
					justify-content: space-between;
	
					.el-upload-list--picture-card .el-upload-list__item {
						width: 80px;
						height: 80px;
					}

					.el-upload--picture-card {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 80px;
						height: 80px;
					}

					.img_upload_box {
						& {
							width: 80px;
							height: 80px;
							overflow: hidden;
						}
					}
				}
			}
		}
	}
</style>
<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100%;
		background-color: #fff;

		.box-card {
			width: 400px;
			margin: 20px;
		}
	}

	.content_box {
		background-color: aqua;

		&.box-column {
			height: 300px;

			.el-upload-list--picture-card .el-upload-list__item {
				height: 300px;
			}

			.el-upload--picture-card {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 300px;
			}
		}
	}
</style>
<style lang="less">
	.el-upload--picture-card {
		width: 200px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.my-card {
		.el-card__body {
			height: 100%;
		}
	}

	// 图片上传组件改造
	.content_box {
		background-color: aqua;

		&.box-column_main {
			& {
				width: 150px;
				height: 220px;
				overflow: hidden;
			}

			.el-upload-list--picture-card .el-upload-list__item {
				width: 150px;
				height: 220px;
			}

			.el-upload--picture-card {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 150px;
				height: 220px;
			}
		}

		&.box-row_main {
			& {
				width: 215px;
				height: 120px;
				overflow: hidden;
			}

			.el-upload-list--picture-card .el-upload-list__item {
				width: 215px;
				height: 120px;
			}

			.el-upload--picture-card {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 215px;
				height: 120px;
			}
		}

		&.box-row_enclosure {
			& {
				width: 80px;
				height: 80px;
				overflow: hidden;
			}

			.el-upload-list--picture-card .el-upload-list__item {
				width: 80px;
				height: 80px;
			}

			.el-upload--picture-card {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80px;
				height: 80px;
			}
		}
	}
</style>
