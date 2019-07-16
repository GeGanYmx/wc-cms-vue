<!--新添页面：媒资管理-->
<template>
  <!-- <div style="width:100%;height:50px;background-color:red">媒资管理</div> -->
  <div class="mzContainer">
    <header>
      <section>
        <label>省份：</label>
        <el-select v-model="selPro" multiple placeholder="最多选31个">
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
            <el-select v-model="selPro" placeholder="最多选31个">
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
            <el-select v-model="selPro" placeholder="最多选31个">
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
      <div style="margin-bottom: 10px;position: relative;">
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
        <div style="position:absolute;right:50px;display:inline-block">
          <el-tooltip content="筛选列" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip content="打印" placement="top">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip content="导出" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">注入</el-button>
            <el-button type="text" size="small">更新</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">重新操作</el-button>
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
      <el-button type="primary">导出</el-button>
      <el-button type="primary">批量新建</el-button>
    </footer>
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
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log("传入row");
    }
  }
};
</script>
<style scoped>
.mzContainer {
  width: 100%;
  min-height: 780px;
  padding-left: 30px;
  padding-top: 30px;
}
ul {
  list-style-type: none;
  margin-top: 20px;
}
ul > li {
  display: inline-block;
  width: 33.3%;
}
ul > li > .el-input--small {
  width: 70%;
}
article.table {
  margin-top: 20px;
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
</style>

