<template>
  <div :class="['promotional-spot', `promo-${spot.type}`]">
    <a :href="spot.link" class="promo-link">
      <img
        :src="spot.image.imageUrl"
        :alt="spot.imageAltText || spot.image.alt"
        class="promo-image"
        loading="lazy"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import type { PromotionalSpot } from '~/types';

defineProps<{
  spot: PromotionalSpot;
}>();
</script>

<!-- PromotionalSpot component now uses global CSS classes -->
<!-- All styles are moved to assets/css/components/promotional-spot.css -->
