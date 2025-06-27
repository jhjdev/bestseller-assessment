<template>
  <div class="app-layout">
    <TheHeader />
    <div class="main-content">
      <ErrorBoundary>
        <Suspense>
          <template #default>
            <TheSidebar />
          </template>
          <template #fallback>
            <div class="sidebar loading-sidebar">
              <h2 class="sidebar-title">Categories</h2>
              <div class="loading">Loading categories...</div>
            </div>
          </template>
        </Suspense>
      </ErrorBoundary>

      <main class="content">
        <ErrorBoundary>
          <Suspense>
            <template #default>
              <slot />
            </template>
            <template #fallback>
              <div class="loading-page">
                <div class="loading-spinner"></div>
                <p>Loading content...</p>
              </div>
            </template>
          </Suspense>
        </ErrorBoundary>
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
