<template>
	<div id="app">
		<transition name="fade">
			<router-view />
		</transition>
	</div>
</template>
<script>
	export default {
		// data() {
		// 	return {
		// 		res: {
		// 			content: '问题名',
		// 			question_type: "",
		// 			score: 123,
		// 			subject_id: "官方分类ID",
		// 			options: [
		// 				{
		// 					content:'option1',
		// 					status:true
		// 				},
		// 				{
		// 					content:'option1',
		// 					status:true
		// 				},
		// 				{
		// 					content:'option1',
		// 					status:true
		// 				},
		// 				{
		// 					content:'option1',
		// 					status:true
		// 				}
		// 			]
		// 		}
		// 	}
		// }
	}
</script>
<style lang="less">
	#app {
		width: 100%;
		height: 100%;
	}


	* {
		box-sizing: border-box;
	}

	html,
	body {
		width: 100%;
		height: 100%;
		padding: 0px;
		margin: 0px;
	}
</style>
