import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/home'
import search from './search'
import detail from './Detail/detail'
import shopcart from './shopcart/shopcart'
import user from './user/user'
import trade from './trade/trade'
Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   count:1
  // },
  // getters: {
  // },
  // mutations: {
 
  // },
  // actions: {
  // },
  // 在modules中存放两个小仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
