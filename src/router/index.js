import {createRouter, createWebHistory} from 'vue-router';
import {getCookie} from "@/utils/cookiesUtils.js";
import createAccount from '@/components/pages/createAccount.vue';
import indexReport from '@/components/pages/index.vue';
import reportList from '@/components/pages/reportList.vue';
import testDetail from '@/components/pages/testDetail.vue';
import notfound from '@/components/pages/404Error.vue'
import login from '@/components/pages/loginVue.vue';
const routes = [
    {
        path:"/",
        name:"index",
        component: indexReport
    },
    {
        path:"/create",
        name:"create",
        component: createAccount
    },
    {
        path:"/report",
        name:"report",
        component: reportList
    },
    {
        path:"/report/:id",
        name:"reportDetail",
        component: testDetail,
        props:true
    },
    {
        path:"/login",
        name:"login",
        component: login,
    },
    {
        path:"/index",
        redirect:"/",
    },
    //catch all 404
    {
        path:'/:catchAll(.*)*',
        name:'notFound',
        component:notfound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = getCookie('user');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
  })
export default router