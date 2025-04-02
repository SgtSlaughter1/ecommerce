<template>
    <div class="cart-page">
        <h2>Shopping Cart</h2>
        
        <div v-if="!store.items.length" class="empty-cart">
            <i class="bi bi-cart-x"></i>
            <p>Your cart is empty</p>
            <button @click="$router.push('/')" class="btn btn-primary">
                Continue Shopping
            </button>
        </div>

        <div v-else>
            <div class="cart-items">
                <div v-for="item in store.items" 
                     :key="item.id" 
                     class="cart-item">
                    <img :src="item.image" :alt="item.title">
                    <div class="item-details">
                        <h3>{{ item.title }}</h3>
                        <p class="price">${{ item.price }}</p>
                    </div>
                    <div class="quantity-controls">
                        <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                    <p class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</p>
                    <button class="remove-btn" @click="store.removeFromCart(item.id)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            <div class="cart-summary">
                <h3>Cart Summary</h3>
                <p>Total Items: {{ store.cartCount }}</p>
                <p class="total">Total: ${{ store.cartTotal }}</p>
                <button class="btn btn-success checkout-btn">
                    Proceed to Checkout
                </button>
                <button class="btn btn-outline-danger" @click="store.clearCart()">
                    Clear Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

export default {
    name: 'CartPage',
    data() {
        return {
            store: useCartStore()
        }
    },
    methods: {
        updateQuantity(productId, quantity) {
            this.store.updateQuantity(productId, quantity)
        }
    }
}
</script>

<style scoped>
.cart-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.empty-cart {
    text-align: center;
    padding: 40px;
}

.empty-cart i {
    font-size: 4rem;
    color: #6c757d;
    margin-bottom: 20px;
}

.cart-items {
    margin-bottom: 20px;
}

.cart-item {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
    gap: 20px;
}

.cart-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
}

.price {
    color: #28a745;
    font-weight: bold;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-controls button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
}

.item-total {
    font-weight: bold;
    min-width: 80px;
    text-align: right;
}

.remove-btn {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
}

.cart-summary {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-top: 20px;
}

.total {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 10px 0;
}

.checkout-btn {
    width: 100%;
    margin-bottom: 10px;
}

@media (max-width: 768px) {
    .cart-item {
        flex-direction: column;
        text-align: center;
    }

    .item-total {
        text-align: center;
    }
}
</style> 