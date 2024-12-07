<!-- src/components/AddToCartButton.vue -->
<template>
    <button class="btn btn-cart" @click="addToCart">
        <i class="bi bi-cart"></i> 
    </button>
</template>

<script>
export default {
    props: {
        productId: {
            type: Number,
            required: true
        }
    },
    methods: {
        addToCart() {
            // Logic to add the product to the cart
            console.log(`Product ${this.productId} added to cart.`);
            // You can emit an event or call a store action here
        }
    }
}
</script>

<style scoped>
.btn-cart {
    background-color: transparent;
    color: #28a745;
}
.btn-cart:hover {
    transform: scale(1.05);
}
</style>