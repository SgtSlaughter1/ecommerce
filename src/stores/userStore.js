import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        registrationError: null,
    }),
    actions: {
        async register(userData) {
            try {
                // Make a POST request to the signup API
                const response = await axios.post('https://infinion-test-int-test.azurewebsites.net/api/Campaign', userData);
                this.users.push(response.data); // Assuming the response contains the user data
                this.registrationError = null; // Clear any previous errors
            } catch (error) {
                // Handle error response
                if (error.response && error.response.data) {
                    this.registrationError = error.response.data.message || 'Registration failed. Please try again.';
                } else {
                    this.registrationError = 'An error occurred. Please try again.';
                }
            }
        }
    }
});