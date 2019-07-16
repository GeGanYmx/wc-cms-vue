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
            <el-select v-model="selPro" filterable placeholder="最多选31个">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <label>储存状态：</label>
            <el-select v-model="selPro" filterable placeholder="最多选31个">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <label>创建时间：</label>
            <el-select v-model="selPro" placeholder="最多选31个">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
            <el-button type="primary" icon="el-icon-s-fold" @click="getFliterDialog"></el-button>
          </el-tooltip>
          <el-tooltip content="打印" placement="top">
            <el-button type="primary" icon="el-icon-document"></el-button>
          </el-tooltip>
          <el-tooltip content="导出" placement="top">
            <el-button type="primary" icon="el-icon-download"></el-button>
          </el-tooltip>
        </div>
      </div>
      <el-table :data="vArr" border style="width: 100%;font-size:0.8rem" stripe>
        <el-table-column fixed prop="date" label="ID" width="100"></el-table-column>
        <el-table-column prop="date" label="视频ID" width="150"></el-table-column>
        <el-table-column prop="date" label="视频名称" width="150"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="name" label="注入操作" width="0"></el-table-column>
        <el-table-column prop="province" label="注入状态" width="120"></el-table-column>
        <el-table-column prop="city" label="储存状态" width="120"></el-table-column>
        <el-table-column prop="address" label="储存进度（0-100）" width="300"></el-table-column>
        <el-table-column prop="zip" label="播放代码" width="120"></el-table-column>
        <el-table-column prop="zip" label="公司名称" width="120"></el-table-column>
        <el-table-column prop="zip" label="视频大小" width="120"></el-table-column>
        <el-table-column prop="zip" label="FTP操作" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
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
      <transition name="fade">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      vArr: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      //筛选列
      checkAll: false,
      checkedCities: [],
      cities: ["上海", "北京", "广州", "深圳"],
      isIndeterminate: true,
      //控制筛选列弹出框的显示
      isFilterShow:false
    };
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
    getFliterDialog(){
      this.isFilterShow=this.isFilterShow?false:true;
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
div.filter {
  position: absolute;
  top: 29px;
  left: -1px;
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
    left: 77%;
    z-index: 5;
}
//自定义弹出框过渡动画
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
}
</style>

