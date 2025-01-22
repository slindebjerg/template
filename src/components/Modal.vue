<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import BaseButton from './buttons/BaseButton.vue'

interface Props {
  modelValue: boolean
  title: string
  variant?: 'default' | 'alert'
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showCancel: true,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  width: '500px'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    emit('update:modelValue', false)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="emit('update:modelValue', false)">
        <div class="modal" :style="{ width }" @click.stop>
          <div class="modal__header">
            <h3 class="modal__title">{{ title }}</h3>
            <button class="modal__close" @click="emit('update:modelValue', false)">×</button>
          </div>
          
          <div class="modal__content">
            <slot />
          </div>
          
          <div class="modal__footer">
            <BaseButton
              v-if="showCancel"
              variant="secondary"
              @click="emit('cancel'); emit('update:modelValue', false)"
            >
              {{ cancelText }}
            </BaseButton>
            <BaseButton
              :variant="variant === 'alert' ? 'danger' : 'primary'"
              @click="emit('confirm'); emit('update:modelValue', false)"
            >
              {{ confirmText }}
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
}

.modal {
  background-color: var(--color-neutral-100);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal__header {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__title {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-neutral-500);
}

.modal__close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  color: var(--color-neutral-400);
  padding: var(--spacing-2);
}

.modal__content {
  padding: var(--spacing-4);
  overflow-y: auto;
}

.modal__footer {
  padding: var(--spacing-4);
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
