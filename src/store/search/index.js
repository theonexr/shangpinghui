import { reqGetSearchInfo } from "@/api";

const state = {
    SearchList:{},
}
const mutations = {
    GETSEARCHLIST(state, SearchList){
        state.SearchList = SearchList
    }
}
const actions = {
    async getSearchList({ commit },Params={}) {
        let result = await reqGetSearchInfo(Params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    goodsList(state){
      return state.SearchList.goodsList||[]
    },
    trademarkList(state){
      return state.SearchList.trademarkList||[];
    },
    attrsList(state){
      return state.SearchList.attrsList||[];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}