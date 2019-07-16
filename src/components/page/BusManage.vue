<template>
  <div style="width:100%;min-height:720px;display:flex;">
    <main
      style="width:30%;min-height:100%;border-right-style: solid;border-width: 1px;border-color: #999;"
    >
      <!--组织树-->
      <header
        style="width:100%;height:30px;border-bottom-style: solid;border-width: 1px;position: relative;border-color: #999;"
      >
        <h2 style="position: absolute;bottom: -15px;z-index: 10;left: 10%;">业务数据树</h2>
      </header>
      <article style="padding-top:20px;">
        <div style="margin-top:20px;">
          <el-button type="primary">增加</el-button>
          <el-button type="warning">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </div>
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          style="margin-top:20px;"
        ></el-tree>
      </article>
    </main>
    <article style="width:70%;min-height:100%;">
      <header
        style="width:100%;height:30px;position:relative;border-bottom-style: solid;border-width: 1px;border-color: #999;"
      >
        <h2 style="position: absolute;bottom: -15px;z-index: 10;left: 10%;">业务元数据</h2>
      </header>
      <article style="padding-top: 40px;">
        <div style="margin-bottom: 20px;padding-left: 10px;">
           <el-button type="primary">添加</el-button>
          <el-button type="warning">同步</el-button>
          <el-button type="danger">一键刷新</el-button>
        </div>
        <el-table :data="vArr" border style="width: 100%;font-size:0.8rem" stripe>
          <el-table-column fixed prop="date" label="ID" width="150"></el-table-column>
          <el-table-column prop="name" label="用户登录名" width="0"></el-table-column>
          <el-table-column prop="province" label="公司名称" width="120"></el-table-column>
          <el-table-column prop="city" label="是否启用" width="120"></el-table-column>
          <el-table-column prop="address" label="拥有角色" width="300"></el-table-column>
          <el-table-column prop="zip" label="开通省份" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">重设密码</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">启用</el-button>
              <el-button type="text" size="small">禁用</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </article>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "元数据",
          children: [
            {
              label: "注入状态"
            },
            {
              label: "存储状态"
            },
            {
              label: "文件格式"
            },
            {
              label: "平台"
            },
            {
              label: "C2API注入状态"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style scoped>
</style>

