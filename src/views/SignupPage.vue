<!-- src/views/SignupPage.vue -->
<template>
    <div class="signup-container">
        <div class="signup-card">
            <h2 class="signup-title">Sign Up</h2>
            <form @submit.prevent="handleSignup">
                <div class="form-row">
                    <div class="mb-3 col">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" v-model="formData.name" required>
                    </div>
                    <div class="mb-3 col">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" v-model="formData.username" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="mb-3 col">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="formData.email" required>
                    </div>
                    <div class="mb-3 col">
                        <label for="phone" class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" id="phone" v-model="formData.phone" required>
                    </div>
                </div>
                <div class="form-row">

                    <div class="mb-3 col">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model="formData.password" required>
                    </div>
                    <div class="mb-3 col">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword"
                            v-model="formData.confirmPassword" required>
                    </div>

                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" v-model="formData.address" required>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role</label>
                    <select class="form-select" id="role" v-model="formData.role" required>
                        <option value="" disabled>Select your role</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <div v-if="errors && Object.keys(errors).length" class="text-danger">{{ errors }}</div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignupPage',
    data() {
        return {
            formData: {
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                phone: '',
                role: ''
            },
            errors: {} // Object to hold validation errors
        };
    },
    methods: {
        validateForm() {
            this.errors = {}; // Reset errors
            let isValid = true;

            // Required fields validation
            for (const key in this.formData) {
                if (!this.formData[key]) {
                    this.errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
                    isValid = false;
                }
            }

            // Name and Username length validation
            if (this.formData.name.length <= 5) {
                this.errors.name = 'Name must be more than 5 characters long.';
                isValid = false;
            }
            if (this.formData.username.length <= 5) {
                this.errors.username = 'Username must be more than 5 characters long.';
                isValid = false;
            }

            // Email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.formData.email && !emailPattern.test(this.formData.email)) {
                this.errors.email = 'Invalid email format.';
                isValid = false;
            }

            // Password strength validation
            if (this.formData.password && this.formData.password.length < 6) {
                this.errors.password = 'Password must be at least 6 characters long.';
                isValid = false;
            }

            // Confirm password validation
            if (this.formData.password !== this.formData.confirmPassword) {
                this.errors.confirmPassword = 'Passwords do not match.';
                isValid = false;
            }

            return isValid;
        },
        handleSignup() {
            if (this.validateForm()) {
                const existingData = JSON.parse(localStorage.getItem('userData')) || [];
                existingData.push(this.formData);
                localStorage.setItem('userData', JSON.stringify(existingData));
                alert('Registration successful!');
                this.resetForm();
            }
        },
        resetForm() {
            this.formData = {
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                phone: '',
                role: ''
            };
            this.errors = {};
        }
    }
}
</script>

<style scoped>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    /* background: url('/src/assets/img3.jpg') no-repeat center center fixed;
    background-size: cover;  */
}

.signup-card {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
}

.signup-title {
    margin-bottom: 20px;
    font-size: 2rem;
    text-align: center;
}

.form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.form-row .col {
    flex: 1;
    margin-right: 10px;
}

.form-row .col:last-child {
    margin-right: 0;
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


@media (max-width: 768px) {
    .form-row .col {
        margin-right: 0;
        flex: 100%;
    }
}
</style>