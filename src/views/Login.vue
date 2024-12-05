<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div v-if="loginError" class="text-danger">{{ loginError }}</div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
        <SuccessModal :visible="showModal" />
    </div>
</template>

<script>
import SuccessModal from '@/components/SuccessModal.vue';

export default {
    components: {
        SuccessModal
    },
    data() {
        return {
            username: '',
            password: '',
            loginError: '',
            showModal: false
        };
    },
    methods: {
        handleLogin() {
            const existingData = JSON.parse(localStorage.getItem('userData')) || [];
            const user = existingData.find(user => user.username === this.username && user.password === this.password);
            if (user) {
                this.showModal = true; // Show the success modal
                setTimeout(() => {
                    this.showModal = false; 
                    this.$router.push('/'); 
                }, 3000);
            } else {
                this.loginError = 'Invalid username or password.';
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('https://example.com/background-image.jpg') no-repeat center center fixed;
    background-size: cover; 
}

.login-card {
    background-color: rgba(255, 255, 255, 0.9); 
    padding: 30px;
    border-radius: 10px; 
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
    width: 400px; 
}

.login-title {
    margin-bottom: 20px;
    font-size: 2rem;
    text-align: center; 
}

.form-label {
    font-weight: bold; 
}

.form-control {
    border-radius: 5px; 
    border: 1px solid #ccc; 
}

.btn-primary {
    background-color: #007bff;
    border: none; 
    border-radius: 5px; 
    width: 100%; 
}

.btn-primary:hover {
    background-color: #0056b3; 
}

.text-danger {
    margin-top: 10px; 
    text-align: center; 
}
</style>