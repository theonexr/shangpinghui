import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store/search'
import  store  from './store'
import "swiper/css/swiper.css"
import '@/mock/mockServe'
import Pagination from "@/components/Pagination";
import Carousel from "@/components/Carousel";
// 三级联动组件
import TypeNav from '@/components/TypeNav'
import { Button,MessageBox} from 'element-ui';
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// Vue.config.productionTip = false
// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
import atm from '@/assets/1.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  loading:atm
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'

Vue.use(myPlugins,{
  name:'upper'
})
// 引入表单校验插件
import "@/plugins/validate"

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
