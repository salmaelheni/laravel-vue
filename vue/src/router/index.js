import { createRouter, createWebHashHistory } from "vue-router"
import HomePage from "../views/HomePage.vue"
import LoginPage from "../views/LoginPage.vue"
import RegisterPage from "../views/RegisterPage.vue"
import defaultLayout from "../components/defaultLayout.vue"
import AuthLayout from "../components/AuthLayout.vue"
import Surveys from "../views/Survey.vue"
import store from '../store'

const routes =[
    {
        path: '/',
        redirect: '/dashboard',
        component:defaultLayout,
        meta:{requiresAuth : true},
        children:[
            {path:'/dashboard',name:'dashboard',component:HomePage},
            {path:'/surveys',name:'surveys',component:Surveys},
        ]

    },
    {
        path: '/auth',
        redirect: '/login',
        name:'auth',
        component:AuthLayout,
        meta:{isGuest : true},
        children:[
            {
                path: '/login',
                name:'LoginPage',
                component:LoginPage
        
            },
            {
                path: '/register',
                name:'RegisterPage',
                component:RegisterPage
        
            },
        ]

    },

]

const router = createRouter({
history: createWebHashHistory(),
routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name:'LoginPage'})
    }else if(store.state.user.token && (to.meta.isGuest)){
        next({name:'dashboard'})
    }else{
        next()
    }
})

export default router