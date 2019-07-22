<!--导出excel组件-->
<template>
  <div class="export" >
       <ul class="ep-ui">
          <li @click="createFile('csv')">导出到Csv文件</li>
          <li @click="createFile('xlsx')">导出到Excel文件</li>
       </ul>
  </div>
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
  top: 212px;
  right: 192px;
  z-index: 5;
  box-shadow: 0 0 20px #99ccff;
}
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
  div.export {
  .filter;
  right: 80px;
  box-shadow: 0 0 20px #99CCFF;
}
</style>

