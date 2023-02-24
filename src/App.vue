<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { reqgetCategoryList,reqGetBannerList } from "@/api";
import axios from "axios"
// import { reqGetSearchInfo } from "@/api";
// console.log(reqGetSearchInfo());
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  created() {
    // reqgetCategoryList()
    // axios.get('http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList').then(function(result){
    //   console.log(result);
    // })
    // reqGetBannerList()
    // axios.get('/mock/banner')
    // .then(function(res){
    //   console.log(res);
    // })
    axios.get('http://10.7.160.119:8080/Smbmsuser/select')
    .then(res=>{
      console.log(res);
    })
  },
  mounted() {
    // 在根组件中发起list请求，只会发起一次，可以提高性能
    this.$store.dispatch("categoryList");
  },
  methods: {},
};
</script>
<style lang="less"></style>
