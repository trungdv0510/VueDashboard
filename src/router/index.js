import {createRouter, createWebHistory} from 'vue-router';
import {getCookie} from "@/utils/CookiesUtils.js";
import createAccount from '@/components/pages/CreateAccount.vue';
import indexReport from '@/components/pages';
import reportList from '@/components/pages/ReportList.vue';
import testDetail from '@/components/pages/TestDetail.vue';
import notfound from '@/components/pages/404Error.vue'
import login from '@/components/pages/LoginVue.vue';
import {constanst} from '@/utils/Contains.js';
import regresstionTest from '@/components/pages/ReportRegresstion.vue';
import setting from "@/components/pages/Setting.vue";
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
    {
        path:"/report?startdate=:startdate&enddate=:enddate",
        name:"reportDate",
        component: reportList
    },
    {
        path:"/regresstion",
        name:"regresstion",
        component: regresstionTest
    },
    {
        path:"/setting",
        name:"setting",
        component: setting
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
    const loggedIn = getCookie(constanst.Authorization);
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
  })
export default router
