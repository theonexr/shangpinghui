<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav/>

    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
    <!-- <button @click="change">Test</button> -->

  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from "vuex";
export default {
  name:'',
  // data() {
  //   return {
  //     color: "blue"
  //   };
  // },
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('UserInfo')
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
    
  },
  //  provide() {
  //   return {
  //     app: this//方法一：提供祖先组件的实例
  //   };
  // },

  // methods:{
  //   change(){
  //     this.color = '33'
  //   }
  // }
}
</script>

<style>

</style>