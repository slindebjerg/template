<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  error?: string
  success?: boolean
  hint?: string
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  required: false,
  disabled: false,
  success: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="textarea-wrapper">
    <label 
      v-if="label" 
      class="textarea__label"
      :class="{ 'textarea__label--required': required }"
    >
      {{ label }}
    </label>
    
    <div class="textarea__container">
      <textarea
        :value="modelValue"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :maxlength="maxLength"
        :class="[
          'textarea',
          {
            'textarea--error': error,
            'textarea--success': success,
            'textarea--disabled': disabled
          }
        ]"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      
      <div 
        v-if="maxLength" 
        class="textarea__counter"
      >
        {{ modelValue.length }}/{{ maxLength }}
      </div>
    </div>

    <div v-if="error" class="textarea__message textarea__message--error">
      {{ error }}
    </div>
    <div v-else-if="hint" class="textarea__message">
      {{ hint }}
    </div>
  </div>
</template>

<style scoped>
.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.textarea__label {
  color: var(--color-neutral-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.textarea__label--required::after {
  content: '*';
  color: var(--color-accent-400);
  margin-left: var(--spacing-1);
}

.textarea__container {
  position: relative;
}

.textarea {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  color: var(--color-neutral-500);
  background-color: var(--color-neutral-100);
  transition: var(--transition-base);
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.textarea:hover:not(:disabled) {
  border-color: var(--color-neutral-400);
}

.textarea:focus {
  outline: none;
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.textarea--error {
  border-color: var(--color-accent-400);
}

.textarea--error:focus {
  box-shadow: 0 0 0 3px var(--color-accent-100);
}

.textarea--success {
  border-color: var(--color-success-400);
}

.textarea--success:focus {
  box-shadow: 0 0 0 3px var(--color-success-100);
}

.textarea--disabled {
  background-color: var(--color-neutral-200);
  cursor: not-allowed;
}

.textarea__counter {
  position: absolute;
  bottom: var(--spacing-2);
  right: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
}

.textarea__message {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
}

.textarea__message--error {
  color: var(--color-accent-400);
}
</style>
