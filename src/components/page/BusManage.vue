<template>
  <div class="bsContainer">
    <main>
      <!--组织树-->
      <header>
        <h2>业务数据树</h2>
      </header>
      <article>
        <div>
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
    <article id="data">
      <header>
        <h2>业务元数据</h2>
      </header>
      <article>
        <div class="opDiv">
          <el-button type="primary">添加</el-button>
          <el-button type="warning">同步</el-button>
          <el-button type="warning">一键刷新</el-button>
        </div>
        <el-table :data="vArr" border style="width: 100%;font-size:0.8rem" stripe>
          <el-table-column fixed prop="date" label="节点ID" width="150"></el-table-column>
          <el-table-column prop="name" label="元数据键" width="100"></el-table-column>
          <el-table-column prop="province" label="元数据值" width="120"></el-table-column>
          <el-table-column prop="city" label="元数据描述" width="120"></el-table-column>
          <el-table-column prop="address" label="是否有效" width="300"></el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
                <!--编辑+删除-->
                <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="handleClick(scope.row)"></el-button>
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
      },
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
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
    .header-Base{
        width:100%;height:30px;border-bottom-style: solid;border-width: 1px;position: relative;border-color: #999;
    }
    .h2-base{
          position: absolute;bottom: -15px;z-index: 10;left: 10%; background: #f0f0f0; padding: 0 10px;
    }
    .bsContainer{
        width:100%;min-height:720px;display:flex;
    }
    main{
        width:30%;min-height:100%;border-right-style: solid;border-width: 1px;border-color: #999;
        & > header{
           .header-Base;
            & h2{
               .h2-base;
            }
        }
        & > article{
            padding-top:20px;
            & div{
                margin-top:20px;
            }
        }
    }
    #data{
        width:70%;min-height:100%;
        & > header{
           .header-Base;
            & h2{
              .h2-base;
            }
        }
        & > article{
            padding-top: 40px;
            & > .opDiv{
               margin-bottom: 20px;padding-left: 10px;
            }
        }
    }
</style>

