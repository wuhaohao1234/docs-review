// 获取所有公交线路
// function getRouteStations() {
// 	$.ajax({
// 		asycn: true,
// 		contentType: "application/json",
// 		data: {},
// 		dataType: "json",
// 		error: function() {
// 			// 出现错误
// 			alert("请求错误");
// 		},
// 		success: function(data) {
// 			return data
// 		},
// 		url: "http://localhost:3000",
// 		type: "get"
// 	})
// }
/**
 * 隐藏静态数据.js的控件
 * 清除地图上覆盖物
 */
// function hideControl() {
// 	map.clearOverlays()
// }
/**
 * 构造函数我们的创建的地图 
 */
function mapMation() {
	this.option = {
		enableRotate: false,
		enableTilt: false
	}
	this.map = null
	// 对象初始化
	this.init = function(container) {
		this.mapInit(container) //初始化地图，及其基本属性配置
		// this.dataInit()
	}
	// 地图初始化，基本属性设置函数
	this.mapInit = function(container) {
		// 类型判断
		if (typeof container != 'string') {
			alert('container类别错误')
			return false;
		} else {
			this.map = new BMapGL.Map(container)
		}
		this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		// 初始化地图，设置中心点坐标和地图级别
		var centerPoint = new BMapGL.Point(107.41657096038, 29.700383154251);
		this.map.centerAndZoom(centerPoint, 20);
		this.map.setHeading(64.5); //设置地图旋转角度
		this.map.setTilt(73); //设置地图的倾斜角度
		// 设置地图主题样式
		this.map.setMapStyleV2({
			styleId: 'ad3b127e4bfbdd611bcef12236c17b96'
		});
	}
	//数据获取初始化api
	this.dataInit = function() {
		$.ajax({
			asycn: true,
			contentType: "application/json",
			data: {},
			dataType: "json",
			error: function() {
				// 出现错误
				alert("请求错误");
			},
			success: data=> {
				this.route_station = data
			},
			url: "http://localhost:3000",
			type: "get"
		})
	}
	// 路线初始化api
	this.route_station_init = function(){
		
	}
}
// getRouteStations()
// hideControl()

const ODmap = new mapMation()
export{ODmap}
// map.init('container')
