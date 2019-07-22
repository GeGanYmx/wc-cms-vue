<template>
     <!--表头的公共按钮-->
     <div>
          <el-tooltip content="筛选列" placement="top">
            <el-button type="primary" icon="el-icon-s-fold" @click="dataFilter"></el-button>
          </el-tooltip>
          <el-tooltip content="打印" placement="top">
            <el-button type="primary" icon="el-icon-document" @click="print"></el-button>
          </el-tooltip>
          <el-tooltip content="导出" placement="top">
            <el-button type="primary" icon="el-icon-download" @click="exportFile"></el-button>
          </el-tooltip>
    </div>
</template>
<script>
export default {
    data(){
        return{
          //传入的prop不能直接修改，因此创建临时变量
           tmp_filter:this.filter,
           tmp_epFile:this.epFile
        }
    },
    props:{
        filter:{
            type:Boolean,
            default:true
        },
        epFile:{
            type:Boolean,
            default:true
        }
    },
    watch: {
     //监听data属性
     tmp_filter(val,oldVal){
         console.log('filter的新值---',val,'filter的老值---',oldVal);
         this.$emit('update:filter',val);
     },
     tmp_epFile(val,odlVal){
         this.$emit('update:ep-file',val);
     }

    },
    methods:{
    //筛选列弹出框
    dataFilter() {
    console.log('筛选列弹出框',this.filter);
    //传入的prop的属性 不能直接修改其值
    // this.filter=this.filter?false:true;
    
     this.tmp_filter=this.tmp_filter?false:true;
     //此种方式也可以，不过最好使用watch
     // this.$emit('update:filter',this.filter?false:true);
    },
    //导出功能弹出框
    exportFile() {
    console.log('导出功能弹出框',this.epFile?false:true);
    // this.epFile=this.epFile?false:true;
    //  this.$emit('update:ep-file',true);
    this.tmp_epFile=this.tmp_epFile?false:true;
    },
     //打印功能
    print() {
      console.log("打印文件");
      window.print();
    }
    }
}
</script>
<style lang="less" scoped>

</style>
