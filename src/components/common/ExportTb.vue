<!--导出excel组件-->
<template>
       <ul class="ep-ui">
          <li @click="createFile('csv')">导出到Csv文件</li>
          <li @click="createFile('xlsx')">导出到Excel文件</li>
       </ul>
</template>
<script>
export default {
    data(){
        return{
         
        }
    },
    //组件属性
    props: {
      tid: {
        type: String,
        default: 'table' 
      },
      tname: {
        type :String,
        default: 'table'
      }
    },
    methods:{
    createFile(fileType) {
    console.log('打印的文件格式：',fileType,this.tid,this.tname);
    let xlsxParam = { raw: true };
        let wb = this.$xlsx.utils.table_to_book(
          document.querySelector("#" + this.tid),
          xlsxParam
        );
        let wbout = this.$xlsx.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          this.$fileSaver.saveAs(
            new Blob([wbout], {
              type: "application/octet-stream"
            }),
            // this.name + '.xlsx'
            this.tname + '.' + fileType
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;

    }
    }
}
</script>
<style lang="less" scoped>
    .ep-ui {
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
</style>

