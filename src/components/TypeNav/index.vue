<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            
            <!-- 三级联动 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :class="{ cur: currentIndex == index }"
                :key="c1.categoryId"
              >
                <h3 @mouseenter="changIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                </h3>
                <!-- 三元判断索引样式 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                  v-show="targethree"
                    class="subitem"
                    v-for="(c2) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
    <!-- {{ app.color }} -->
  </div>
  
</template>

<script>
// 引入ladash做节流
// import _ from 'lodash';
import throttle from "lodash/throttle";
import { mapState } from "vuex";
// console.log(_);
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
      targethree:true
    };
  },
  // inject: ['app'],
  // 通知Vuex发请求,获取数据，存储与仓库中
  mounted() {
    // console.log(this.color);
    // console.log(this);
    // console.log(this.$store);
    // 组件挂载完毕，show等于false
    // 如果不是Home,隐藏typeNav
    // console.log(this.$route.path);
    if (this.$route.path != "/home"&&this.$route.path != "/") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要一个函数，使用这个计算属性时，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // changIndex(index){
    //     // index鼠标移动索引值
    //     // console.log(index);
    //     this.currentIndex = index
    // },
    // 通过throttle做节流操作,不能用箭头函数，不然可能出现上下this的问题
    changIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(index);
    }, 20),

    goSearch(event) {
      // 靠自定义属性区分三级联动层级
      let element = event.target;
      // console.log(element);
      // 节点有一个dataset属性，可以获取节点自定义属性与属性值
      console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "/search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 如果路由跳转的时候，带有params参数，带着一起传过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完参数
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
      // console.log(this.$route.path);
    },
    // 鼠标进入，列表展示
    enterShow() {
      if (this.$route.path != "/home"&&this.$route.path != "/") {
        this.show = true;
      }else{
        this.targethree = true
      }
    },
    // 鼠标离开，列表隐藏
    leaveShow() {
      if (this.$route.path != "/home"&&this.$route.path != "/") {
        // this.currentIndex = -1;
        this.show = false;
      }else{
        this.currentIndex = -1;
        this.targethree = false
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        // 换一种
        // .item:hover{
        //     background: skyblue;
        // }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过渡动画
    // 过渡动画开始状态
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束转状态
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>