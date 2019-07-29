<template>
  <div class="cpContainer">
    <header>
      <label>公司名称：</label>
      <el-input placeholder="请输入公司名称" v-model="company" clearable style="width:30%"></el-input>
      <el-button type="info" style="margin-left:20px;">搜索</el-button>
      <el-button>新建账号</el-button>
      <el-button>刷新媒资公司名称</el-button>
    </header>
    <article>
      <div class="arHeader">
        <!--表头按钮组-->
        <v-tbCommonBtn :filter.sync="isFilterShow" :ep-file.sync="isEpFlieShow"></v-tbCommonBtn>
      </div>
      <el-table :data="cpArr" border style="font-size:0.8rem" stripe v-loading="loading" id="cpTable">
        <blockquote v-for="(item , index) in cpTreeTmp" :key="index">
          <el-table-column :prop="item.prop" :label="item.label" width="230"></el-table-column>
        </blockquote>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)"></el-button>
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
        :total="pagination.mzCount"
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
        :th-label="cpfilter"
        :tb-data="cpTree"
        :check-mz.sync="checkMz"
        :position="position.filterBox"
        @updateTree="updateCpTree"
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
  name:'cpManage',
  data() {
    return {
      company: "",
      cpArr: null,
      cpTree: null,
      loading: true,
      isFilterShow:false,
      isEpFlieShow:false,
      checkMz:[],
        //分页控件
      pagination: {
        mzCount: 0,
        defaultLimit: 50
      },
        //导出的表格信息
      outTable: {
        id: "cpTable",
        name: "cp管理"
      },
      cpTreeTmp: null,
      cpfilter: null,
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
  components: {
    vTbCommonBtn,
    vColumnFilter,
    vExportb
  },
  created() {
    this.getData(1,this.pagination.defaultLimit);
  },
  methods: {
    getData(cursor,limit) {
      axios
        .get("http://rap2api.taobao.org/app/mock/225049/cpManage", {
          params: {
           cursor
          }
        })
        .then(res => {
          this.cpArr = res.cpArr;
          this.pagination.mzCount = this.cpArr.length;
          this.cpTree = res.cpTree;
          this.cpTreeTmp=this.cpTree.slice();
          this.cpfilter=this.cpTree.map(item=>item.label);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        const compName = this.$options.name;
        !this.$store.getters.cacheComp.find(item=>item == compName) && this.$store.dispatch('addCacheComp',compName);
        })
        .catch(err => {});
    },
    del(row){
      console.log('删除行----',row);
      //当更改数据时，则该组件从cacheComp中移除
      this.$store.dispatch('delCacheComp',this.$options.name);
      console.log('当前的caCache',this.$store.getters.cacheComp);
    },
    //分页逻辑
    handleCurrentChange(cursor) {
      console.log("当前页面-----", cursor);
    },
    handleSizeChange(limit) {
      //limit  控制每页多少
      console.log("每个页面的条数----", limit);
    },
    updateCpTree(data){
     this.cpTreeTmp = data;
    }
  }
};
</script>
<style lang="less" scoped>
.cpContainer {
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
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
</style>

