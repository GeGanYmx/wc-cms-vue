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
     <el-table :data="cpArr" border style="width:65%;font-size:0.8rem" stripe>
        <blockquote v-for="item in cpTree" :key="item">
          <el-table-column :prop="item.prop" :label="item.label" width="120"></el-table-column>
        </blockquote>

        <el-table-column fixed="right" label="操作" width="100">
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
      style="display:inline-block;margin-right:20px;"></el-pagination>
    </footer>
  </div>
</template>
<script>
import axios from "../../utils/request";
export default {
    data(){
       return{
        company: '',
        cpArr: null,
        cpTree: null
      }
    },
    created(){
      axios.get('cpManage',{
        params:{
          cursor:1
        }
      }).then(res=>{
         this.cpArr=res.cpArr;
         this.cpTree=res.cpTree;
      }).catch(err=>{

      })
    },
    methods:{

    }  
}
</script>
<style lang="less" scoped>
   .cpContainer{
       padding-left:30px;padding-top:30px;width: 100%;min-height: 780px;
   }
   .arHeader{
       margin-bottom: 10px;position: relative;margin-top: 20px;height: 32px;
       & div{
           position:absolute;right:50px;display:inline-block
       }
   }
   footer{
       margin-top:20px;
   }
   label {
     color: #909399;
  }
</style>

