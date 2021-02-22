import Vue from 'vue'
import VueRouter from 'vue-router'
import Home      from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // component: About
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // component: Login
        component: () => import("@/views/Login")
    },
    {
        path: '/user/:uuid',
        component: () => import("@/views/User"),
        // component: User,
        children: [
            {
                path: '',
                // component: UserDashboard
                component: () => import("@/views/UserDashboard")
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
