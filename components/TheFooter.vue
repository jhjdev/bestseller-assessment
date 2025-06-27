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

<!-- Footer component now uses global CSS classes -->
<!-- All styles are moved to assets/css/components/footer.css -->
