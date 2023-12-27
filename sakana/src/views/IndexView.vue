<template>
	<transition name="el-fade-in-linear">
		<div ref="indexView" id="indexView_container" v-show="transitionShow">
			<el-container>
				<el-aside class="mysider">
					<div class="side_head">
						<div class="head_box">
							<div class="head-row">
								<div class="left">
									<i class="iconfont icon-baihe"></i>
								</div>
								<div class="right">
									<div class="title">
										后台管理系统
									</div>
									<div class="sub_title">
										Universal
									</div>
								</div>
							</div>
						</div>
					</div>
					<el-menu @open='menuOpen' @select='menuChange' unique-opened :default-active='rot.yimaName'
						text-color="rgba(255,255,255,0.8)" active-text-color="rgba(255,255,255,1.0)"
						class="el-menu-vertical-demo" @close="handleClose">
						<el-menu-item index="首页">
							<i class="el-icon-menu"></i>
							<span slot="title">首页</span>
						</el-menu-item>
						<el-submenu index="系统管理" v-if="userMation.role!==0">
							<template slot="title">
								<i class="el-icon-setting"></i>
								<span>系统管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="用户列表" v-if="userMation.role==1" >
									<template slot="title">
										<i class="el-icon-user"></i>
										<span>用户列表</span>
									</template>
								</el-menu-item>
								<el-menu-item index="审核列表" v-if="userMation.role==1 || userMation.role==2" >
									<template slot="title">
										<i class="el-icon-user"></i>
										<span>审核列表</span>
									</template>
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="功能管理">
							<template slot="title">
								<i class="el-icon-files"></i>
								<span>功能管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="词源识别">
									<template slot="title">
										<i class="el-icon-video-camera"></i>
										<span>词源识别</span>
									</template>
								</el-menu-item>
								<el-menu-item index="词源提取">
									<template slot="title">
										<i class="el-icon-files"></i>
										<span>词源提取</span>
									</template>
								</el-menu-item>
								<el-menu-item index="文本分类">
									<template slot="title">
										<i class="el-icon-picture-outline"></i>
										<span>文本分类</span>
									</template>
								</el-menu-item>
								<el-menu-item index="段落切分">
									<template slot="title">
										<i class="el-icon-picture-outline"></i>
										<span>段落切分</span>
									</template>
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-container>
					<el-header style="position: relative;">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item :to="{ path: '/IndexView' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item v-for="item in headerData" :key="item">{{item}}
							</el-breadcrumb-item>
						</el-breadcrumb>
						<div class="header-avater">
							<div class="upload upload-active">
								<img @click="uploadShow=!uploadShow" class="" src="@/assets/imgs/upload.png" alt="">
							</div>
							<Avater :user='user' class="avater_bg"></Avater>
						</div>
					</el-header>
					<el-main>
						<div class="tab_box">
							<el-tag class="tab-item" @click='handleTagChange(tag)' @close="handleTagClose(tag)"
								v-for="tag in tabData" :closable="tag.closeAble" :key="tag.name" :type="tag.type">
								{{tag.name}}
							</el-tag>
						</div>
						<Upload @show='uploadShow=true' @unshow='uploadShow=false' v-show="uploadShow"></Upload>
						<router-view></router-view>
					</el-main>
				</el-container>
			</el-container>
		</div>
	</transition>

</template>

<script>
	import Avater from '../components/Avater.vue'
	import Upload from '../components/common/Upload.vue'
	export default {
		data() {
			return {
				uploadShow: false,
				transitionShow: true,
				rot: {
					yimaName: '首页', //当前路由name
					data: [{
							name: '首页',
							path: '/homes',
							type: 'Brand Color', //控制tab激活状态颜色
							beforeMenuName: '',
							status: true, //控制header面包屑激活状态，也可用于判断其它的激活状态
							closeAble: false, //标签是否可关闭
							exist: true, //已经存在于tab栏中
						},

						// 功能管理
						{
							name: '词源识别',
							path: '/plantList',
							type: 'success',
							beforeMenuName: '功能管理',
							status: false,
							closeAble: true,
							exist: false,
						},
						{
							name: '词源提取',
							path: '/txtList',
							type: 'success',
							beforeMenuName: '功能管理',
							status: false,
							closeAble: true,
							exist: false,
						},
						{
							name: '文本分类',
							path: '/imgList',
							type: 'success',
							beforeMenuName: '功能管理',
							status: false,
							closeAble: true,
							exist: false,
						},
						{
							name: '段落切分',
							path: '/parag',
							type: 'success',
							beforeMenuName: '功能管理',
							status: false,
							closeAble: true,
							exist: false,
						},
						// 用户管理
						{
							name: '用户列表',
							path: '/users',
							type: 'success',
							beforeMenuName: '系统管理',
							status: false,
							closeAble: true,
							exist: false,
						},
						{
							name: '审核列表',
							path: '/review',
							type: 'success',
							beforeMenuName: '系统管理',
							status: false,
							closeAble: true,
							exist: false,
						},
					],
				},
				HomeView: '用户管理',
				userMation: {}
			}
		},
		components: {
			Avater,
			Upload
		},
		watch: {
			'rot.yimaName': {
				immediate: false,
				handler(newValue, oldValue) {
					// 面包屑的更新
					for (var i = 0; i < this.rot.data.length; i++) {
						if (this.rot.data[i].name == newValue) {
							this.rot.data[i].status = true
							this.rot.data[i].type = 'Brand Color'
							this.rot.data[i].exist = true
							this.$router.push(this.rot.data[i].path)
						} else {
							this.rot.data[i].status = false
							this.rot.data[i].type = 'success'
						}
					}
				}
			}

		},
		computed: {
			user() {
				return JSON.parse(localStorage.getItem("userMation"))
			},
			headerData: {
				get() {
					if (this.rot.yimaName == '首页') {
						return []
					}
					var arr = this.rot.data
					var nArr = []
					for (var i = 0; i < arr.length; i++) {

						if (arr[i].status && i != 0) {
							nArr.push(arr[i].beforeMenuName)
							nArr.push(arr[i].name)
						}
					}
					return nArr
				}
			},
			tabData: {
				get() {
					var arr = this.rot.data
					var nArr = []
					for (var i = 0; i < arr.length; i++) {
						if (arr[i].exist) {
							nArr.push({
								name: arr[i].name,
								status: arr[i].status,
								type: arr[i].type,
								closeAble: arr[i].closeAble
							})
						}
					}
					return nArr
				}
			}

		},
		created() {
			this.userMation = JSON.parse(localStorage.getItem("userMation"))
		},
		mounted() {

		},
		methods: {

			// 页面初始化函数
			pageInit() {
				// 初始化header栏
			},
			// 初始化header栏路由
			headerInit() {

			},
			// 菜单栏选中
			menuChange(val) {
				// 更新当前name
				this.rot.yimaName = val
			},
			// 展开菜单栏
			menuOpen(val) {},
			handleOpen() {

			},
			handleClose() {},
			// 关闭tag
			handleTagClose(tag) {
				var dltOne = null
				var existIndex = 0
				for (var i = 0; i < this.rot.data.length; i++) {
					if (tag.name == this.rot.data[i].name) {
						this.rot.data[i].exist = false
						this.rot.data[i].status = false
						// 设置前一个status 为激活状态
						this.rot.data[existIndex].status = true
						this.rot.data[existIndex].type = 'Brand Color'
						break;
					}
					if (this.rot.data[i].exist) {
						existIndex = i
					}
				}

			},
			// 点击tag
			handleTagChange(tag) {
				this.rot.yimaName = tag.name
			}
		},
	}
</script>
<style lang="less" scoped>
	@import url("//at.alicdn.com/t/c/font_3645793_fbvdf6a6t7h.css");

	* {
		box-sizing: border-box;
	}

	#indexView_container {
		width: 100%;
		height: 100%;
		min-width: 1800px;
		min-height: 900px;

		.el-container {
			width: 100%;
			height: 100%;

			.el-aside {
				width: 300px;
				height: 100%;
				overflow: hidden;
				background-image: linear-gradient(to bottom, #00785a, #00785a);

				.side_head {
					height: 130px;
					background-size: 100% 100%;

					.head_box {
						position: relative;
						width: 100%;
						height: 100%;
						// background-color: rgba(255, 255, 255, 0.2);
						color: #fff;
						padding: 10px;

						// backdrop-filter: blur(3px);
						.head-row {
							display: flex;
							align-items: center;
							padding-left: 10px;
							margin-top: 10px;

							.left {
								margin-right: 5px;

								.icon-baihe {
									font-size: 43px;
								}
							}

							.right {
								.title {
									font-size: 20px;
									font-family: FuturaBT-Medium-, FuturaBT-Medium;
									font-weight: normal;
									color: #FFFFFF;
									letter-spacing: 2px;
								}

								.sub_title {
									font-size: 14px;
									font-family: FuturaBT-Medium-, FuturaBT-Medium;
									font-weight: normal;
									color: #FFFFFF;
									opacity: 0.7;
								}
							}
						}
					}

				}
			}

			.el-container {
				.el-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 250px;
					width: 100%;
					background-color: #fff;
					box-shadow:
						0.9px 2.8px 2.2px rgba(0, 0, 0, 0.02),
						2.2px 6.7px 5.3px rgba(0, 0, 0, 0.028),
						4.1px 12.5px 10px rgba(0, 0, 0, 0.035),
						7.4px 22.3px 17.9px rgba(0, 0, 0, 0.042),
						13.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
						33px 100px 80px rgba(0, 0, 0, 0.07);
				}

				.el-main {
					position: relative;
					width: 100%;
					height: 100%;
					padding: 0px;
					padding-top: 53px;

					.tab_box {
						position: absolute;
						z-index: 2;
						top: 3px;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						width: 100%;
						height: 50px;
						background-color: #fff;
						padding: 0px 20px;
						box-shadow:
							2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
							6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
							12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
							22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
							41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
							100px 100px 80px rgba(0, 0, 0, 0.07);

						.el-tag {
							margin-right: 10px;

							&:hover {
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}

	.avater_bg {
		transition: all .6s;
	}

	.avater_bg:hover {
		background-color: rgba(180, 180, 180, 0.2);

		cursor: pointer;
	}

	.header-avater {
		display: flex;
		align-items: center;

		.upload {
			img {
				width: 30px;
				transform: translate(-10px, 3px);
			}
		}

		.upload-active {
			position: relative;
			// background-color: aqua;

			&::before {
				position: absolute;
				z-index: 999;
				right: 16px;
				top: 4px;
				content: "";
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: red;
			}
		}
	}
</style>
<style lang="less">
	.mysider {
		.el-menu {
			background-color: transparent;
			background: rbga(0, 0, 0, 0);

			.is-active,
			.el-menu-item,
			.el-submenu__title {
				transition: all .5s;
			}

			.el-menu-item.is-active {
				background-color: transparent;
				background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
			}

			.el-menu-item:hover {
				background-color: transparent;
				background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
			}

			.el-submenu__title:hover {
				background-color: transparent;
				background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
			}

			.el-menu-item i {
				color: inherit;
			}

			.el-submenu__title i {
				color: inherit;
			}
		}
	}
</style>