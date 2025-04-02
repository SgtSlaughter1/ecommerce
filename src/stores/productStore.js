import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        categories: [],
        currentProduct: null,
        loading: false,
        error: null
    }),
    
    actions: {
        async fetchProducts() {
            this.loading = true
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                this.products = await response.json()
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async fetchCategories() {
            this.loading = true
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories')
                this.categories = await response.json()
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async fetchProductsByCategory(category) {
            this.loading = true
            try {
                const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
                this.products = await response.json()
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async fetchProductById(id) {
            this.loading = true
            this.error = null
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Product not found')
                    }
                    throw new Error(`Failed to fetch product (HTTP ${response.status})`)
                }

                const text = await response.text()
                if (!text) {
                    throw new Error('Empty response from server')
                }

                try {
                    const data = JSON.parse(text)
                    if (!data || typeof data !== 'object') {
                        throw new Error('Invalid product data')
                    }
                    this.currentProduct = data
                } catch (parseError) {
                    console.error('JSON Parse Error:', parseError)
                    throw new Error('Invalid response format')
                }
            } catch (err) {
                this.error = err.message || 'Failed to fetch product details'
                this.currentProduct = null
                throw err
            } finally {
                this.loading = false
            }
        }
    }
}) 