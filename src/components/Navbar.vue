<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-navbar"> 
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Store</a>
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
                            <router-link class="nav-link" to="/cart" aria-label="My Cart">
                                <i class="bi bi-cart"></i> My Cart
                            </router-link>
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
                        <router-link class="nav-link" to="/cart" aria-label="My Cart">
                            <i class="bi bi-cart"></i> My Cart
                        </router-link>
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
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.sticky-navbar {
    position: sticky;
    top: 0;
    z-index: 1020;
}
</style>