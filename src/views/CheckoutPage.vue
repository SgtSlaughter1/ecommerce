<template>
    <div class="checkout-page">
        <div class="checkout-container">
            <div class="checkout-steps">
                <div class="checkout-main">
                    <h2>Checkout</h2>
                    <div class="progress-bar">
                        <div 
                            v-for="(step, index) in steps" 
                            :key="step.id"
                            class="step"
                            :class="{ 
                                'active': currentStep >= index,
                                'completed': currentStep > index 
                            }"
                        >
                            <div class="step-number">{{ index + 1 }}</div>
                            <div class="step-label">{{ step.label }}</div>
                        </div>
                    </div>

                    <!-- Shipping Information -->
                    <div v-show="currentStep === 0" class="checkout-form">
                        <h3>Shipping Information</h3>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                v-model="shippingInfo.fullName" 
                                placeholder="Enter your full name"
                            >
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    v-model="shippingInfo.email" 
                                    placeholder="Enter your email"
                                >
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input 
                                    type="tel" 
                                    v-model="shippingInfo.phone" 
                                    placeholder="Enter your phone number"
                                >
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input 
                                type="text" 
                                v-model="shippingInfo.address" 
                                placeholder="Enter your street address"
                            >
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>City</label>
                                <input 
                                    type="text" 
                                    v-model="shippingInfo.city" 
                                    placeholder="Enter your city"
                                >
                            </div>
                            <div class="form-group">
                                <label>State</label>
                                <input 
                                    type="text" 
                                    v-model="shippingInfo.state" 
                                    placeholder="Enter your state"
                                >
                            </div>
                            <div class="form-group">
                                <label>ZIP Code</label>
                                <input 
                                    type="text" 
                                    v-model="shippingInfo.zipCode" 
                                    placeholder="Enter ZIP code"
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Payment Information -->
                    <div v-show="currentStep === 1" class="checkout-form">
                        <h3>Payment Information</h3>
                        <div class="form-group">
                            <label>Card Number</label>
                            <input 
                                type="text" 
                                v-model="paymentInfo.cardNumber" 
                                placeholder="Enter your card number"
                            >
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Expiry Date</label>
                                <input 
                                    type="text" 
                                    v-model="paymentInfo.expiryDate" 
                                    placeholder="MM/YY"
                                >
                            </div>
                            <div class="form-group">
                                <label>CVV</label>
                                <input 
                                    type="text" 
                                    v-model="paymentInfo.cvv" 
                                    placeholder="CVV"
                                >
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Name on Card</label>
                            <input 
                                type="text" 
                                v-model="paymentInfo.nameOnCard" 
                                placeholder="Enter name as shown on card"
                            >
                        </div>
                    </div>

                    <!-- Order Review -->
                    <div v-show="currentStep === 2" class="checkout-form">
                        <h3>Review Order</h3>
                        <div class="review-section">
                            <h4>Shipping Details</h4>
                            <div class="review-details">
                                <p>{{ shippingInfo.fullName }}</p>
                                <p>{{ shippingInfo.email }}</p>
                                <p>{{ shippingInfo.phone }}</p>
                                <p>{{ shippingInfo.address }}</p>
                                <p>{{ shippingInfo.city }}, {{ shippingInfo.state }} {{ shippingInfo.zipCode }}</p>
                            </div>
                        </div>
                        <div class="review-section">
                            <h4>Payment Method</h4>
                            <div class="review-details">
                                <p>Card ending in {{ paymentInfo.cardNumber.slice(-4) }}</p>
                                <p>Expiry: {{ paymentInfo.expiryDate }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button 
                            v-if="currentStep > 0" 
                            class="btn btn-outline" 
                            @click="previousStep"
                        >
                            Back
                        </button>
                        <button 
                            v-if="currentStep < 2" 
                            class="btn btn-primary" 
                            @click="nextStep"
                        >
                            Continue
                        </button>
                        <button 
                            v-else 
                            class="btn btn-success" 
                            @click="placeOrder"
                        >
                            Place Order
                        </button>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="order-summary">
                    <div class="summary-content">
                        <h3>Order Summary</h3>
                        <div class="summary-items">
                            <div v-for="item in store.items" :key="item.id" class="summary-item">
                                <div class="item-info">
                                    <img :src="item.image" :alt="item.title">
                                    <div>
                                        <p class="item-title">{{ item.title }}</p>
                                        <p class="item-quantity">Qty: {{ item.quantity }}</p>
                                    </div>
                                </div>
                                <p class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
                            </div>
                        </div>
                        <div class="summary-details">
                            <div class="summary-row">
                                <span>Subtotal</span>
                                <span>${{ store.cartTotal }}</span>
                            </div>
                            <div class="summary-row">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>
                            <div class="summary-row">
                                <span>Tax</span>
                                <span>${{ calculateTax() }}</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total</span>
                                <span>${{ calculateTotal() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

export default {
    name: 'CheckoutPage',
    data() {
        return {
            store: useCartStore(),
            currentStep: 0,
            steps: [
                { id: 'shipping', label: 'Shipping' },
                { id: 'payment', label: 'Payment' },
                { id: 'review', label: 'Review' }
            ],
            shippingInfo: {
                fullName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: ''
            },
            paymentInfo: {
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                nameOnCard: ''
            }
        }
    },
    methods: {
        nextStep() {
            if (this.currentStep < 2) {
                this.currentStep++
            }
        },
        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep--
            }
        },
        calculateTax() {
            // Assuming 10% tax rate
            return (parseFloat(this.store.cartTotal) * 0.1).toFixed(2)
        },
        calculateTotal() {
            const subtotal = parseFloat(this.store.cartTotal)
            const shipping = 5.00
            const tax = parseFloat(this.calculateTax())
            return (subtotal + shipping + tax).toFixed(2)
        },
        placeOrder() {
            // Here you would implement the order submission logic
            console.log('Order placed:', {
                shipping: this.shippingInfo,
                payment: this.paymentInfo,
                items: this.store.items,
                total: this.calculateTotal()
            })
            // Navigate to confirmation page
            this.$router.push('/order-confirmation')
        }
    }
}
</script>

<style scoped>
.checkout-page {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.checkout-container {
    margin-top: 20px;
}

.checkout-steps {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 30px;
    align-items: start;
}

.checkout-main {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 30px;
}

.progress-bar {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    position: relative;
}

.progress-bar::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 2px;
    background: #e9ecef;
    z-index: 1;
}

.step {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #6c757d;
    transition: all 0.3s ease;
}

.step.active .step-number {
    background: #28a745;
    color: white;
}

.step.completed .step-number {
    background: #28a745;
    color: white;
}

.step-label {
    font-size: 0.9rem;
    color: #6c757d;
}

.checkout-form {
    margin-top: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #495057;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
}

input:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
}

.form-actions {
    margin-top: 30px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.btn {
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-outline {
    border: 1px solid #6c757d;
    background: none;
    color: #6c757d;
}

.btn-outline:hover {
    background: #6c757d;
    color: white;
}

.btn-primary {
    background: #007bff;
    border: none;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
}

.btn-success {
    background: #28a745;
    border: none;
    color: white;
}

.btn-success:hover {
    background: #218838;
}

.order-summary {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 20px;
}

.summary-content {
    padding: 20px;
}

.summary-items {
    margin: 20px 0;
    max-height: 300px;
    overflow-y: auto;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.item-info {
    display: flex;
    gap: 10px;
    align-items: center;
}

.item-info img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.item-title {
    font-size: 0.9rem;
    margin: 0;
}

.item-quantity {
    font-size: 0.8rem;
    color: #6c757d;
    margin: 4px 0 0 0;
}

.item-price {
    font-weight: 500;
}

.summary-details {
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding-top: 20px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 5px 0;
}

.summary-row.total {
    font-size: 1.2rem;
    font-weight: bold;
    color: #28a745;
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 10px;
}

.review-section {
    margin-bottom: 30px;
}

.review-section h4 {
    color: #495057;
    margin-bottom: 10px;
}

.review-details {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
}

.review-details p {
    margin: 5px 0;
    color: #6c757d;
}

@media (max-width: 768px) {
    .checkout-steps {
        grid-template-columns: 1fr;
    }

    .order-summary {
        position: static;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}
</style> 