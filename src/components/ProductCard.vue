<template>
    <div class="card">
        <div class="card-image">
            <img :src="product.image" class="card-img-top" :alt="product.title" @error="handleImageError">
            <div class="overlay">
                <button class="btn btn-wishlist" @click="goToProductDetails">
                    More details
                </button>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title text-truncate" :title="product.title">{{ product.title }}</h5>
            <p class="card-text">Price: ${{ product.price }}</p>
            <p class="card-description">{{ truncatedDescription }}</p>
        </div>
        <div class="d-flex">
            <AddToCartButton :product-id="product.id" />
            <button class="btn btn-wishlist">
                <i class="bi bi-heart"></i>
            </button>
        </div>
    </div>
</template>

<script>
import AddToCartButton from './AddToCartButton.vue'

export default {
    name: 'ProductCard',
    components: {
        AddToCartButton
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        truncatedDescription() {
            return this.product.description?.length > 100
                ? this.product.description.substring(0, 100) + '...'
                : this.product.description
        }
    },
    methods: {
        handleImageError(e) {
            e.target.src = '/src/assets/placeholder-image.png'
        },
        goToProductDetails() {
            this.$router.push(`/product/${this.product.id}`)
        }
    }
}
</script>

<style scoped>
.card {
    width: 280px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background: white;
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.card-image {
    position: relative;
    width: 100%;
    height: 280px;
    /* 1:1 aspect ratio */
    overflow: hidden;
}

.card-img-top {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Maintain aspect ratio */
    background-color: #f8f9fa;
    /* Light background for images */
    padding: 10px;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.card:hover .overlay {
    opacity: 1;
}

.card-body {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card-title {
    font-size: 1.1rem;
    margin-bottom: 10px;
    font-weight: 600;
    color: #333;
    height: 1.5em;
    overflow: hidden;
}

.card-text {
    font-size: 1.2rem;
    color: #28a745;
    font-weight: 600;
    margin-bottom: 10px;
}

.card-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 15px;
    line-height: 1.4;
    flex-grow: 1;
}

.d-flex {
    padding: 15px;
    gap: 10px;
    border-top: 1px solid #eee;
}

.btn {
    border: none;
    border-radius: 5px;
    padding: 8px 0;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    margin-bottom: 5px;
}

.btn-cart {
    background-color: transparent;
    color: #28a745;
}

.btn-cart:hover {
    transform: scale(1.05);
}

.btn-wishlist {
    background-color: transparent;
    color: white;
}

.btn-wishlist:hover {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .card {
        width: 100%;
        max-width: 320px;
    }

    .card-image {
        height: 320px;
    }
}
</style>