import Vue from 'vue'
import Router from 'vue-router'
//把需要的路由组件引入
// import Recommend from 'components/recommend/recommend'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import Singer from 'components/singer/singer'
// import Disc from 'components/disc/disc'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Toplist from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'
//singer的子组件
Vue.use(Router)


const Recommend = ((resolve) => {
  import('components/recommend/recommend').then((module) =>{
    resolve(module)
  })
})
const Singer = ((resolve) => {
  import('components/singer/singer').then((module) =>{
    resolve(module)
  })
})
const Rank = ((resolve) => {
  import('components/rank/rank').then((module) =>{
    resolve(module)
  })
})
const Search = ((resolve) => {
  import('components/search/search').then((module) =>{
    resolve(module)
  })
})
const Disc = ((resolve) => {
  import('components/disc/disc').then((module) =>{
    resolve(module)
  })
})
const SingerDetail = ((resolve) => {
  import('components/singer-detail/singer-detail').then((module) =>{
    resolve(module)
  })
})

const Toplist = ((resolve) => {
  import('components/top-list/top-list').then((module) =>{
    resolve(module)
  })
})
const UserCenter = ((resolve) => {
  import('components/user-center/user-center').then((module) =>{
    resolve(module)
  })
})
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component:Recommend,
      children: [
        {
          path: ":id",
          component:Disc
        }
      ]
    },
    {
      path: '/rank',
      component:Rank,
      children:[
        {
          path:":id",
          component:Toplist
        }
      ]
    },
    {
      path: '/singer',
      component:Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      component:Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path:'/user',
      component:UserCenter
    }
  ]
})
