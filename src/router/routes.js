
export default [
  {
    path: "/",
    component: ()=>import("@/pages/Home"),
    meta: { show: true }
  },
  {
    path: "/home",
    component: ()=>import("@/pages/Home"),
    meta: { show: true }
  },
  {
    path: "/login",
    component:()=>import("@/pages/Login"),
    meta: { show: false }
  },
  {
    path: "/register",
    component: ()=>import("@/pages/Register"),
  },
  {
    name: "/search",
    path: "/search/:keyword?",
    component: ()=>import("@/pages/Search"),
    meta: { show: true },
    // 路由组件props布尔值传参
    // props:true,
    // 对象写法
    // props:{a:1,b:2}
    // 常用的
    // props:($route)=>{
    //   return {keyword:$route.params.keyword,k:route.query.k}
    // }
  },
  {
    name: "Detail",
    path: "/Detail/:id",
    component: ()=>import("@/pages/Detail"),
    meta: { show: true }
  },
  {
    name: "AddCartSuccess",
    path: "/AddCartSuccess",
    component: ()=>import("@/pages/AddCartSuccess"),
    meta: { show: true }
  },
  {
    path: "/ShopCart",
    component: ()=>import("@/pages/ShopCart"),
    meta: { show: true }
  },
  {
    path: "/Trade",
    component: ()=>import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter:(to,from,next)=>{
      if(from.path == "/ShopCart"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: "/Pay",
    component: ()=>import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter:(to,from,next)=>{
      if(from.path == "/Trade"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: "/PaySuccess",
    component: ()=>import("@/pages/PaySuccess"),
    meta: { show: true }
  },
  {
    path: "/Center",
    component: ()=>import("@/pages/Center"),
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myOrder",
        component: ()=>import("@/pages/Center/myOrder"),
      },
      {
        path: "groupOrder",
        component: ()=>import("@/pages/Center/groupOrder"),
      },
    ]

  },

]