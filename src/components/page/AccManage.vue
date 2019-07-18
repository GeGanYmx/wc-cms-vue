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
        <div>
          <el-tooltip content="筛选列" placement="top">
            <el-button type="primary" icon="el-icon-s-fold"></el-button>
          </el-tooltip>
          <el-tooltip content="打印" placement="top">
            <el-button type="primary" icon="el-icon-document"></el-button>
          </el-tooltip>
          <el-tooltip content="导出" placement="top">
            <el-button type="primary" icon="el-icon-download"></el-button>
          </el-tooltip>
        </div>
      </div>
      <el-table :data="acArr" border style="width: 100%;font-size:0.8rem" stripe>
        <blockquote v-for="item in acTree" :key="item">
          <el-table-column :prop="item.prop" :label="item.label" width="120"></el-table-column>
        </blockquote>
        <el-table-column fixed="right" label="操作" width="240">
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="display:inline-block;margin-right:20px;"
      ></el-pagination>
    </footer>
  </div>
</template>
<script>
import axios from "../../utils/request";
export default {
  data() {
    return {
      compName: "",
      account: "",
      acArr: null,
      acTree: null
    };
  },
  created() {
    //初始化数据
    axios
      .get("acManage", {
        params: {
          cursor: 1
        }
      })
      .then(res => {
        this.acArr = res.acArr;
        this.acTree = res.acTree;
      })
      .catch(err => {});
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.acContainer {
  padding-left: 30px;
  padding-top: 30px;
  width: 100%;
  min-height: 780px;
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
</style>
