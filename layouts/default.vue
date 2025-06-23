<template>
  <div class="app-layout">
    <TheHeader />
    <div class="main-content">
      <TheSidebar />
      <main class="content">
        <slot />
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Layout components are imported automatically
</script>

<!-- Layout now uses global CSS classes -->
<!-- All styles are moved to assets/css/layout.css -->
