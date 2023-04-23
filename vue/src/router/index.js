import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
        path:'/auth',
        redirect:'/login',
        name:'auth',
        component: () => import('../components/AuthLayout.vue'),
       
        children:[
            {  path: '/login', component: () => import('../view/Loginpage.vue') },
            { path: '/register', component: () => import('../view/Register.vue') },
        ]
    },
    
 
  ]
})

export default router