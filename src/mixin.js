//minxins（混入）：实现代码复用
import axios from 'axios';
var minxin=function (config){
    let { url }=config;
    
    return {
        data(){
          return{
            ele: {
                companys: [
                  {
                    value: "1",
                    label: "全部"
                  },
                  {
                    value: "2",
                    label: "上海a网络科技"
                  },
                  {
                    value: "3",
                    label: "上海b网络科技"
                  },
                  {
                    value: "4",
                    label: "科大讯飞"
                  }
                ],
                selComp: "",
                videoId: "",
                loading: true
              },
              injArr: null,
              injTree: null,
              //后台接收的控制表头的数据
              injTreeTmp: null,
              injfilter: null,
              //分页控件
              pagination: {
                injCount: 0,
                defaultLimit: 50
              },
              //筛选列
              checkAll: false,
              checkMz: [],
              //控制筛选列弹出框的显示
              isFilterShow: false,
              isEpFlieShow: false,
        
              //导出的表格信息
              outTable: {
                id: "injTable",
                name: "注入记录"
              },
                //控制弹出框的位置
              position: {
                filterBox: {
                  top: '108px',
                  right: '192px'
                },
                fileBox:{
                  top: '108px',
                  right: "80px"
                }
              }
          }
        },
        created(){
            console.log('mixins中的created');
            this.getData(1,this.pagination.defaultLimit);
        },
        methods:{
            getData(cursor,limit){
                axios
                .get( url , {
                  params: {
                    cursor 
                  }
                })
                .then(res => {
                  console.log(res);
                  this.injArr = res.ijArr;
                  this.pagination.injCount=this.injArr.length;
                  this.injTree = res.ijTree;
                  this.injfilter = res.ijTree.map(item => item.label);
                  this.injTreeTmp = this.injTree.slice();
                  setTimeout(() => {
                    this.ele.loading = false;
                  }, 500);
                  //将获取到data的组件，配合tagsList进行缓存
                  console.log('当前组件----',this.$options.name);
                  const compName = this.$options.name;
                  //防止cacheComp再次插入相同数据
                  !this.$store.getters.cacheComp.find(item=>item == compName) && this.$store.dispatch('addCacheComp',compName);
                  console.log('vuex状态管理------',this.$store.getters.cacheComp);
                })
                .catch(err => {});
              }
        }
    }
}

export default minxin;