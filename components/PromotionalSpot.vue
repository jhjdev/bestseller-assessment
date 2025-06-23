<template>
  <div :class="['promotional-spot', `promo-${spot.type}`]">
    <a :href="spot.link" class="promo-link">
      <img 
        :src="spot.image.imageUrl" 
        :alt="spot.imageAltText || spot.image.alt" 
        class="promo-image"
        loading="lazy"
      >
    </a>
  </div>
</template>

<script setup lang="ts">
import type { PromotionalSpot } from '~/types';

defineProps<{
  spot: PromotionalSpot;
}>();
</script>

<style scoped>
.promotional-spot {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.promotional-spot:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.promo-link {
  display: block;
  height: 100%;
}

.promo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.promotional-spot:hover .promo-image {
  transform: scale(1.05);
}
</style>