<template>
    <div class="body">
        <HeroCarousel />
        
        <CategoryList @category-selected="handleCategorySelect" />

        <section id="products" class="text-center my-4">
            <h2>Featured Products</h2>
            <div v-if="store.loading" class="loading">Loading...</div>
            <div v-else-if="store.error" class="error">{{ store.error }}</div>
            <div v-else class="product-cards">
                <ProductCard 
                    v-for="product in store.products" 
                    :key="product.id" 
                    :product="product"
                />
            </div>
        </section>
    </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import HeroCarousel from '@/components/HeroCarousel.vue'
import CategoryList from '@/components/CategoryList.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
    name: 'LandingPage',
    components: {
        HeroCarousel,
        CategoryList,
        ProductCard
    },
    data() {
        return {
            store: useProductStore()
        }
    },
    async created() {
        await this.store.fetchProducts()
    },
    methods: {
        async handleCategorySelect(category) {
            if (category === 'All') {
                await this.store.fetchProducts()
            } else {
                await this.store.fetchProductsByCategory(category)
            }
        }
    }
}
</script>

<style scoped>
.body {
    overflow: hidden;
}

.product-cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}

/* Add loading and error styles */
.loading, .error {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}

.error {
    color: red;
}
</style>