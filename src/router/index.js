import {createRouter, createWebHistory} from 'vue-router';
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
    //catch all 404
    {
        path:'/:catchAll(.*)',
        name:'notFound',
        component:notfound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router