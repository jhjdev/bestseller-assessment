<template>
  <div class="product-card">
    <NuxtLink :to="`/product/${product.id}`" class="product-link">
      <div class="product-image">
        <img :src="mainImage" :alt="productName" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-brand">{{ product.brand }}</h3>
        <p class="product-name">{{ productName }}</p>
        <div class="product-price">{{ formatPrice(product.price) }}</div>
        <div class="product-colors" v-if="hasVariants">
          <span class="color-label">Colors:</span>
          <span class="color-count">{{ colorCount }} options</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useImagePlaceholder } from '~/composables/useImagePlaceholder';

const props = defineProps<{
  product: Product;
}>();

const { placeholderImage } = useImagePlaceholder();

const mainImage = computed(() => {
  return props.product.images && props.product.images.length > 0 
    ? props.product.images[0] 
    : placeholderImage;
});

const productName = computed(() => {
  return props.product.name.en || props.product.name.dk || 'Product';
});

const hasVariants = computed(() => {
  return props.product.variant && props.product.variant.length > 0;
});

const colorCount = computed(() => {
  if (!props.product.variant) return 1;
  
  // Count unique colors including the main product color
  const colors = new Set([props.product.color]);
  
  props.product.variant.forEach(variant => {
    if (variant.color) {
      colors.add(variant.color);
    }
  });
  
  return colors.size;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 2
  }).format(price);
};
</script>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-link {
  display: block;
}

.product-image {
  position: relative;
  padding-top: 125%; /* 4:5 aspect ratio */
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
}

.product-brand {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.product-name {
  font-size: 0.85rem;
  color: var(--secondary-color);
  margin-bottom: 10px;
  height: 2.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: 5px;
}

.product-colors {
  font-size: 0.8rem;
  color: var(--secondary-color);
  display: flex;
  justify-content: space-between;
}
</style>