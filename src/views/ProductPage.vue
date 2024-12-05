src/components/ProductPage.vue
<template>
    <div class="product-page">
        <div class="sidebar">
            <h3>Product Categories</h3>
            <ul>
                <li><a href="/category/electronics">Electronics</a></li>
                <li><a href="/category/clothing">Clothing</a></li>
                <li><a href="/category/home-appliances">Home Appliances</a></li>
                <li><a href="/category/books">Books</a></li>
                <li><a href="/category/toys">Toys</a></li>
            </ul>
        </div>
        <div class="product-details">
            <h2>{{ product.name }}</h2>
            <img :src="product.image" alt="Product Image" class="product-image" />
            <p class="product-price">${{ product.price }}</p>
            <p class="product-description">{{ product.description }}</p>
            <h4>Specifications</h4>
            <ul class="specifications">
                <li v-for="(spec, index) in product.specifications" :key="index">
                    {{ spec }}
                </li>
            </ul>
            <button class="btn btn-primary">Add to Cart</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {
                name: "Sample Product",
                image: "/src/assets/sample-product.jpg",
                price: 29.99,
                description: "This is a detailed description of the sample product.",
                specifications: [
                    "Dimension: 10 x 5 x 2 inches",
                    "Weight: 1.5 lbs",
                    "Material: Plastic",
                    "Color: Red",
                    "Warranty: 1 year"
                ]
            }
        };
    }
}
</script>

<style scoped>
.product-page {
    display: flex;
    padding: 20px;
}

.sidebar {
    flex: 1;
    padding: 20px;
    background-color: #f8f9fa;
    border-right: 1px solid #dee2e6;
}

.sidebar h3 {
    margin-bottom: 15px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li {
    margin: 10px 0;
}

.sidebar ul li a {
    text-decoration: none;
    color: #007bff;
}

.product-details {
    flex: 3;
    padding: 20px;
}

.product-image {
    max-width: 100%;
    height: auto;
}

.product-price {
    font-size: 24px;
    color: #28a745;
}

.product-description {
    margin: 15px 0;
}

.specifications {
    list-style-type: none;
    padding: 0;
}

.specifications li {
    margin: 5px 0;
}

.btn {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}
</style>