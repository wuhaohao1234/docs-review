<template>
  <div id="container">
    <!-- <plant-operation @dltMore='dltMore()' :operationShow='operationShow' /> -->

    <el-table
      stripe
      :data="queryParams.userList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      header-row-class-name="info-row"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width=""> </el-table-column>
      <el-table-column prop="id" label="ID" width="55"> </el-table-column>
      <el-table-column prop="nativename" label="文件名" width="">
        <template slot-scope="scope">
          <div class="overbox" :title="scope.row.nativename">
            {{ scope.row.nativename }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户" width=""> </el-table-column>
      <el-table-column prop="time" label="时间" width="200">
        <template slot-scope="scope">
          <div class="overbox" :title="scope.row.time">
            {{ scope.row.time }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="600">
        <template slot-scope="scope">
          <!-- <el-button @click="reviseDialogShow(scope.row)" size="mini" type="success" plain
						icon="el-icon-search">修改
					</el-button> -->
          <el-button
            @click="updateRaw(scope.row, 1)"
            v-if="userMation.role==1"
            size="mini"
            type="info"
            plain
          >
            {{ scope.row.visable === 1 ? "隐藏" : "显示" }}
            </el-button
          >
          <el-button
            @click="viewRaw(scope.row, 1)"
            size="mini"
            type="success"
            plain
          >
            文件处理</el-button
          >
          <el-button
            @click="downloadRaw(scope.row, 1)"
            size="mini"
            type="success"
            plain
            icon="el-icon-delete"
          >
            下载原文件</el-button
          >
          <el-button
            @click="downloadRaw(scope.row, 0)"
            size="mini"
            type="success"
            plain
            icon="el-icon-delete"
          >
            下载处理后文件</el-button
          >
          <el-button
            @click="dltOne(scope.row.id)"
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
          >
            删除记录</el-button
          >
          <!-- <el-button @click="detailDialogShow(scope.row)" size="mini" type="info" plain icon="el-icon-more">
						更多
					</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.pageNum"
      :page-sizes="[2, 4, 20, 30]"
      :page-size="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryParams.total"
    >
    </el-pagination>
    <plant-add-dialog :plantsData="backData.data" @reloadTable="loadPlants()" />
    <plant-revise-dialog
      :plantsData="backData.data"
      @reloadTable="loadPlants()"
    />
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- <pdf v-if="isPdf" ref="pdf" :src="pdfUrl"> </pdf> -->
      <vue-office-pdf 
        :src="pdfUrl"
        v-if="isPdf"
      />
      <vue-office-docx 
        :src="pdfUrl"
        v-if="!isPdf"
      />
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        disabled
        placeholder="上一条审核内容"
        v-model="text"
        style="margin-bottom: 20px"
      >
      </el-input>

      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入意见"
        v-model="textarea"
      >
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <div class="card">
			<div class="top">
				<div class="title">
					兑换码网址
				</div>
				<div class="content">
					<el-input v-model="vip_url.url"></el-input>
				</div>
			</div>
			<div class="footer">
				<el-button @click="submitVipURL" type="primary">
					提交
				</el-button>
			</div>	
		</div> -->
    <Wave></Wave>
  </div>
</template>

<script>
import {
  getVipUrl,
  setVipUrl,
  plantList,
  plantDelete,
  stuList,
} from "../../http/api.js";
import Wave from "../../components/animate/Wave.vue";
import PlantQuery from "../plant/plants/components/PlantQuery";
import PlantOperation from "../plant/plants/components/PlantOperation";
import PlantAddDialog from "../plant/plants/components/PlantAddDialog";
import PlantReviseDialog from "../plant/plants/components/PlantReviseDialog";
import PlantDetailDialog from "../plant/plants/components/PlantDetailDialog";
import pdf from "vue-pdf";
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
  data() {
    return {
      date: "",
      dialogVisible: false,
      fileId: 0,
      vip_url: {
        url: "",
        id: null,
      },
      // table选中数据
      ichiType_list: {},
      selectRowArr: [],
      pdfUrl: "",
      textarea: "",
      text: "",
      queryParams: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页显示多少条
        total: 0,
        userList: [], //真实渲染的数据
      },
      // 保存后端传过来的数据，不用于渲染，用于保存原始数据
      backData: {
        data: [],
        total: 0,
      },
      // // 后端数据的备份，用于存储符合筛选条件的数据
      plantsTable: [],
      // 控制各个弹窗的出现
      dialogShow: {
        add: false,
      },
      // 控制operation 组件的启用
      operationShow: {
        batchRevise: true,
        batchDelete: true,
      },
      userMation: {},
      isPdf: false,
    };
  },
  async created() {
    this.busInit();
    this.userMation = JSON.parse(localStorage.getItem("userMation"))
    // 加载一级文件夹列表
    // await this.loadIchiType_list()
    // 加载后端数据
    await this.loadPlants();
  },
  components: {
    Wave,
    PlantQuery, //查询
    PlantOperation, //批量操作
    PlantAddDialog, //添加弹窗
    PlantReviseDialog, //修改信息弹窗
    PlantDetailDialog, //详情信息弹窗
    pdf,
    VueOfficeDocx,
    VueOfficePdf
  },
  mounted() {
    // this.baseInit()
  },
  methods: {
    submitVipURL() {
      setVipUrl({
        url: this.vip_url.url,
        id: this.vip_url.id,
      }).then((res) => {
        console.log(res);
        if (res.data.status) {
          this.$message.success("设置成功");
        } else {
          this.$message.error("设置失败");
        }
        this.baseInit();
      });
    },
    handleSubmit() {
      console.log(this.textarea);
      const userMation = JSON.parse(localStorage.getItem("userMation"));
      console.log(userMation);
      if (this.textarea === "") {
        this.dialogVisible = false;
        return;
      } else {
        this.text = this.textarea;
        this.$axios({
          url: "http://localhost:7735/history/add",
          method: "post",
          data: {
            userId: userMation.id,
            fileId: this.fileId,
            text: this.text,
          },
        })
          .then((res) => {
            if (res.data) {
              this.$message.success("保存成功");
            } else {
              this.$message.error("保存失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(() => {
          this.dialogVisible = false;
        }, 500);
      }
    },
    baseInit() {
      getVipUrl().then((res) => {
        console.log(res);
        if (res.data.status) {
          this.vip_url = res.data.data;
        } else {
          // this.$message.error("获取数据失败")
        }
      });
    },
    timeFormat(time) {
      return time.replace("T", " ").replace(".000Z", "");
    },
    busInit() {
      this.$bus.$on("fileListReload", (data) => {
        this.loadPlants();
      });
    },
    getIchiType_name(id) {
      for (var i = 0; i < this.ichiType_list.length; i++) {
        if (this.ichiType_list[i].id == id) {
          return this.ichiType_list[i].name;
        }
      }
    },
    loadIchiType_list() {
      // ichiGradePlantList({
      // 	pageNum: 0,
      // 	pageSize: 0,
      // 	type_id: 1,
      // 	userId: userMation.id,
      // 	all: true
      // }).then(res => {
      // 	console.log(res)
      // 	this.ichiType_list = res.list
      // })
    },
    // 删除多个角色
    dltMore() {
      var id_arr = [];
      for (var i = 0; i < this.selectRowArr.length; i++) {
        id_arr.push(this.selectRowArr[i].plant_id);
      }
      this.$axios({
        url: "http://localhost:3000/plants/dltMore",
        method: "POST",
        params: {
          id_arr: id_arr,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.show = false;
            this.loadPlants();
          }
          this.$message({
            message: res.message,
            type: res.status ? "success" : "error",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // table被选中
    handleSelectionChange(val) {
      if (val.length) {
        this.operationShow.batchRevise = false;
        this.operationShow.batchDelete = false;
        this.selectRowArr = val;
        // this.$bus.$emit('batchReviseDialogShow',val)
      } else {
        this.operationShow.batchRevise = true;
        this.operationShow.batchDelete = true;
      }
    },
    // 控制修改角色弹窗展示
    reviseDialogShow(plant) {
      this.$bus.$emit("reviseDialogShow", plant);
    },
    // 详情弹窗显示
    detailDialogShow(plant) {
      this.$bus.$emit("detailDialogShow", plant);
    },
    // add plant重复判断
    plantRepeat(addForm) {},
    // 删除
    dltOne(id) {
      plantDelete({
        id,
      }).then((res) => {
        if (res.status) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
        this.loadPlants();
      });
    },
    // 条件重置，重新加载数据
    resetUserList() {
      this.loadPlants();
    },
    // 按条件搜索角色
    searchPlant(params) {
      console.log(params);
    },
    // 控制每行index
    indexMethod(index) {
      return index + 1;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 控制每行样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex == 1) {
        return "warning-row";
      } else if (rowIndex == 3) {
        return "success-row";
      }
      return "";
    },
    // 每页 展示数量
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.loadPlants();
    },
    // 当前页码
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.loadPlants();
    },
    // 分页参数初始化
    queryParamsInit(total) {
      this.queryParams.total = total;
    },
    // 加载后端数据
    loadPlants() {
      const userMation = JSON.parse(localStorage.getItem("userMation"));
      console.log(userMation);
      plantList({
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        type_id: 1,
        userId: userMation.id,
        all: userMation.role == 1 || userMation.role == 2,
      }).then((res) => {
        console.log(res);
        this.queryParams.userList = res.list;
        this.queryParamsInit(res.total);
      });
    },
    downloadRaw(tar, isRaw) {
      this.$axios({
        url: "http://localhost:7735/filesm/download", // Express 服务器地址
        method: "post",
        data: {
          id: tar.id,
          operationId: tar.operationId,
          tmpname: tar.tmpname,
          isRaw,
          type_id: tar.operationId,
        },
        responseType: "blob", // 指定响应类型为二进制流
      })
        .then((res) => {
          console.log(res);
          if (res.status == false) {
            this.$message.error(res.message);
          }
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${tar.nativename}${isRaw == 0 ? "treated" : ""}.${tar.fileType}`
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    },
    getAllUsers() {
      return stuList({
        pageNum: 1,
        pageSize: 20,
      }).then((res) => {
        console.log(res);
        if (res.status) {
          // this.queryParams.userList = res.list
          return res.list
          // this.queryParamsInit(res.total)
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    updateRaw(tar, isRaw) {
      console.log(tar);
      this.$axios({
        url: 'http://localhost:7735/filesm/updateVisable',
        method: 'post',
        data: tar
      }).then(res => {
        this.loadPlants();
      }).catch(err => {
        console.log(err);
      })
    },
    viewRaw(tar, isRaw) {
      this.$axios({
        url: "http://localhost:7735/filesm/download", // Express 服务器地址
        method: "post",
        data: {
          id: tar.id,
          operationId: tar.operationId,
          tmpname: tar.tmpname,
          isRaw,
          type_id: tar.operationId,
        },
        responseType: "blob", // 指定响应类型为二进制流
      })
        .then((res) => {
          if (res.data.type === 'application/pdf') {
            this.isPdf = true
          } if (res.data.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
            this.isPdf = false
          }
          const url = window.URL.createObjectURL(new Blob([res.data]));
          this.fileId = tar.id;
          this.$axios({
            url: `http://localhost:7735/history/getOne?fileId=${tar.id}`,
            method: "get",
          })
            .then((res) => {
              console.log(res.data);
              this.getAllUsers().then(resulr => {
                console.log('user');
                console.log(resulr);
                console.log(res.data[res.data.length - 1].userId);
                const find = resulr.find(item => {
                  return item.id == res.data[res.data.length - 1].userId
                    // this.user = item
                })
                console.log(find);
                this.text = '审核人：' + find?.username + ':' + res.data[res.data.length - 1].text;
              })
            })
            .catch((err) => {
              console.log(err);
            });
          this.text = "";
          this.textarea = "";
          this.pdfUrl = url;
          this.dialogVisible = true;
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    },
  },
};
</script>
<style lang="less" scoped>
#container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 20px;
  .overbox {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      content: attr(title);
    }
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 220px;
    padding: 15px;
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .content {
      margin-top: 10px;
    }

    .footer {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}

.yuri-card-list {
  display: flex;
  justify-content: space-between;
  padding: 30px;

  .yuri-card_data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 290px;
    height: 194px;
    box-shadow: 0 0 12px 2px rgba(92, 186, 159, 0.2);

    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background-color: blanchedalmond;
      margin-bottom: 15px;
    }

    .title {
      position: relative;
      font-size: 16px;
      font-family: "LouisGeorgeCafe";
      // color: rgb(255, 255, 255);
      text-align: center;
      margin-bottom: 15px;

      &::after {
        position: absolute;
        content: "";
        bottom: -13px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #3170a7;
      }
    }

    .num {
      font-size: 30px;
      font-family: "LouisGeorgeCafe";
      // color: rgb(255, 255, 255);
      // font-weight: bold;
      text-align: center;
    }
  }
}
</style>