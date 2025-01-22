<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  required?: boolean
  disabled?: boolean
  error?: string
  success?: boolean
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  success: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="input-wrapper">
    <label 
      v-if="label" 
      class="input__label" 
      :class="{ 'input__label--required': required }"
    >
      {{ label }}
    </label>
    
    <div class="input__container">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'input',
          {
            'input--error': error,
            'input--success': success,
            'input--disabled': disabled
          }
        ]"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>

    <div v-if="error" class="input__message input__message--error">
      {{ error }}
    </div>
    <div v-else-if="hint" class="input__message">
      {{ hint }}
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.input__label {
  color: var(--color-neutral-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.input__label--required::after {
  content: '*';
  color: var(--color-accent-400);
  margin-left: var(--spacing-1);
}

.input__container {
  position: relative;
}

.input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  color: var(--color-neutral-500);
  background-color: var(--color-neutral-100);
  transition: var(--transition-base);
}

.input:hover:not(:disabled) {
  border-color: var(--color-neutral-400);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input--error {
  border-color: var(--color-accent-400);
}

.input--error:focus {
  box-shadow: 0 0 0 3px var(--color-accent-100);
}

.input--success {
  border-color: var(--color-success-400);
}

.input--success:focus {
  box-shadow: 0 0 0 3px var(--color-success-100);
}

.input--disabled {
  background-color: var(--color-neutral-200);
  cursor: not-allowed;
}

.input__message {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
}

.input__message--error {
  color: var(--color-accent-400);
}
</style>
