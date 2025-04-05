<template>
    <div class="confirmation-page">
        <div class="confirmation-container">
            <div class="success-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <h1>Order Confirmed!</h1>
            <p class="thank-you">Thank you for your purchase</p>
            <p class="message">
                We've received your order and will send you an email confirmation shortly.
            </p>
            <div class="actions">
                <button class="btn btn-primary" @click="$router.push('/products')">
                    Continue Shopping
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderConfirmationPage'
}
</script>

<style scoped>
.confirmation-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.confirmation-container {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
}

.success-icon {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 20px;
}

h1 {
    color: #28a745;
    margin-bottom: 10px;
}

.thank-you {
    font-size: 1.2rem;
    color: #495057;
    margin-bottom: 20px;
}

.message {
    color: #6c757d;
    margin-bottom: 30px;
}

.actions {
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #007bff;
    border: none;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
}
</style> 