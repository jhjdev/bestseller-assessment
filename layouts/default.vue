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

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>