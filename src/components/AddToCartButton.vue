<!-- src/components/AddToCartButton.vue -->
<template>
    <button 
        class="btn btn-cart" 
        @click="addToCart"
        :disabled="loading"
    >
        <i class="bi bi-cart-plus"></i>
        {{ loading ? 'Adding...' : 'Add to Cart' }}
    </button>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'

export default {
    name: 'AddToCartButton',
    props: {
        productId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            cartStore: useCartStore(),
            productStore: useProductStore()
        }
    },
    methods: {
        async addToCart() {
            this.loading = true
            try {
                const product = this.productStore.products.find(p => p.id === this.productId) ||
                              this.productStore.currentProduct
                
                if (!product) {
                    throw new Error('Product not found')
                }

                this.cartStore.addToCart(product)
                this.$emit('added-to-cart', product)
            } catch (error) {
                console.error('Error adding to cart:', error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.btn-cart {
    background-color: #28a745;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.btn-cart:hover:not(:disabled) {
    background-color: #218838;
}

.btn-cart:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>