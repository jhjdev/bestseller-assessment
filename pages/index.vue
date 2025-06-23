<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Discover the Latest Fashion Trends</h1>
          <p class="hero-subtitle">
            Shop our collection of premium clothing and accessories
          </p>
          <div class="hero-buttons">
            <NuxtLink to="/category/women" class="btn btn-primary"
              >Women's Collection</NuxtLink
            >
            <NuxtLink to="/category/men" class="btn btn-secondary"
              >Men's Collection</NuxtLink
            >
          </div>
        </div>
      </div>
    </section>

    <section class="featured-categories">
      <div class="container">
        <h2 class="section-title">Shop by Category</h2>
        <div class="category-grid">
          <NuxtLink
            v-for="category in mainCategories"
            :key="category.id"
            :to="`/category/${category.id}`"
            class="category-card"
          >
            <div class="category-name">
              {{ category?.name?.en || 'Unknown Category' }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="featured-products">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <div class="product-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Import computed
import { useProductStore } from '~/stores/product';

const productStore = useProductStore();

// Get main categories (level 1)
const mainCategories = computed(() => {
  const categories = productStore.getAllCategories() || [];
  return categories.filter((category) => category?.id && category?.level === 1);
});

// Get a selection of featured products (first 8 products)
const featuredProducts = computed(() => {
  return productStore.products?.slice(0, 8) || [];
});

// Set page metadata
useHead({
  title: 'Fashion Store - Home',
  meta: [
    {
      name: 'description',
      content:
        'Discover the latest fashion trends at Fashion Store. Shop our collection of premium clothing and accessories.',
    },
  ],
});
</script>

<!-- Home page now uses global CSS classes -->
<!-- All styles are moved to assets/css/pages/home.css -->
