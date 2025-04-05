<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-navbar"> 
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Mastermind Gadgets</router-link>
            <button class="btn btn-light d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNavOffcanvas" aria-controls="mobileNavOffcanvas">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="offcanvas offcanvas-start d-lg-none" data-bs-scroll="true" tabindex="-1" id="mobileNavOffcanvas" aria-labelledby="mobileNavOffcanvasLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="mobileNavOffcanvasLabel">Store Menu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
                <div class="offcanvas-body">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/product-page">
                                <i class="bi bi-box"></i> Products
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about">
                                <i class="bi bi-info-circle"></i> About Us
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">
                                <i class="bi bi-envelope"></i> Contact
                            </a>
                        </li>
                        <li class="nav-item">
                            <CartBadge />
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">
                                <i class="bi bi-box-arrow-in-right"></i> Login
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/sign-up">
                                <i class="bi bi-person-plus"></i> Register
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">
                            <i class="bi bi-box"></i> Products
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">
                            <i class="bi bi-info-circle"></i> About Us
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">
                            <i class="bi bi-envelope"></i> Contact
                        </a>
                    </li>
                    <li class="nav-item">
                        <CartBadge />
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">
                            <i class="bi bi-box-arrow-in-right"></i> Login
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/sign-up">
                            <i class="bi bi-person-plus"></i> Register
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import CartBadge from './CartBadge.vue'

export default {
    name: 'NavBar',
    components: {
        CartBadge
    }
}
</script>

<style scoped>
.nav-item {
    display: flex;
    align-items: center;
}

.sticky-navbar {
    position: sticky;
    top: 0;
    z-index: 1020;
}

.navbar {
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-right {
    gap: 1rem;
}

.nav-link {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #007bff;
}
</style>