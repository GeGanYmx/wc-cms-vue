<template>
  <div class="acContainer">
    <header>
      <label>公司名称：</label>
      <el-input placeholder="请输入公司名称" v-model="compName" clearable style="width:30%"></el-input>
      <label style="margin-left: 20px;">账号：</label>
      <el-input placeholder="请输入新建账号" v-model="account" clearable style="width:30%"></el-input>
      <el-button type="info" style="margin-left:20px;">搜索</el-button>
      <el-button>新建账号</el-button>
    </header>
    <article>
      <div class="arHeader">
        <!--表头按钮组-->
        <v-tbCommonBtn :filter.sync="isFilterShow" :ep-file.sync="isEpFlieShow"></v-tbCommonBtn>
      </div>
      <el-table :data="acArr" border style="font-size:0.8rem" stripe v-loading="loading" id="acTable">
        <blockquote v-for="(item ,index) in acTreeTmp" :key="index">
          <el-table-column :prop="item.prop" :label="item.label" width="180"></el-table-column>
        </blockquote>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color:#e6a23c">重设密码</el-button>
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              style="color: #909399"
            >启用</el-button>
            <el-button type="text" size="small" style="color: #f56c6c">禁用</el-button>
            <el-button type="text" size="small" style="color: #f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </article>
    <footer>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :page-size="pagination.defaultLimit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.acCount"
        style="display:inline-block;margin-right:20px;"
      ></el-pagination>
    </footer>
    <!--引入animate动画-->
    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOutLeft"
      :duration="200"
    >
      <v-columnFilter
        :th-label="acfilter"
        :tb-data="acTree"
        :check-mz.sync="checkMz"
        :position="position.filterBox"
        @updateTree="updateAcTree"
        v-if="isFilterShow"
      ></v-columnFilter>
    </transition>
    <!--上传文件弹出框，待封装-->
    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOutRight"
      :duration="200"
    >
      <!--驼峰命名转换-->
      <v-exportb :tid="outTable.id" :tname="outTable.name" :position="position.fileBox" v-if="isEpFlieShow"></v-exportb>
    </transition>
  </div>
</template>
<script>
import axios from "../../utils/request";

import vTbCommonBtn from "../common/TbCommonBtn";
import vColumnFilter from "../common/ColumnFilter";
import vExportb from "../common/ExportTb";
export default {
  data() {
    return {
      compName: "",
      account: "",
      acArr: null,
      acTree: null,
      loading: true,
      //控制筛选列弹出框的显示
      isFilterShow: false,
      isEpFlieShow: false,
      //导出的表格信息
      outTable: {
        id: "acTable",
        name: "账号管理"
      },
        //分页控件
      pagination: {
        acCount: 0,
        defaultLimit: 50
      },
        //筛选列
      checkAll: false,
      checkMz: [],
      
      //后台接收到的表格数据
      //后台接收的控制表头的数据
      acTreeTmp: null,
      acfilter: null,
      //控制弹出框的位置
      position: {
        filterBox: {
          top: '108px',
          right: '192px'
        },
        fileBox:{
          top: '108px',
          right: "80px"
        }
      }
    };
  },
  components:{
    vTbCommonBtn,
    vColumnFilter,
    vExportb
  },
  created() {
   this.getData(1,50);
  },
  methods: {
    getData(cursor,limit){  
      //初始化数据
     axios.get("http://rap2api.taobao.org/app/mock/225049/acManage", {
        params: {
           cursor
        }
      })
      .then(res => {
        this.acArr = res.acArr;
        this.pagination.acCount=this.acArr.length;
        this.acTree = res.acTree;
        this.acfilter = res.acTree.map(item => item.label);
        this.acTreeTmp = this.acTree.slice();
        setTimeout(() => {
          this.loading=false;
        }, 500);
      })
      .catch(err => {});
    },
    handleClick(row) {
      console.log("传入row");
    },
    //分页逻辑
    handleCurrentChange(cursor) {
      console.log("当前页面-----", cursor);
    },
    handleSizeChange(limit) {
      //limit  控制每页多少
      console.log("每个页面的条数----", limit);
    },
     updateAcTree(data) {
      console.log("冒泡所传过来的值：", data);
      this.acTreeTmp = data;
    }
  }
};
</script>
<style lang="less" scoped>
.acContainer {
  padding-left: 30px;
  padding-top: 30px;
  width: 100%;
  min-height: 780px;
  position: relative;
}
.arHeader {
  margin-bottom: 10px;
  position: relative;
  margin-top: 20px;
  height: 32px;
  & div {
    position: absolute;
    right: 50px;
    display: inline-block;
  }
}
footer {
  margin-top: 20px;
}
label {
  color: #909399;
}
.el-table, .el-table__expanded-cell {
    background-color: transparent;
}
</style>
