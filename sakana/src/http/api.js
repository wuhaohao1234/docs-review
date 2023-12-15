//引入request.js文件
import request from "./request";
import request_node from "./request_node"
import request_file from "./request_file"

// 获取vipcode网址
export function getVipUrl(data) {
	return request({
		url: "/notice/getVipUrl",
		method: "get",
		params: data
	});
}
// 更新获取vipcode网址
export function setVipUrl(data) {
	return request({
		url: "/notice/setVipUrl",
		method: "post",
		data: data
	});
}
// 删除留言
export function messageDlt(data) {
	return request({
		url: "/users/messageDlt",
		method: "post",
		data: data
	});
}
// 前台留言列表
export function infoMessageList(data) {
	return request({
		url: "/users/messageList",
		method: "get",
		params: data
	});
}
// 公告信息获取
export function noticeGet(data) {
	return request({
		url: "/notice/get",
		method: "get",
		// data:data
	});
}
// 公告信息修改
export function noticeReivse(data) {
	return request({
		url: "/notice/revise",
		method: "post",
		data: data
	});
}
// 文件夹信息修改
export function reviseFileDir(data) {
	return request({
		url: "/types/reviseDir",
		method: "post",
		data: data
	});
}
// 文件信息修改
export function reviseFile(data) {
	return request({
		url: "/files/revise",
		method: "post",
		data: data
	});
}
// 添加vipcode
export function addVipCode(data) {
	return request({
		url: "/vip/add",
		method: "post",
		data: data
	});
}

// 获取vipcode
export function getVipCode(data) {
	return request({
		url: "/vip/list",
		method: "get",
		params: data
	});
}
//生成vipcode
export function createVipCode(data) {
	return request({
		url: "/vip/createCode",
		method: "get",
	});
}
// 登录
export function managerLand(data) {
	return request_node({
		url: "/users/land",
		method: "post",
		data: data
	});
}
// 注册
export function managerRegist(data) {
	return request_node({
		url: "/users/regist",
		method: "post",
		data: data
	});
}
// 教师注册
export function teacherRegist(data) {
	return request({
		url: "/teacher/add",
		method: "post",
		data
	});
}
// 教师列表获取
export function teacherList(data) {
	return request({
		url: "users/malist",
		method: "get",
		params: data
	});
}
// 教师添加
export function teacherAdd(data) {
	return request({
		url: "/api/teacher/add",
		method: "post",
		data
	});
}
// 教师修改
export function teacherRevise(data) {
	return request({
		url: "/api/teacher/applyTeacher",
		method: "put",
		data
	});
}
// 教师删除
export function teacherDelete(data) {
	return request({
		url: `/api/teacher/${data}`,
		method: "delete",
	});
}
// 用户列表
export function stuList(data) {
	return request_node({
		url: `/users/list`,
		method: "get",
		params: data
	});
}

// 用户删除
export function stuDelete(data) {
	return request_node({
		url: `/users/dlt`,
		method: "post",
		params: data
	});
}
// 用户修改
export function stuRevise(data) {
	return request_node({
		url: `/users/revise`,
		method: "post",
		data
	});
}
// 用户增加
export function stuAdd(data) {
	return request_node({
		url: `/users/add`,
		method: "post",
		params: data
	});
}
// 班级列表
export function classList(data) {
	return request({
		url: `/api/student/add`,
		method: "post",
		data
	});
}

// 管理员列表
export function managerList(data) {
	return request({
		url: `users/malist`,
		method: "get",
		params: data
	});
}

// 管理员删除
export function managerDelete(data) {
	return request({
		url: `/users/madlt`,
		method: "post",
		params: data
	});
}
// 管理员修改
export function managerRevise(data) {
	return request({
		url: `/api/user/edit`,
		method: "PUT",
		data
	});
}
// 管理员增加
export function managerAdd(data) {
	console.log(data)
	return request({
		url: `/users/maadd`,
		method: "post",
		params: data
	});
}







/**
 * 以下接口弃用
 * 
 */

// 判断题增加
export function judgeQuestionAdd(data) {
	return request({
		url: `/api/question/addjudge`,
		method: "post",
		data
	});
}
// 最高级分类
export function totalTypeList() {
	return request({
		url: `/types/totalList`,
		method: "get",
	});
}
// 分类列表:1级
export function ichiGradePlantList(data) {
	return request({
		url: `/types/list`,
		method: "get",
		params: data
	});
}
// 一级分类删除
export function ichiGradeDelete(data) {
	return request({
		url: `/types/dlt`,
		method: "post",
		params: data
	});
}
// 一级分类编辑
export function ichiGradeRevise(data) {
	return request({
		url: `/api/plantmaintype/edittypemain`,
		method: "put",
		data
	});
}
// 一级图片分类添加
export function ichiGradeAdd(data) {
	return request({
		url: `/types/imgAdd`,
		method: "POST",
		params: data
	});
}
// 植物分类列表:2级
export function niGradePlantList(data) {
	return request({
		url: `/types/list`,
		method: "get",
		params: data
	});
}

// 二级分类删除
export function niGradeDelete(plantTypeMainId) {
	return request({
		url: `/api/planttypedevice/delete/${plantTypeMainId}`,
		method: "DELETE",
	});
}
// 二级分类编辑
export function niGradeRevise(data) {
	return request({
		url: `/api/planttypedevice/edittypedevice`,
		method: "put",
		data
	});
}
// 二级分类添加
export function niGradeAdd(data) {
	return request({
		url: `/api/planttypedevice/add`,
		method: "POST",
		data
	});
}


// 生成卷子
export function createPaper(data) {
	return request({
		url: `/api/exampaper/add`,
		method: "post",
		data
	});
}

// 卷子列表
export function paperList(data) {
	return request({
		url: `/api/exampaper/list`,
		method: "get",
		params: data
	});
}
// 删除
export function paperDelete(data) {
	return request({
		url: `/vip/dlt`,
		method: "post",
		params: data
	});
}
// 编辑卷子
export function paperEdit(data) {
	return request({
		url: `/api/exampaper/editpaper`,
		method: "post",
		data
	});
}
// 卷子详情
export function paperDetail(paperId) {
	return request({
		url: `/api/exampaper/select/${paperId}`,
		method: "get",
	});
}
// 题目列表获取
export function questionList(data) {
	return request({
		url: `/api/question/list`,
		method: "GET",
		params: data
	});
}
// 题目删除
export function questionDelete(questionId) {
	return request({
		url: `/api/question/delete/${questionId}`,
		method: "DELETE",
	});
}
// 题目详情
export function questionDetail(questionId) {
	return request({
		url: `/api/question/select/${questionId}`,
		method: "get",
	});
}
// 判断题编辑
export function judgeQuestionEdit(data) {
	return request({
		url: `/api/question/edit`,
		method: "post",
		data
	});
}
// 答卷列表
export function answerPaperList(data) {
	return request({
		url: `/api/studentscore/list`,
		method: "get",
		params: data
	});
}

// 一级主题列表
export function mainTopicList(data) {
	return request({
		url: `/api/subject/list`,
		method: "get",
		params: data
	});
}




// 一级主题增加
export function mainTopicAdd(data) {
	return request({
		url: `/api/subject/add`,
		method: "POST",
		data
	});
}

// 一级主题删除
export function mainTopicDelete(subjectId) {
	return request({
		url: `/api/subject/delete/${subjectId}`,
		method: "DELETE",
	});
}

// 二级主题列表
export function deviceTopicList(data) {
	return request({
		url: `/api/PlantType/list`,
		method: "get",
		params: data
	});
}



// 二级主题增加
export function deviceTopicAdd(data) {
	return request({
		url: `/api/PlantType/add`,
		method: "POST",
		data
	});
}

// 二级主题删除
export function deviceTopicDelete(typeId) {
	return request({
		url: `/api/PlantType/${typeId}`,
		method: "DELETE",
	});
}
// 二级主题查询
export function deviceTopicSearch(data) {
	return request({
		url: `/api/getByname`,
		method: "GET",
		data
	});
}


// 二级主题图片列表
export function deviceTopicImgList(data) {
	return request({
		url: `/api/typedetail/list`,
		method: "GET",
		params: data
	});
}
// 二级主题图片删除
export function deviceTopicImgDelete(detailId) {
	return request({
		url: `/api/typedetail/delete/${detailId}`,
		method: "DELETE",
	});
}
// 二级主题：根据主题名字查图片
export function deviceTopicImgSearchByTopic(data) {
	return request({
		url: `/api/typedetail/getbytypename`,
		method: "GET",
		data
	});
}

/**
 * @param {Object} data
 * 我也不知道用没用到下面两个api
 * 
 */

// 列表获取：根据文件被执行类型、用户id、是否all来获取列表
export function plantList(data) {
	return request_node({
		url: "/filesm/list",
		method: "get",
		params: data
	});
}
// 植物删除
export function plantDelete(data) {
	return request_node({
		url: `/filesm/dlt`,
		method: "post",
		data: data
	});
}



// 用户
export function userRegist(data) {
	return request_node({
		url: "/api/student/register",
		method: "post",
		data
	});
}

// 文件下载
export function fileDownload(data) {
	return request_file({
		url: "/filesm/download",
		method: "get",
		data: data
	});
}



















/**
 * node相关接口
 */
// 添加选择题
export function selectQuestionAdd(data) {
	return request_node({
		url: "/question/addselect",
		method: "post",
		data
	});
}
// 单选题编辑提交
export function selectQuestionEdit(data) {
	return request_node({
		url: `/question/edit`,
		method: "post",
		data
	});
}
// 二级主题图片添加
export function deviceTopicImgAdd(data) {
	return request_node({
		url: `/topic/add`,
		method: "POST",
		data
	});
}
// 植物修改
export function plantRevise(data) {
	return request_node({
		url: `/plant/update`,
		method: "post",
		data
	});
}