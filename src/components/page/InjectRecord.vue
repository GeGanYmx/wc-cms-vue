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
        <!--表头按钮组-->
        <v-tbCommonBtn :filter.sync="isFilterShow" :ep-file.sync="isEpFlieShow"></v-tbCommonBtn>
      </div>
      <el-table
        :data="injArr"
        border
        style="width: 100%;font-size:0.8rem"
        stripe
        v-loading="ele.loading"
        id="injTable"
      >
        <blockquote v-for="(item ,index) in injTreeTmp" :key="index">
          <el-table-column :prop="item.prop" :label="item.label" width="130"></el-table-column>
        </blockquote>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.row)"></el-button>
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
        :total="pagination.injCount"
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
        :th-label="injfilter"
        :tb-data="injTree"
        :check-mz.sync="checkMz"
        :position="position.filterBox"
        @updateTree="updateinjTree"
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
  name:'injectRecord',
  data() {
    return {
      ele: {
        companys: [
          {
            value: "1",
            label: "全部"
          },
          {
            value: "2",
            label: "上海a网络科技"
          },
          {
            value: "3",
            label: "上海b网络科技"
          },
          {
            value: "4",
            label: "科大讯飞"
          }
        ],
        selComp: "",
        videoId: "",
        loading: true
      },
      injArr: null,
      injTree: null,
      //后台接收的控制表头的数据
      injTreeTmp: null,
      injfilter: null,
      //分页控件
      pagination: {
        injCount: 0,
        defaultLimit: 50
      },
      //筛选列
      checkAll: false,
      checkMz: [],
      //控制筛选列弹出框的显示
      isFilterShow: false,
      isEpFlieShow: false,

      //导出的表格信息
      outTable: {
        id: "injTable",
        name: "注入记录"
      },
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
    getData(cursor,limit){
      axios
      .get("http://rap2api.taobao.org/app/mock/225049/injManage", {
        params: {
          cursor 
        }
      })
      .then(res => {
        console.log(res);
        this.injArr = res.ijArr;
        this.pagination.injCount=this.injArr.length;
        this.injTree = res.ijTree;
        this.injfilter = res.ijTree.map(item => item.label);
        this.injTreeTmp = this.injTree.slice();
        setTimeout(() => {
          this.ele.loading = false;
        }, 500);
        //将获取到data的组件，配合tagsList进行缓存
        console.log('当前组件----',this.$options.name);
        const compName = this.$options.name;
        //防止cacheComp再次插入相同数据
        !this.$store.getters.cacheComp.find(item=>item == compName) && this.$store.dispatch('addCacheComp',compName);
        console.log('vuex状态管理------',this.$store.getters.cacheComp);
      })
      .catch(err => {});
    },
    updateinjTree(data) {
      console.log("冒泡所传过来的值：", data);
      this.injTreeTmp = data;
    },
    //分页逻辑
    handleCurrentChange(cursor) {
      console.log("当前页面-----", cursor);
    },
    handleSizeChange(limit) {
      //limit  控制每页多少
      console.log("每个页面的条数----", limit);
    },
    del(row){
      console.log('删除行----',row);
      //发送请求，当服务端更改数据成功时，将该组件从cacheComp中移除
      //发送请求...
      this.$store.dispatch('delCacheComp',this.$options.name);
      // console.log('当前的caCache',this.$store.getters.cacheComp);
    }
  }
};
</script>
<style lang="less" scoped>
.ijContainer {
  padding-left: 30px;
  padding-top: 30px;
  width: 100%;
  min-height: 780px;
  position: relative;
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
