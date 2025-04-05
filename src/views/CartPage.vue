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

        <div v-else class="cart-layout">
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
                <div class="summary-content">
                    <h3>Cart Summary</h3>
                    <div class="summary-details">
                        <div class="summary-row">
                            <span>Total Items:</span>
                            <span>{{ store.cartCount }}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>${{ store.cartTotal }}</span>
                        </div>
                    </div>
                    <button class="btn btn-success checkout-btn" @click="$router.push('/checkout')">
                        Proceed to Checkout
                    </button>
                    <button class="btn btn-outline-danger clear-btn" @click="store.clearCart()">
                        Clear Cart
                    </button>
                </div>
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
    max-width: 1400px;
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

.cart-layout {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 30px;
    align-items: start;
}

.cart-items {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 20px;
}

.cart-item {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
    gap: 20px;
}

.cart-item:last-child {
    border-bottom: none;
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
    cursor: pointer;
    transition: all 0.2s ease;
}

.quantity-controls button:hover {
    background: #f8f9fa;
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
    padding: 5px;
    transition: color 0.2s ease;
}

.remove-btn:hover {
    color: #c82333;
}

.cart-summary {
    position: sticky;
    top: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.summary-content {
    padding: 20px;
}

.summary-details {
    margin: 20px 0;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.summary-row.total {
    font-size: 1.2rem;
    font-weight: bold;
    border-bottom: none;
    color: #28a745;
}

.checkout-btn, .clear-btn {
    width: 100%;
    margin-bottom: 10px;
    padding: 12px;
}

.checkout-btn {
    background-color: #28a745;
    border: none;
    color: white;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.checkout-btn:hover {
    background-color: #218838;
}

.clear-btn {
    background: none;
    border: 1px solid #dc3545;
    color: #dc3545;
    transition: all 0.2s ease;
}

.clear-btn:hover {
    background-color: #dc3545;
    color: white;
}

@media (max-width: 768px) {
    .cart-layout {
        grid-template-columns: 1fr;
    }

    .cart-item {
        flex-direction: column;
        text-align: center;
    }

    .item-total {
        text-align: center;
    }

    .cart-summary {
        position: static;
    }
}
</style> 