<!--表格列过滤-->
<template>
  <div class="filter">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="setCheckMzAll"
    >全选（勾选过滤）</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkMz" @change="setCheckMz">
      <el-checkbox
        v-for="(item, index) in thLabel"
        :label="item"
        :key="index"
        style="display:block;"
      >{{item}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      checkMz: []
    };
  },
  props: {
    //表头标签
    thLabel: {
      type: Array,
      // 不能写成：default:[]
      default: ()=>["未加载"]
    },
    //表格数据
    tbData:{
        type: Array,
        default:()=>[]
    }
  },
  methods: {
    //筛选列（全选）
    setCheckMzAll(val) {
      //重新初始化
      let mzTreeTmp = this.tbData;
      console.log("触发全选事件", val);
      this.checkMz = val ? this.thLabel : [];
      console.log("this.checkMz=-----", this.checkMz);
      this.isIndeterminate = false;
      //操作mzArrTmp，mzTreeTmp
      this.checkMz.forEach(element => {
        mzTreeTmp = mzTreeTmp.filter(item => element !== item.label);
      });
      this.$emit('updateMzTree',mzTreeTmp);
      console.log("mzArrTmp改变------", mzTreeTmp);
    },
    //筛选列
    setCheckMz(checkMz) {
      //重新初始化
      let mzTreeTmp = this.tbData;
      console.log("勾选的标签页-----", checkMz);
      let checkedCount = checkMz.length;
      this.checkAll = checkedCount === this.thLabel.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.thLabel.length;
      //操作mzArrTmp，mzTreeTmp
      checkMz.forEach(element => {
        mzTreeTmp = mzTreeTmp.filter(item => element !== item.label);
      });
      console.log("mzArrTmp改变------", mzTreeTmp);
      //通过冒泡将子组件的值传给父组件
      this.$emit('updateMzTree',mzTreeTmp);
    }
  },
  created() {
    console.log("表头传进来的列thLabel----", this.thLabel);
    console.log("传进来的表格数据------",this.tbData);
  }
};
</script>
<style lang="less" scoped>
</style>
