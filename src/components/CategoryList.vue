<template>
    <section id="categories" class="text-center my-4">
        <h2>Shop by Category</h2>
        <div class="category-list">
            <a href="#"
                v-for="category in categories" 
                :key="category" 
                @click.prevent="$emit('category-selected', category)"
                :class="{ active: selectedCategory === category }"
                class="category-item">
                ★ {{ category }}
            </a>
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
    },
    props: {
        selectedCategory: {
            type: String,
            default: 'All'
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
    text-decoration: none;
}

.category-item.active {
    color: #007bff;
    font-weight: bold;
}
</style> 