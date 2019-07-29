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
          :data="mtTree"
          :props="defaultProps"
          @node-click="handleNodeClick"
          style="margin-top:20px;background: #f0f0f0;"
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
        <el-table :data="bsArr" border style="font-size:0.8rem" stripe v-loading="loading">
          <blockquote v-for="(item , index) in bsTree" :key="index">
            <el-table-column :prop="item.prop" :label="item.label" width="180"></el-table-column>
          </blockquote>

          <el-table-column label="操作" width="240">
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
import axios from "../../utils/request";
export default {
  name:'bsManage',
  data() {
    return {
      mtTree: null,
      bsArr: null,
      bsTree: null,
      loading: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created(){
    axios.get('http://rap2api.taobao.org/app/mock/225049/bsManage/mtTree').then(res=>{
      this.mtTree=res.mtTree;
    }).catch(err=>{});
    axios.get('http://rap2api.taobao.org/app/mock/225049/bsManage',{
      params:{
        cursor: 1
      }
    }).then(res=>{
      this.bsArr=res.bsArr;
      this.bsTree=res.bsTree;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }).catch(err=>{})
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
.header-Base {
  width: 100%;
  height: 30px;
  border-bottom-style: solid;
  border-width: 1px;
  position: relative;
  border-color: #999;
}
.h2-base {
  position: absolute;
  bottom: -15px;
  z-index: 10;
  left: 10%;
  background: #f0f0f0;
  padding: 0 10px;
}
.bsContainer {
  width: 100%;
  min-height: 720px;
  display: flex;
}
main {
  width: 20%;
  min-height: 100%;
  border-right-style: solid;
  border-width: 1px;
  border-color: #999;
  & > header {
    .header-Base;
    & h2 {
      .h2-base;
    }
  }
  & > article {
    padding-top: 20px;
    & div {
      margin-top: 20px;
    }
  }
}
#data {
  width: 80%;
  min-height: 100%;
  & > header {
    .header-Base;
    & h2 {
      .h2-base;
    }
  }
  & > article {
    padding-top: 40px;
    & > .opDiv {
      margin-bottom: 20px;
      padding-left: 10px;
    }
  }
}
.el-table, .el-table__expanded-cell {
    background-color: transparent;
}
</style>

