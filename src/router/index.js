import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '@/views/SignupPage.vue';
import LandingPage from '@/views/LandingPage.vue';
import Login from '@/views/Login.vue';
import ProductDetailPage from '@/views/ProductDetailsPage.vue';
import ProductsPage from '@/views/ProductsPage.vue';


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
            path: '/product/:id',
            name: 'ProductPage',
            component: ProductDetailPage
        },
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('@/views/CartPage.vue')
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: () => import('@/views/CheckoutPage.vue')
        },
        {
            path: '/order-confirmation',
            name: 'OrderConfirmation',
            component: () => import('@/views/OrderConfirmationPage.vue')
        },
        {
            path: '/products',
            name: 'Products',
            component: ProductsPage
        },

    ]
});

export default router; // Ensure this line is present