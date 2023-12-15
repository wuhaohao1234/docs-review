<template>
	<div id="container">
	</div>
</template>

<script>
	import Test from '../../components/Test.vue'
	export default {
		data() {
			const generateData = _ => {
				const data = [];
				for (let i = 1; i <= 15; i++) {
					data.push({
						key: i,
						label: `备选项 ${ i }`,
						disabled: i % 4 === 0
					});
				}
				return data;
			};
			return {
				con:1,
				cd:0,
				data: generateData(),
				value: [1, 4],
				dialogShow:true,
				titles:['计划组名称','已选中计划组'],
				sltData: [{
				    key: '1',
				    label: '1',
				    disabled: true
				  },
				  {
				    key: '1',
				    label: '1',
				    disabled: true
				  },
				  {
				    key: '1',
				    label: '1',
				    disabled: true
				  },
				  {
				    key: '1',
				    label: '1',
				    disabled: true
				  },
				  {
				    key: '1',
				    label: '1',
				    disabled: true
				  },
				  {
				    key: '1',
				    label: '1',
				    disabled: true
				  }
				
				
				]
			}
		},
		mounted() {},
		components:{Test},
		methods: {
			handleChange(){
				
			},
			// 删除选项
			dltItems(){
				
			},
			closeDialog(){
				this.dialogShow = false
			}
			
		},
	}
</script>
<style lang="less" scoped >
	#container {
		width: 100%;
		height: 100%;
		.contain{
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.footer{
			display: flex;
			flex-direction: row-reverse;
			background-color: #f9f8fd;
			padding: 10px 15px;
			margin-top: 20px;
		}
	}
	.el-transfer-panel {
		width: 290px;
	}
</style>
