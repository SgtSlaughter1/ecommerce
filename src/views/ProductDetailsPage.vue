src/components/ProductPage.vue
<template>
    <div class="product-page">
        <div class="product-container">
            <div v-if="store.loading" class="loading-container">
                <div class="spinner"></div>
                <p>Loading product details...</p>
            </div>
            
            <div v-else-if="store.error" class="error-container">
                <div class="error-message">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <p>{{ store.error }}</p>
                </div>
                <div class="error-actions">
                    <button @click="loadProduct" class="btn btn-retry">
                        <i class="bi bi-arrow-clockwise"></i> Try Again
                    </button>
                    <button @click="$router.push('/')" class="btn btn-home">
                        <i class="bi bi-house"></i> Go to Home
                    </button>
                </div>
            </div>

            <div v-else-if="!store.currentProduct" class="error-container">
                <div class="error-message">
                    <i class="bi bi-question-circle"></i>
                    <p>Product not found</p>
                </div>
                <button @click="$router.push('/')" class="btn btn-home">
                    <i class="bi bi-house"></i> Go to Home
                </button>
            </div>

            <div v-else class="product-content">
                <div class="product-image-container">
                    <img :src="store.currentProduct.image" 
                         :alt="store.currentProduct.title" 
                         class="product-image" />
                </div>
                <div class="product-info">
                    <h2 class="product-title">{{ store.currentProduct.title }}</h2>
                    <div class="product-meta">
                        <span class="product-category">{{ store.currentProduct.category }}</span>
                        <div class="product-rating">
                            <i class="bi bi-star-fill"></i>
                            <span>{{ store.currentProduct.rating?.rate }} 
                                ({{ store.currentProduct.rating?.count }} reviews)</span>
                        </div>
                    </div>
                    <p class="product-price">${{ store.currentProduct.price }}</p>
                    <p class="product-description">{{ store.currentProduct.description }}</p>
                    <div class="action-buttons">
                        <AddToCartButton :product-id="store.currentProduct.id" />
                        <button class="btn btn-wishlist">
                            <i class="bi bi-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import AddToCartButton from '@/components/AddToCartButton.vue'

export default {
    name: 'ProductPage',
    components: {
        AddToCartButton
    },
    data() {
        return {
            store: useProductStore(),
            selectedCategory: null,
            productId: null
        }
    },
    async created() {
        this.productId = this.$route.params.id
        if (!this.productId) {
            this.store.error = 'Invalid product ID'
            return
        }
        await this.loadProduct()
    },
    methods: {
        async loadProduct() {
            try {
                await this.store.fetchCategories()
                await this.store.fetchProductById(this.productId)
            } catch (error) {
                // Error is already handled in the store
            }
        },
        async handleCategoryClick(category) {
            this.selectedCategory = category
            this.$router.push(`/category/${category}`)
        }
    }
}
</script>

<style scoped>
.product-page {
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.product-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 30px;
}

.product-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
}

.product-image-container {
    position: relative;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.product-image {
    width: 100%;
    height: 400px;
    object-fit: contain;
    display: block;
}

.product-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.product-title {
    font-size: 2rem;
    color: #333;
    margin: 0;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
}

.product-category {
    text-transform: capitalize;
    background: #e9ecef;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.9rem;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 5px;
}

.product-rating i {
    color: #ffc107;
}

.product-price {
    font-size: 2rem;
    color: #28a745;
    font-weight: bold;
    margin: 0;
}

.product-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
}

.action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    font-size: 1.1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-wishlist {
    background-color: #dc3545;
    color: white;
}

.btn-wishlist:hover {
    background-color: #c82333;
    transform: translateY(-2px);
}

.loading-container {
    text-align: center;
    padding: 40px;
}

.error-container {
    text-align: center;
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.error-message {
    margin-bottom: 20px;
}

.error-message i {
    font-size: 2rem;
    color: #dc3545;
    margin-bottom: 10px;
}

.error-message p {
    color: #666;
    font-size: 1.1rem;
}

.error-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-retry, .btn-home {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 5px;
}

.btn-retry {
    background-color: #6c757d;
    color: white;
}

.btn-home {
    background-color: #007bff;
    color: white;
}

.btn-retry:hover, .btn-home:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 10px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
    .product-content {
        grid-template-columns: 1fr;
    }
}
</style>