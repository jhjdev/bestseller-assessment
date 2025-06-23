<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Fashion Store</h3>
          <p>Your one-stop destination for the latest fashion trends and styles.</p>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/category/men">Men</NuxtLink></li>
            <li><NuxtLink to="/category/women">Women</NuxtLink></li>
            <li><NuxtLink to="/category/kids">Kids</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Customer Service</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/privacy">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Connect With Us</h3>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Pinterest</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Fashion Store. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped>
.footer {
  background-color: var(--dark-color);
  color: white;
  padding: var(--spacing-xxl) 0 var(--spacing-lg);
  margin-top: var(--spacing-xxl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
}

.footer-title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: #ccc;
  transition: color var(--transition-normal);
}

.footer-links a:hover {
  color: white;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.social-link {
  color: #ccc;
  transition: color var(--transition-normal);
  margin-right: var(--spacing-md);
}

.social-link:hover {
  color: white;
}

.footer-bottom {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #999;
  font-size: var(--font-size-sm);
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>