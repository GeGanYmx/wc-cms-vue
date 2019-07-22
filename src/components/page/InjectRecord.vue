<!--新添页面：注入记录-->
<template>
  <div class="ijContainer">
    <header>
      <label>所属公司：</label>
      <el-select v-model="ele.selComp" placeholder="请选择所属公司">
        <el-option
          v-for="item in ele.companys"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <label style="margin-left: 20px;">视频ID：</label>
      <el-input placeholder="请输入视频ID" v-model="ele.videoId" clearable style="width:30%"></el-input>
      <el-button type="info" style="margin-left:20px;">搜索</el-button>
      <el-button>重置</el-button>
    </header>
    <article>
      <div class="atheader">
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
      <el-table
        :data="injArr"
        border
        style="width: 100%;font-size:0.8rem"
        stripe
        v-loading="ele.loading"
      >
        <blockquote v-for="item in injTree" :key="item">
          <el-table-column :prop="item.prop" :label="item.label" width="130"></el-table-column>
        </blockquote>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleClick(scope.row)"></el-button>
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
      ele: {
        companys: [
          {
            value: "选项1",
            label: "全部"
          },
          {
            value: "选项1",
            label: "上海a网络科技"
          },
          {
            value: "选项2",
            label: "上海b网络科技"
          },
          {
            value: "选项3",
            label: "科大讯飞"
          }
        ],
        selComp: "",
        videoId: "",
        loading: true
      },
      injArr: null,
      injTree: null
    };
  },
  created() {
    axios
      .get("injManage", {
        params: {
          cursor: 1
        }
      })
      .then(res => {
        console.log(res);
        this.injArr = res.ijArr;
        this.injTree = res.ijTree;
        setTimeout(() => {
          this.ele.loading = false;
        }, 500);
      })
      .catch(err => {});
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.ijContainer {
  padding-left: 30px;
  padding-top: 30px;
  width: 100%;
  min-height: 780px;
  & > article {
    .atheader {
      margin-bottom: 10px;
      position: relative;
      margin-top: 20px;
      height: 32px;
      & > div {
        position: absolute;
        right: 50px;
        display: inline-block;
      }
    }
  }
}
footer {
  margin-top: 20px;
}
label {
  color: #999;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
</style>
