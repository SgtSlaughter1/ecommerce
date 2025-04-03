<template>
    <div class="body">
        <HeroCarousel />
        
        <CategoryList @category-selected="selectCategory" />

        <section id="products" class="text-center my-4">
            <h2>{{ selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory} Products` }}</h2>
            <div v-if="store.loading" class="loading">Loading...</div>
            <div v-else-if="store.error" class="error">{{ store.error }}</div>
            <div v-else class="product-cards">
                <ProductCard 
                    v-for="product in filteredProducts" 
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
            store: useProductStore(),
            selectedCategory: 'All',
            allProducts: []
        }
    },
    async created() {
        await this.store.fetchProducts()
        this.allProducts = this.store.products
    },
    computed: {
        filteredProducts() {
            if (this.selectedCategory === 'All') return this.allProducts
            return this.allProducts.filter(product => 
                product.category === this.selectedCategory
            )
        }
    },
    methods: {
        selectCategory(category) {
            this.selectedCategory = category
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