<!--新添页面：媒资管理-->
<template>
  <div class="mzContainer">
    <header>
      <section>
        <label>省份：</label>
        <el-select v-model="selPro" multiple filterable placeholder="最多选31个">
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </section>
      <section>
        <ul>
          <li>
            <label>视频ID：</label>
            <el-input v-model="vID" placeholder="请输入视频ID" clearable></el-input>
          </li>
          <li>
            <label>视频名称：</label>
            <el-input v-model="vName" placeholder="请输入视频名称" clearable></el-input>
          </li>
          <li>
            <label>公司名称：</label>
            <el-input v-model="cName" placeholder="请输入公司名称" clearable></el-input>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <label>注入状态：</label>
            <el-select v-model="selInj" filterable placeholder="选择注入状态">
              <el-option
                v-for="item in injStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <label>储存状态：</label>
            <el-select v-model="selStr" filterable placeholder="选择储存状态">
              <el-option
                v-for="item in strStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <label>创建时间：</label>
            <el-date-picker v-model="selDate" align="right" type="date" placeholder="选择日期">
            </el-date-picker>
          </li>
        </ul>
      </section>
    </header>
    <article class="table">
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button type="info">重置</el-button>
        <div>
          <el-tooltip content="筛选列" placement="top">
            <el-button type="primary" icon="el-icon-s-fold" @click="dataFilter"></el-button>
          </el-tooltip>
          <el-tooltip content="打印" placement="top">
            <el-button type="primary" icon="el-icon-document"></el-button>
          </el-tooltip>
          <el-tooltip content="导出" placement="top">
            <el-button type="primary" icon="el-icon-download" @click="exportFile"></el-button>
          </el-tooltip>
        </div>
      </div>
      <el-table :data="mzArr" border style="width: 100%;font-size:0.8rem" stripe v-loading="loading">
        <!-- <el-table-column fixed prop="ID" label="ID" width="80"></el-table-column>-->
        <blockquote v-for="item in mzTree" :key="item">
          <el-table-column :prop="item.prop" :label="item.label" width="120"></el-table-column>
        </blockquote>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              style="color: #909399"
            >注入</el-button>
            <el-button type="text" size="small">更新</el-button>
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              style="color: #f56c6c"
            >删除</el-button>
            <el-button type="text" size="small" style="color: #e6a23c">重新操作</el-button>
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
      <el-button type="primary">新建</el-button>
      <el-button type="info">导出</el-button>
      <el-button type="info">批量新建</el-button>
    </footer>
    <!--引入animate动画-->
    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOutLeft"
      :duration="200"
    >
      <div class="filter" v-if="isFilterShow">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="city in cities"
            :label="city"
            :key="city"
            style="display:block;"
          >{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </transition>
    <!--上传文件弹出框，待封装-->
    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOutRight"
      :duration="200"
    >
      <div class="export" v-if="isEpFlieShow">
        <ul class="ep-ui">
          <li>导出到Csv文件</li>
          <li>导出到Excel文件</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import axios from "../../utils/request";
import { setTimeout } from 'timers';
// import { Loading } from 'element-ui';
export default {
  data() {
    return {
      injStatus:[{value: "1",label: "全部"},{value: "2",label: "未注入"},{value: "3",label: "注入成功"},
                 {value: "4",label: "注入中"},{value: "5",label: "注入失败"}],
      selInj:'',
      strStatus:[{value: "1",label: "全部"},{value: "2",label: "未储存"},{value: "3",label: "储存中"},
                 {value: "4",label: "储存成功"},{value: "5",label: "储存失败"},{value: "6",label: "已移除"}],
      selStr:'',
      selDate:'',
      provinces: [
        {
          value: "选项1",
          label: "上海市"
        },
        {
          value: "选项2",
          label: "北京市"
        },
        {
          value: "选项3",
          label: "福建省"
        },
        {
          value: "选项3",
          label: "浙江省"
        }
      ],
      selPro: "",
      vID: "",
      vName: "",
      cName: "",
      //表格数据
      mzArr: null,
      //控制表头的标签
      mzTree: null,
      //筛选列
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      //控制筛选列弹出框的显示
      isFilterShow: false,
      isEpFlieShow: false,
      loading: true
    };
  },
  created() {
    console.log("媒资管理组件初始化----");
    axios
      .get("mzManage", {
        params: {
          cursor: 1
        }
      })
      .then(res => {
        console.log(res);
        this.mzArr = res.mzArr;
        this.mzTree=res.mzTree;
         setTimeout(() => {
            this.loading=false;
        }, 500);
      })
      .catch(err => {});
  },
  methods: {
    handleClick(row) {
      console.log("传入row");
    },
    //筛选列
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    dataFilter() {
      this.isFilterShow = this.isFilterShow ? false : true;
    },
    exportFile() {
      this.isEpFlieShow = this.isEpFlieShow ? false : true;
    }
  }
};
</script>
<style lang="less" scoped>
.mzContainer {
  width: 100%;
  min-height: 780px;
  padding-left: 30px;
  padding-top: 30px;
}
ul {
  list-style-type: none;
  margin-top: 20px;
  & > li {
    display: inline-block;
    width: 33.3%;
    & > .el-input--small {
      width: 70%;
    }
  }
}

article.table {
  margin-top: 20px;
  & > div {
    margin-bottom: 10px;
    position: relative;
    & > div {
      position: absolute;
      right: 50px;
      display: inline-block;
    }
  }
}
label {
  color: #909399;
}
footer {
  margin-top: 20px;
}
.el-button--text {
  font-size: 0.8rem;
}
.el-select {
  width: 60%;
}
.filter {
  position: absolute;
  top: 29px;
  // min-width: 150px;
  min-height: 40px;
  text-align: left;
  overflow-y: auto;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px;
  padding: 5px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(210, 210, 210);
  border-image: initial;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  top: 267px;
  right: 180px;
  z-index: 5;
}
div.export {
  .filter;
  right: 80px;
  & > .ep-ui {
    margin-top: 0;
    padding-bottom: 0;
    & li {
      color: rgb(144, 147, 153);
      display: block;
      width: 100%;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}
//自定义弹出框过渡动画
// .fade-enter-active, .fade-leave-active {
//     transition: opacity 0.5s
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
//     opacity: 0;
// }
</style>

