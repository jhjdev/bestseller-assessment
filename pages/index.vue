<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Discover the Latest Fashion Trends</h1>
          <p class="hero-subtitle">Shop our collection of premium clothing and accessories</p>
          <div class="hero-buttons">
            <NuxtLink to="/category/women" class="btn btn-primary">Women's Collection</NuxtLink>
            <NuxtLink to="/category/men" class="btn btn-secondary">Men's Collection</NuxtLink>
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
            <div class="category-name">{{ category?.name?.en || 'Unknown Category' }}</div>
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
import { useProductStore } from '~/stores/product';

const productStore = useProductStore();

// Get main categories (level 1)
const mainCategories = computed(() => {
  const categories = productStore.getAllCategories() || [];
  return categories.filter(category => category?.id && category?.level === 1);
});

// Get a selection of featured products (first 8 products)
const featuredProducts = computed(() => {
  return productStore.products?.slice(0, 8) || [];
});

// Set page metadata
useHead({
  title: 'Fashion Store - Home',
  meta: [
    { name: 'description', content: 'Discover the latest fashion trends at Fashion Store. Shop our collection of premium clothing and accessories.' }
  ]
});
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 0;
  text-align: center;
  margin-bottom: 40px;
  background-color: #333; /* Fallback color */
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.category-card {
  position: relative;
  height: 150px;
  background-color: var(--primary-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.featured-products {
  margin-bottom: 40px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
