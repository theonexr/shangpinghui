import { reqGetBannerList, reqgetCategoryList,reqFloorList } from "@/api";

const state = {
    // state中数据默认初始值接收数据
    categoryList: [],
    bannerList: [],
    floorList:[]
}

const mutations = {

    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },

    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }

}

const actions = {
    async categoryList({ commit }) {
        let result = await reqgetCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    // 获取首页轮播图
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        //   console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}