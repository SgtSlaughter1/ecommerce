import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        loading: false,
        error: null
    }),

    getters: {
        cartCount: (state) => state.items.length,
        
        cartTotal: (state) => {
            return state.items.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0).toFixed(2)
        }
    },

    actions: {
        addToCart(product) {
            const existingItem = this.items.find(item => item.id === product.id)
            
            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({
                    ...product,
                    quantity: 1
                })
            }
        },

        removeFromCart(productId) {
            const index = this.items.findIndex(item => item.id === productId)
            if (index > -1) {
                this.items.splice(index, 1)
            }
        },

        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId)
            if (item) {
                item.quantity = quantity
                if (item.quantity <= 0) {
                    this.removeFromCart(productId)
                }
            }
        },

        clearCart() {
            this.items = []
        }
    }
}) 