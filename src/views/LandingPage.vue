<template>
    <div class="body">
        <div id="heroCarousel" class="carousel slide" data-ride="carousel" data-interval="3000">
            <div class="carousel-inner">
                <div v-for="(slide, index) in carouselSlides" :key="index" class="carousel-item"
                    :class="{ 'active': index === 0 }">
                    <img :src="slide.image" class="d-block w-100" :alt="slide.alt">
                    <div class="overlay d-flex justify-content-center align-items-center">
                        <div class="carousel-caption text-center">
                            <h5 class="carousel-title">{{ slide.title }}</h5>
                            <p class="carousel-description">{{ slide.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </a>
            <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </a>
        </div>

        <section id="categories" class="text-center my-4">
            <h2>Shop by Category</h2>
            <div class="category-list">
                <span v-for="category in categories" :key="category" class="category-item">
                    ★ {{ category }}
                </span>
            </div>
        </section>

        <section id="products" class="text-center my-4">
            <h2>Featured Products</h2>
            <div class="product-cards">
                <div v-for="product in products" :key="product.id" class="card">
                    <div class="card-image">
                        <img :src="product.image" class="card-img-top" alt="Product Image">
                        <div class="overlay">
                            <button class="btn btn-wishlist">
                                More details
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">Price: {{ product.price }}</p>
                        <p class="card-description">{{ product.description }}</p>
                    </div>
                    <div class="d-flex">
                        <AddToCartButton :productId="product.id" />
                        <button class="btn btn-wishlist">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AddToCartButton from '@/components/AddToCartButton.vue';

export default {
    components: {
        AddToCartButton
    },
    data() {
        return {
            carouselSlides: [
                {
                    image: '/src/assets/slider1.webp',
                    alt: 'First slide',
                    title: 'Welcome to Our Store!',
                    description: 'Discover amazing products at unbeatable prices.'
                },
                {
                    image: '/src/assets/slider2.webp',
                    alt: 'Second slide',
                    title: 'Exclusive Offers Just for You',
                    description: 'Shop now and enjoy special discounts on selected items!'
                },
                {
                    image: '/src/assets/slider3.webp',
                    alt: 'Third slide',
                    title: 'Join Our Community',
                    description: 'Sign up for our newsletter and stay updated on the latest trends.'
                }
            ],
            categories: ['All', 'NEW ARRIVALS', 'BESTSELLERS', 'FEATURED'],
            products: [
                {
                    id: 1,
                    image: '/src/assets/img1.jpg',
                    name: 'Product Name 4',
                    price: '$49.99',
                    description: 'This is a brief description of the product. It highlights key features and benefits.'
                },
                {
                    id: 2,
                    image: '/src/assets/img1.jpg',
                    name: 'Product Name 1',
                    price: '$49.99',
                    description: 'This is a brief description of the product. It highlights key features and benefits.'
                },
                {
                    id: 3,
                    image: '/src/assets/img1.jpg',
                    name: 'Product Name 2',
                    price: '$60',
                    description: 'This is a brief description of the product. It highlights key features and benefits.'
                },
                {
                    id: 4,
                    image: '/src/assets/img1.jpg',
                    name: 'Product Name 3',
                    price: '$49.99',
                    description: 'This is a brief description of the product. It highlights key features and benefits.'
                }
            ]
        }
    }
}
</script>


<style scoped>
.body {
    overflow: hidden;
}

.carousel-item {
    position: relative;
}

img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.carousel-caption {
    position: relative;
    z-index: 2;
    color: #ffffff;
    text-align: center;
}

.carousel-title {
    font-size: 2.5rem;
}

.carousel-description {
    font-size: 1.25rem;
}

#categories {
    margin-top: 20px;
}

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

#products {
    margin-top: 20px;
}

.product-cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
}

.card-image {
    position: relative;
}

.card-img-top {
    width: 100%;
    height: auto;
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

.btn {
    border: none;
    border-radius: 5px;
    padding: 8px 0;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
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
    color: red;
}

.btn-wishlist:hover {
    transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
    .card {
        width: 100%;
        max-width: 300px;
    }
}

.card-details {
    display: none;
    /* Hide by default */
}

.card:hover .card-details {
    display: block;
    /* Show on hover */
}
</style>