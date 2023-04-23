import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home', component: () => import('../components/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
        { path: '/home', component: () => import('../view/Home.vue') }
    ] 
    },
    {
        path:'/auth',
        redirect:'/login',
        name:'auth',
        component: () => import('../components/AuthLayout.vue'),
       
        children:[
            {  path: '/login', component: () => import('../view/Login.vue') },
            { path: '/register', component: () => import('../view/Register.vue') },
        ]
    },
    
 
  ]
})

export default router