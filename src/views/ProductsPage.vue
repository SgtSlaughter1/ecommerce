<template>
    <div class="products-page">
        <aside class="sidebar">
            <h3>Categories</h3>
            <ul class="category-list">
                <li>
                    <a href="#" 
                        @click.prevent="selectCategory(null)"
                        :class="{ active: !selectedCategory }">
                        All Products
                    </a>
                </li>
                <li v-for="category in store.categories" 
                    :key="category">
                    <a href="#"
                        @click.prevent="selectCategory(category)"
                        :class="{ active: selectedCategory === category }">
                        {{ category }}
                    </a>
                </li>
            </ul>
        </aside>

        <main class="products-content">
            <h2>{{ selectedCategory ? `${selectedCategory} Products` : 'All Products' }}</h2>
            <div v-if="store.loading" class="loading">Loading...</div>
            <div v-else-if="store.error" class="error">{{ store.error }}</div>
            <div v-else class="product-grid">
                <ProductCard 
                    v-for="product in filteredProducts" 
                    :key="product.id" 
                    :product="product"
                />
            </div>
        </main>
    </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/ProductCard.vue'

export default {
    name: 'ProductsPage',
    components: {
        ProductCard
    },
    data() {
        return {
            store: useProductStore(),
            selectedCategory: null,
            allProducts: []
        }
    },
    computed: {
        filteredProducts() {
            if (!this.selectedCategory) return this.allProducts
            return this.allProducts.filter(product => 
                product.category === this.selectedCategory
            )
        }
    },
    async created() {
        await this.store.fetchCategories()
        await this.store.fetchProducts()
        this.allProducts = this.store.products
    },
    methods: {
        selectCategory(category) {
            this.selectedCategory = category
        }
    }
}
</script>

<style scoped>
.products-page {
    display: flex;
    gap: 30px;
    padding: 20px;
}

.sidebar {
    width: 250px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 20px;
    height: fit-content;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
}

.category-list {
    list-style: none;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
}

.category-list li {
    margin: 10px 0;
}

.category-list a {
    display: block;
    padding: 8px 15px;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.category-list a:hover {
    background: #f8f9fa;
    color: #007bff;
}

.category-list a.active {
    background: #007bff;
    color: white;
}

.products-content {
    flex: 1;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.loading, .error {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}

.error {
    color: red;
}

.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: #555;
}

@media (max-width: 768px) {
    .products-page {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        position: relative;
        top: 0;
        max-height: none;
    }

    .category-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .category-list li {
        margin: 0;
    }
}
</style> 