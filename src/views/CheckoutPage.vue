<template>
    <div class="checkout-page">
        <div class="checkout-container">
            <div class="checkout-steps">
                <!-- Steps Sidebar -->
                <div class="steps-sidebar">
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
                            <div class="step-content">
                                <div class="step-label">{{ step.label }}</div>
                                <div class="step-description">{{ getStepDescription(index) }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="checkout-main">
                    <h2>Checkout</h2>

                    <Transition mode="out-in">
                        <!-- Shipping Information -->
                        <div v-if="currentStep === 0" key="shipping" class="checkout-form">
                            <h3>Shipping Information</h3>
                            <FormComponent 
                                :fields="shippingFields"
                                submitText="Continue to Payment"
                                @submit="handleShippingSubmit"
                            />
                        </div>

                        <!-- Payment Information -->
                        <div v-else-if="currentStep === 1" key="payment" class="checkout-form">
                            <h3>Payment Information</h3>
                            <FormComponent 
                                :fields="paymentFields"
                                submitText="Continue to Review"
                                @submit="handlePaymentSubmit"
                            />
                            <div class="form-actions">
                                <button class="btn btn-outline" @click="previousStep">Back to Shipping</button>
                            </div>
                        </div>

                        <!-- Order Review -->
                        <div v-else key="review" class="checkout-form">
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
                                <div class="edit-section">
                                    <button class="btn btn-link" @click="currentStep = 0">Edit Shipping</button>
                                </div>
                            </div>
                            <div class="review-section">
                                <h4>Payment Method</h4>
                                <div class="review-details">
                                    <p>Card ending in {{ paymentInfo.cardNumber.slice(-4) }}</p>
                                    <p>Expiry: {{ paymentInfo.expiryDate }}</p>
                                </div>
                                <div class="edit-section">
                                    <button class="btn btn-link" @click="currentStep = 1">Edit Payment</button>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button class="btn btn-outline" @click="previousStep">Back to Payment</button>
                                <button class="btn btn-success" @click="placeOrder">Place Order</button>
                            </div>
                        </div>
                    </Transition>
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
import FormComponent from '@/components/FormComponent.vue'

export default {
    name: 'CheckoutPage',
    components: {
        FormComponent
    },
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
            },
            shippingFields: [
                { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true, halfWidth: true },
                { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter your phone number', required: true, halfWidth: true },
                { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your street address', required: true },
                { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city', required: true, halfWidth: true },
                { name: 'state', label: 'State', type: 'text', placeholder: 'Enter your state', required: true, halfWidth: true },
                { name: 'zipCode', label: 'ZIP Code', type: 'text', placeholder: 'Enter ZIP code', required: true }
            ],
            paymentFields: [
                { name: 'cardNumber', label: 'Card Number', type: 'text', placeholder: 'Enter your card number', required: true },
                { name: 'expiryDate', label: 'Expiry Date', type: 'text', placeholder: 'MM/YY', required: true, halfWidth: true },
                { name: 'cvv', label: 'CVV', type: 'text', placeholder: 'CVV', required: true, halfWidth: true },
                { name: 'nameOnCard', label: 'Name on Card', type: 'text', placeholder: 'Enter name as shown on card', required: true }
            ]
        }
    },
    methods: {
        handleShippingSubmit(formData) {
            console.log('Shipping form submitted:', formData);
            this.shippingInfo = { ...formData };
            this.currentStep = 1; // Explicitly set to payment step
        },
        handlePaymentSubmit(formData) {
            console.log('Payment form submitted:', formData);
            this.paymentInfo = { ...formData };
            this.currentStep = 2; // Explicitly set to review step
        },
        nextStep() {
            if (this.currentStep < 2) {
                this.currentStep++;
            }
        },
        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
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
        },
        getStepDescription(index) {
            const descriptions = {
                0: 'Enter your shipping details',
                1: 'Enter your payment information',
                2: 'Review your order details'
            }
            return descriptions[index]
        }
    }
}
</script>

<style scoped>
.checkout-page {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
    background-color: #f8f9fa;
    min-height: 100vh;
}

.checkout-container {
    margin-top: 20px;
}

.checkout-steps {
    display: grid;
    grid-template-columns: 250px 1fr 350px;
    gap: 30px;
    align-items: start;
}

.steps-sidebar {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 20px;
    position: sticky;
    top: 20px;
}

.progress-bar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
}

.progress-bar::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e9ecef;
    z-index: 1;
}

.step {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    background: transparent;
}

.step.active {
    background: #f8f9fa;
}

.step.active .step-label {
    color: #28a745;
}

.step.active .step-description {
    color: #2c3e50;
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
    flex-shrink: 0;
    border: 2px solid transparent;
}

.step.active .step-number {
    background: #e8f5e9;
    color: #28a745;
    border-color: #28a745;
}

.step.completed .step-number {
    background: #28a745;
    color: white;
    border-color: transparent;
}

.step-content {
    flex-grow: 1;
}

.step-label {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 4px;
    transition: color 0.3s ease;
}

.step-description {
    font-size: 0.85rem;
    color: #6c757d;
    transition: color 0.3s ease;
}

.checkout-main {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 30px;
}

.checkout-form {
    margin-top: 30px;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.checkout-form.v-enter-active,
.checkout-form.v-leave-active {
    transition: opacity 0.3s ease;
}

.checkout-form.v-enter-from,
.checkout-form.v-leave-to {
    opacity: 0;
}

.checkout-form h3 {
    margin-bottom: 24px;
    color: #2c3e50;
    font-size: 1.5rem;
}

.form-actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.btn {
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
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

.btn-success {
    background: #28a745;
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

.edit-section {
    margin-top: 10px;
    text-align: right;
}

.edit-section button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    color: #6c757d;
    font-weight: 500;
}

@media (max-width: 1200px) {
    .checkout-steps {
        grid-template-columns: 1fr 350px;
    }

    .steps-sidebar {
        display: none;
    }
}

@media (max-width: 768px) {
    .checkout-steps {
        grid-template-columns: 1fr;
    }

    .order-summary {
        position: static;
    }

    .checkout-main {
        padding: 20px;
    }
}
</style> 