src/components/ProductPage.vue
<template>
    <div class="product-page">
        <div class="sidebar">
            <h3>Product Categories</h3>
            <ul>
                <li v-for="category in store.categories" 
                    :key="category"
                    @click="handleCategoryClick(category)"
                    :class="{ active: selectedCategory === category }"
                    class="category-link">
                    {{ category }}
                </li>
            </ul>
        </div>
        <div class="product-details">
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

            <div v-else>
                <h2>{{ store.currentProduct.title }}</h2>
                <img :src="store.currentProduct.image" 
                     :alt="store.currentProduct.title" 
                     class="product-image" />
                <p class="product-price">${{ store.currentProduct.price }}</p>
                <p class="product-description">{{ store.currentProduct.description }}</p>
                <h4>Product Details</h4>
                <ul class="specifications">
                    <li>Category: {{ store.currentProduct.category }}</li>
                    <li>Rating: {{ store.currentProduct.rating?.rate }} 
                        ({{ store.currentProduct.rating?.count }} reviews)</li>
                </ul>
                <div class="action-buttons">
                    <AddToCartButton :product-id="store.currentProduct.id" />
                    <button class="btn btn-wishlist">
                        <i class="bi bi-heart"></i> Add to Wishlist
                    </button>
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
    display: flex;
    padding: 20px;
    gap: 30px;
}

.sidebar {
    flex: 1;
    padding: 20px;
    background-color: #f8f9fa;
    border-right: 1px solid #dee2e6;
    max-width: 250px;
}

.sidebar h3 {
    margin-bottom: 15px;
    color: #333;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.category-link {
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.category-link:hover {
    background-color: #e9ecef;
    color: #007bff;
}

.category-link.active {
    background-color: #007bff;
    color: white;
}

.product-details {
    flex: 3;
    padding: 20px;
}

.product-image {
    max-width: 400px;
    height: auto;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-price {
    font-size: 24px;
    color: #28a745;
    font-weight: bold;
    margin: 15px 0;
}

.product-description {
    margin: 15px 0;
    line-height: 1.6;
    color: #666;
}

.specifications {
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
}

.specifications li {
    margin: 10px 0;
    color: #555;
}

.action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
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
    .product-page {
        flex-direction: column;
    }

    .sidebar {
        max-width: 100%;
        border-right: none;
        border-bottom: 1px solid #dee2e6;
    }

    .product-image {
        max-width: 100%;
    }
}
</style>