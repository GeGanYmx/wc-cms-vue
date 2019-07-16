<!--新添页面：注入记录-->
<template>
  <div style="padding-left:30px;padding-top:30px;width: 100%;min-height: 780px;">
    <header>
      <label>所属公司：</label>
      <el-select v-model="selComp" placeholder="请选择所属公司">
        <el-option
          v-for="item in comps"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <label style="margin-left: 20px;">视频ID：</label>
      <el-input placeholder="请输入视频ID" v-model="vID" clearable style="width:30%"></el-input>
      <el-button type="info" style="margin-left:20px;">搜索</el-button>
      <el-button>重置</el-button>
    </header>
    <article>
   <div style="margin-bottom: 10px;position: relative;margin-top: 20px;height: 32px;">
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
        <el-table-column fixed prop="date" label="ID" width="150"></el-table-column>
        <el-table-column prop="name" label="cpId" width="0"></el-table-column>
        <el-table-column prop="province" label="movieId" width="120"></el-table-column>
        <el-table-column prop="city" label="correlateId" width="120"></el-table-column>
        <el-table-column prop="address" label="注入状态" width="300"></el-table-column>
        <el-table-column prop="zip" label="detail" width="120"></el-table-column>
        <el-table-column prop="zip" label="平台" width="120"></el-table-column>
        <el-table-column prop="zip" label="path" width="120"></el-table-column>
         <el-table-column prop="zip" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="zip" label="更新时间" width="120"></el-table-column>
            <el-table-column prop="zip" label="infoUrl" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">新增</el-button>
             <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </article>
     <footer style="margin-top:20px;">
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      style="display:inline-block;margin-right:20px;"></el-pagination>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
        comps:[
            {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项1',
          label: '上海a网络科技'
        }, {
          value: '选项2',
          label: '上海b网络科技'
        }, {
          value: '选项3',
          label: '科大讯飞'
        }
        ],
        selComp:'',
        vID:'',
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
  methods: {}
};
</script>
<style scoped>
</style>
