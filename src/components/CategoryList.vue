<template>
    <section id="categories" class="text-center my-4">
        <h2>Shop by Category</h2>
        <div class="category-list">
            <span v-for="category in categories" 
                  :key="category" 
                  @click="$emit('category-selected', category)"
                  class="category-item">
                ★ {{ category }}
            </span>
        </div>
    </section>
</template>

<script>
import { useProductStore } from '@/stores/productStore'

export default {
    name: 'CategoryList',
    data() {
        return {
            store: useProductStore()
        }
    },
    async created() {
        await this.store.fetchCategories()
    },
    computed: {
        categories() {
            return ['All', ...this.store.categories]
        }
    }
}
</script>

<style scoped>
.category-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.category-item {
    margin: 0 20px;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
}
</style> 