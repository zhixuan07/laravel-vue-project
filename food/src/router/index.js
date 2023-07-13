import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
const router = createRouter({
    history: createWebHistory(),
    
    routes: [
        
        { 
        path: "/home", component: () => import("../components/DefaultLayout.vue"),
        meta: { requiresAuth: false },
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("../view/Home.vue"),
            },]
            },
        
            
        
        {
            path: "/",
            redirect: "/home",
            component: () => import("../components/DefaultLayout.vue"),
            meta: { requiresAuth: true },
            children: [
                
                {
                    path: "/recipe/:recipeName",
                    name: "recipe",
                    component: () =>
                        import("../components/SearchFoodbyName.vue"),
                },
                {
                    path: "/category",
                    component: () => import("../view/FoodCategory.vue"),
                },
                {
                    path: "/categoryItem/:category",
                    name: "categoryItem",
                    component: () => import("../components/CategoryItem.vue"),
                },
                {
                    path:"/account",
                    name:"account",
                    component: () => import("../view/Account.vue")
                },
                {
                    path:"/savedRecipe",
                    name:"savedRecipe",
                    component: () => import("../view/SavedRecipe.vue")
                },
                {
                    path:"/restaurant",
                    name:"restaurant",
                    component: () => import("../view/Restaurant.vue")
                }
            ],
        },
        {
            path: "/auth",
            redirect: "/login",
            name: "auth",
            component: () => import("../components/AuthLayout.vue"),
            meta: { isGuest: true },
            children: [
                {
                    path: "/login",
                    component: () => import("../view/Login.vue"),
                },
                {
                    path: "/register",
                    component: () => import("../view/Register.vue"),
                },
                
            ],
        },
        
    ]
    
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next("/login");
    } else if (store.state.user.token && to.meta.isGuest) {
        next("/home");
    } else {
        next();
    }
});

export default router;
