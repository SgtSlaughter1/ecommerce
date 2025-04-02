<template>
    <div id="heroCarousel" class="carousel slide" data-ride="carousel" data-interval="3000">
        <div class="carousel-inner">
            <div v-for="(slide, index) in slides" :key="index" 
                 :class="['carousel-item', index === 0 ? 'active' : '']">
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
</template>

<script>
export default {
    name: 'HeroCarousel',
    data() {
        return {
            slides: [
                {
                    image: '/src/assets/slider1.webp',
                    title: 'Welcome to Our Store!',
                    description: 'Discover amazing products at unbeatable prices.',
                    alt: 'First slide'
                },
                {
                    image: '/src/assets/slider2.webp',
                    title: 'Exclusive Offers Just for You',
                    description: 'Shop now and enjoy special discounts on selected items!',
                    alt: 'Second slide'
                },
                {
                    image: '/src/assets/slider3.webp',
                    title: 'Join Our Community',
                    description: 'Sign up for our newsletter and stay updated on the latest trends.',
                    alt: 'Third slide'
                }
            ]
        }
    }
}
</script>

<style scoped>
/* Move relevant carousel styles here */
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
    z-index: 5;
    color: #ffffff;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
}

.carousel-title {
    font-size: 2.5rem;
}

.carousel-description {
    font-size: 1.25rem;
}
</style> 