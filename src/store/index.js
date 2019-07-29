import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

//全局注册vuex
Vue.use(Vuex);
const state={
    //缓存的组件
    cacheComp:[]
}

const mutations={
    ADD_CACHECOMP(state,data){
        console.log(`组件${data}将进行缓存`)
        state.cacheComp.push(data);
    },
    DEL_CACHECOMP(state,data){
       state.cacheComp = state.cacheComp.filter(item=>{
            console.log('删除组件缓存',data);
            return item != data;
        });
        console.log('cacheComp-----',state.cacheComp);
    }
}

const actions={
    addCacheComp({commit},data){
      commit('ADD_CACHECOMP',data);
    },
    delCacheComp({commit},data){
        commit('DEL_CACHECOMP',data);
    }
}

const getters={
    cacheComp:state=>state.cacheComp
}

const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store;