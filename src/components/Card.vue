<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  elevated?: boolean
  hoverable?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  elevated: false,
  hoverable: false,
  loading: false
})
</script>

<template>
  <div
    class="card"
    :class="{
      'card--elevated': elevated,
      'card--hoverable': hoverable,
      'card--loading': loading
    }"
  >
    <div v-if="loading" class="card__loading">
      <div class="card__loading-spinner" />
    </div>
    
    <div v-else>
      <div v-if="title || subtitle" class="card__header">
        <h3 v-if="title" class="card__title">{{ title }}</h3>
        <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="card__content">
        <slot />
      </div>
      
      <div v-if="$slots.footer" class="card__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-neutral-200);
  overflow: hidden;
  position: relative;
}

.card--elevated {
  box-shadow: var(--shadow-md);
}

.card--hoverable {
  transition: var(--transition-base);
}

.card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.card__header {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-neutral-200);
}

.card__title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-500);
}

.card__subtitle {
  margin: var(--spacing-1) 0 0;
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
}

.card__content {
  padding: var(--spacing-4);
}

.card__footer {
  padding: var(--spacing-4);
  border-top: 1px solid var(--color-neutral-200);
  background-color: var(--color-neutral-100);
}

.card--loading {
  pointer-events: none;
}

.card__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.card__loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--color-neutral-200);
  border-top-color: var(--color-primary-400);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
