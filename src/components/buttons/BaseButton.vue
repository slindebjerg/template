<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--loading': loading }
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="base-button__spinner" />
    <span :class="{ 'base-button__content--loading': loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-base);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
  cursor: pointer;
  border: 1px solid transparent;
}

/* Variants */
.base-button--primary {
  background-color: var(--color-primary-400);
  color: var(--color-neutral-100);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-500);
}

.base-button--secondary {
  background-color: var(--color-neutral-100);
  border-color: var(--color-primary-400);
  color: var(--color-primary-400);
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-primary-100);
}

.base-button--tertiary {
  background-color: transparent;
  color: var(--color-primary-400);
}

.base-button--tertiary:hover:not(:disabled) {
  background-color: var(--color-primary-100);
}

.base-button--danger {
  background-color: var(--color-accent-400);
  color: var(--color-neutral-100);
}

.base-button--danger:hover:not(:disabled) {
  background-color: var(--color-accent-500);
}

/* Sizes */
.base-button--small {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
}

.base-button--medium {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}

.base-button--large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
}

/* States */
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button--loading {
  cursor: wait;
}

.base-button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

.base-button__content--loading {
  opacity: 0.7;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 