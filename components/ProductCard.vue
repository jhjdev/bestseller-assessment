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

<!-- ProductCard component now uses global CSS classes -->
<!-- All styles are moved to assets/css/components/product-card.css -->
