import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '@/views/SignupPage.vue';
import LandingPage from '@/views/LandingPage.vue';
import Login from '@/views/Login.vue';
import ProductPage from '@/views/ProductPage.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes :[

        {
            path: '/',
            name: 'landing',
            component: LandingPage, 
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignupPage, 
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/product-page',
            name: 'ProductPage',
            component: ProductPage
        },
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('@/views/CartPage.vue')
        },

    ]
});

export default router; // Ensure this line is present