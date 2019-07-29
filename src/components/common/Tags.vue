<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            //为激活的路由添加激活样式
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                //tagList删除关闭标签并返回删除项
                const delItem = this.tagsList.splice(index, 1)[0];
                //删除项可能是最后一项也可能是中间项，删除中间项，则tagsList[index]存在
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];        
                //item不存在，tagList为空
                if (item) {
                    //若删除项是当前激活项，则路由跳转到item.path，否则只删除
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                    // console.log('delItem------',delItem.path);
                }else{
                     //当tagList为空时，默认跳转到/
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                //some：检查当前点击的标签是否已经存在tags中
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                //新标签则插入
                if(!isExist){
                    if(this.tagsList.length >= 8){
                        // console.log('顶部导航栏已经超过8个，头删除');
                        this.tagsList.shift();
                    }
                    //插入新的链接
                        // console.log('插入新链接-----',route);
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        //组件名字，需要配置组件的name
                        name: route.matched[1].components.default.name
                    })
                }
                //通过事件总线发布事件
                bus.$emit('tags', this.tagsList);
                // console.log('this.tagsList----',this.tagsList);
            },
            //控制是关闭所有还是关闭其他
            handleTags(command){
                command === 'other' && this.closeOther() || this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            //监控$route变化（route包含当前激活的路由的路径和参数等信息）
            //watch监控属性值变化，$on监控发布的事件
            $route(newValue, oldValue){
                // console.log('监控route变化-------',oldValue,newValue);
                //当前路由变化时，设置tags
                this.setTags(newValue);
            }
        },
        created(){
            //tags初始化时保留激活的路由
            this.setTags(this.$route);
            // console.log(this.tagsList);
            // console.log('初始化激活的路由--------',this.$route);
            //暂时没用到
            bus.$on('close_current_tags', () => {
                // console.log('测试on=》current-tages')
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>


<style lang="less">
     //顶部标签栏的高度和标签的高度
     @tagsBoxHeight:40px;
     @tagHeight:@tagsBoxHeight - 10px;
    .tags {
        position: relative;
        /* height: 30px; */
        height: @tagsBoxHeight;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        /* height: 23px;
        line-height: 23px; */
        height: @tagHeight;
        line-height: @tagHeight;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    /*未激活的标签hover时*/
    .tags-li:not(.active):hover {
        background: #f8f8f8;
        // background: red;
    }
    /*标签的激活态*/
    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        /* height: 30px; */
        height: @tagsBoxHeight;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
        & .el-button--mini{
            height: @tagsBoxHeight;
        }
    }

</style>
