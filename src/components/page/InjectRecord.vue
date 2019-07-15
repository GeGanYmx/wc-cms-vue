<!--新添页面：注入记录-->
<template>
  <div style="padding-left:30px;padding-top:30px;width: 100%;min-height: 780px;">
    <header>
      <label>所属公司：</label>
      <el-select v-model="selComp" placeholder="请选择">
        <el-option
          v-for="item in comps"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <label style="margin-left: 20px;">视频ID：</label>
      <el-input placeholder="请输入内容" v-model="vID" clearable style="width:40%"></el-input>
      <el-button type="info" style="margin-left:20px;">搜索</el-button>
      <el-button>重置</el-button>
    </header>
    <article>
        <div style="    position: relative;
    z-index: 890;
    width: 100%;
    min-height: 50px;
    line-height: 30px;
    padding: 10px 15px;
    border-width: 0 0 1px;">
      <el-button type="primary" icon="el-icon-edit"></el-button>
     <el-button type="primary" icon="el-icon-share"></el-button>
   <el-button type="primary" icon="el-icon-delete"></el-button>
    </div>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
        comps:[
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
        vID:''
    };
  },
  methods: {}
};
</script>
<style scoped>
</style>
