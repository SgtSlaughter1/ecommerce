<template>
    <div class="confirmation-page">
        <div class="confirmation-container">
            <div class="success-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <h1>Order Confirmed!</h1>
            <p class="thank-you">Thank you for your purchase</p>
            
            <div class="animation-container">
                <div class="road">
                    <div class="line"></div>
                </div>
                <div class="truck-container">
                    <div class="truck">
                        <div class="cabin">
                            <div class="window"></div>
                            <div class="light"></div>
                        </div>
                        <div class="cargo-area">
                            <div class="cargo-top"></div>
                            <div class="cargo-back"></div>
                            <div class="cargo-bottom"></div>
                        </div>
                        <div class="wheels">
                            <div class="wheel">
                                <div class="wheel-inner"></div>
                            </div>
                            <div class="wheel">
                                <div class="wheel-inner"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-container">
                    <div class="product-box">
                        📦
                    </div>
                </div>
                <div class="clouds">
                    <div class="cloud"></div>
                    <div class="cloud"></div>
                    <div class="cloud"></div>
                </div>
            </div>

            <p class="message">
                Your order is on the way! We'll send you an email confirmation shortly.
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
import { useCartStore } from '@/stores/cartStore'

export default {
    name: 'OrderConfirmationPage',
    created() {
        const store = useCartStore()
        store.clearCart()
    }
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

/* Animation Styles */
.animation-container {
    position: relative;
    height: 200px;
    margin: 40px 0;
    overflow: hidden;
    background: linear-gradient(180deg, #87CEEB 0%, #87CEEB 60%, #f0f0f0 60%, #f0f0f0 100%);
    border-radius: 12px;
}

.road {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    height: 20px;
    background: #555;
    border-radius: 2px;
}

.line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: white;
    transform: translateY(-50%);
}

.truck-container {
    position: absolute;
    bottom: 50px;
    right: -150px;
    transform: scaleX(-1);
    animation: moveTruck 5s ease-in-out forwards;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.truck {
    width: 160px;
    height: 80px;
    position: relative;
}

.cabin {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    background: #28a745;
    border-radius: 8px 0 0 0;
    box-shadow: inset -1px 1px rgba(255,255,255,0.3);
}

.window {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    height: 15px;
    background: #add8e6;
    border-radius: 2px;
    box-shadow: inset 0 0 4px rgba(255,255,255,0.5);
}

.light {
    position: absolute;
    bottom: 8px;
    left: 3px;
    width: 6px;
    height: 6px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow: 0 0 10px #ffd700;
}

.cargo-area {
    position: absolute;
    left: 55px;
    bottom: 0;
    width: 100px;
    height: 60px;
    perspective: 400px;
}

.cargo-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #28a745;
    box-shadow: inset 0 -2px rgba(0,0,0,0.1);
}

.cargo-back {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 5px;
    height: 60px;
    background: #1a662e;
}

.cargo-top {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background: #1a662e;
}

.wheels {
    position: absolute;
    bottom: -8px;
    left: 15px;
    right: 15px;
    display: flex;
    justify-content: space-between;
}

.wheel {
    width: 20px;
    height: 20px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: rotateWheel 1s linear infinite;
}

.wheel-inner {
    width: 10px;
    height: 10px;
    background: #666;
    border-radius: 50%;
    border: 2px solid #444;
}

.product-container {
    position: absolute;
    bottom: 100px;
    right: 120px;
    display: flex;
    gap: 10px;
}

.product-box {
    font-size: 28px;
    opacity: 1;
    transform: translateY(0);
    animation: dropIntoTruck 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 1.8s;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
}

.clouds {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 40px;
}

.cloud {
    position: absolute;
    width: 50px;
    height: 20px;
    background: white;
    border-radius: 20px;
    opacity: 0.8;
    animation: moveCloud 15s linear infinite;
}

.cloud:before,
.cloud:after {
    content: '';
    position: absolute;
    background: white;
    border-radius: 50%;
}

.cloud:before {
    width: 25px;
    height: 25px;
    top: -10px;
    left: 10px;
}

.cloud:after {
    width: 20px;
    height: 20px;
    top: -8px;
    right: 10px;
}

.cloud:nth-child(1) {
    top: 10px;
    animation-delay: 0s;
}

.cloud:nth-child(2) {
    top: 30px;
    animation-delay: -5s;
}

.cloud:nth-child(3) {
    top: 0;
    animation-delay: -10s;
}

@keyframes moveTruck {
    0% {
        transform: translateX(0) scaleX(-1);
    }
    35% {
        transform: translateX(calc(-50% - 90px)) scaleX(-1);
    }
    65% {
        transform: translateX(calc(-50% - 90px)) scaleX(-1);
    }
    100% {
        transform: translateX(calc(-100% - 150px)) scaleX(-1);
    }
}

@keyframes rotateWheel {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes dropIntoTruck {
    0% {
        transform: translateY(-50px) rotate(0deg);
        opacity: 1;
    }
    40% {
        transform: translateY(10px) rotate(10deg);
        opacity: 1;
    }
    70% {
        transform: translateY(25px) rotate(5deg);
        opacity: 0.8;
    }
    100% {
        transform: translateY(35px) translateX(-20px) rotate(0deg);
        opacity: 0;
    }
}

@keyframes moveCloud {
    from {
        left: -100px;
    }
    to {
        left: calc(100% + 100px);
    }
}
</style> 