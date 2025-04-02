<template>
    <div class="cart-badge" @click="$router.push('/cart')">
        <div class="cart-icon">
            <i class="bi bi-cart3"></i>
            <span v-if="store.cartCount" class="badge">{{ store.cartCount }}</span>
        </div>
        <span class="cart-text">My Cart</span>
        <span v-if="store.cartCount" class="cart-total">${{ store.cartTotal }}</span>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

export default {
    name: 'CartBadge',
    data() {
        return {
            store: useCartStore()
        }
    }
}
</script>

<style scoped>
.cart-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.cart-badge:hover {
    background-color: rgba(0,0,0,0.05);
}

.cart-icon {
    position: relative;
}

.cart-icon i {
    font-size: 1.5rem;
    color: #333;
}

.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #dc3545;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.8rem;
    min-width: 18px;
    text-align: center;
}

.cart-text {
    font-size: 0.9rem;
    color: #333;
}

.cart-total {
    font-weight: bold;
    color: #28a745;
}

@media (max-width: 768px) {
    .cart-text, .cart-total {
        display: none;
    }
}
</style> 