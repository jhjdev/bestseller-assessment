<template>
  <div v-if="error" class="error-boundary">
    <div class="error-content">
      <h2>Something went wrong</h2>
      <p>{{ error.message || 'An unexpected error occurred' }}</p>
      <button @click="retry" class="retry-button">Try Again</button>
      <details v-if="isDev" class="error-details">
        <summary>Error Details (Development Mode)</summary>
        <pre>{{ error.stack }}</pre>
      </details>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, nextTick, onErrorCaptured } from 'vue';

interface Props {
  fallback?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  fallback: true,
});

const error = ref<Error | null>(null);
const retryCount = ref(0);
const isDev = process.env.NODE_ENV === 'development';

const handleError = (err: Error) => {
  console.error('ErrorBoundary caught error:', err);
  error.value = err;
};

const retry = () => {
  error.value = null;
  retryCount.value++;
  // Force component re-render
  nextTick(() => {
    // This will cause the slot content to re-render
  });
};

// Set up error handling
onErrorCaptured((err) => {
  handleError(err);
  return false; // Prevent error from bubbling up
});
</script>

<style scoped>
.error-boundary {
  padding: 2rem;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-content h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.error-content p {
  color: #7f1d1d;
  margin-bottom: 1.5rem;
}

.retry-button {
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.retry-button:hover {
  background-color: #b91c1c;
}

.error-details {
  margin-top: 1rem;
  text-align: left;
}

.error-details pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
}
</style>
