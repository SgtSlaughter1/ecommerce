
<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <h5 class="modal-title">Login Successful!</h5>
            <p class="modal-message">You will be redirected shortly...</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('close'); 
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 15px; 
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); 
    text-align: center;
    max-width: 400px; 
    width: 100%; 
}

.modal-title {
    margin-bottom: 15px;
    font-size: 1.8rem; 
    color: #28a745; 
}

.modal-message {
    margin-bottom: 20px;
    font-size: 1.2rem; 
    color: #333; 
}

</style>