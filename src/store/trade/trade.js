import {reqAddressInfo,reqOrderInfo,reqSubmitOrder } from "@/api";

const state = {
    address:[],
    orderInfo:[]
}
const mutations = {
    ADDRESSINFO(state,address){
        state.address = address
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }

}
const actions = {
    // 获取地址信息
    async AddressInfo({commit}) {
        let result = await reqAddressInfo()
        console.log(result);
        if(result.code==200){
            commit("ADDRESSINFO",result.data)
        }
    },
    // 获取订单信息
    async OrderInfo({commit}) {
        let result = await reqOrderInfo()
        console.log(result);
        if(result.code==200){
            commit("ORDERINFO",result.data)
        }
    },
    // async SubmitOrder({commit},{tradeNo, data}){
    //     let result = await reqSubmitOrder(tradeNo, data)
    //     console.log(result);
    // }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}