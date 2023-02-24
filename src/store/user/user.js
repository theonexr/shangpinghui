import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import { setToken, getToken,removeToken} from "@/util/token";
import { Promise } from "core-js";

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        //帮仓库中先关用户信息清空
        state.token = ""
        state.userInfo = {}
        //本地存储数据清空
        removeToken()
    }
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone);
   
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
    // 用户注册
    async UserRegister({commit},data){
        let result = await reqUserRegister(data)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async UserLogin ({commit},data){
    //服务器下发token，用户唯一标识符(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
        let result = await reqUserLogin(data)
        console.log(result);
        if(result.code==200){
             //用户已经登录成功且获取到token
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 获取用户信息
    async UserInfo({commit}){
        let result = await reqUserInfo()
        // console.log(result);
        if(result.code == 200){
            // 提交用户信息
        commit("USERINFO",result.data)
        return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 退出登录
    async Logout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}