import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
// 游客身份模块
import {getUUID} from "@/util/uuid_token"
const state = {
  goodInfo:{},
  // 临时身份
  uuid_token:getUUID()
}
const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo
  }
}
const actions = {
  async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200){
      commit("GETGOODINFO",result.data)
    }
  },
  async addOrUpdateShopCart({ commit },{skuId, skuNum}) {
    // 加入购物车解构
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    console.log(result);
    if(result.code=200){
        return "OK"
    }else{
   //返回的是失败的标记
    return Promise.reject(new Error("faile"));
    }
   
}
}
const getters = {
  categoryView(state){
    // 加上||{}，返回的是一个对象，不会报错
    return state.goodInfo.categoryView||{}
  },
  skuInfo(state){
    // 加上||{}，返回的是一个对象，不会报错
    return state.goodInfo.skuInfo||{}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList||[]
  }
}
export default {
    state,
    mutations,
    actions,
    getters
}