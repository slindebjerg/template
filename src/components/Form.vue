<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './buttons/BaseButton.vue'

interface Props {
  loading?: boolean
  submitText?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  submitText: 'Submit'
})

const emit = defineEmits<{
  submit: [formData: Record<string, any>]
}>()

const form = ref<HTMLFormElement | null>(null)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!form.value) return

  const formData = new FormData(form.value)
  const data: Record<string, any> = {}
  
  formData.forEach((value, key) => {
    data[key] = value
  })
  
  emit('submit', data)
}
</script>

<template>
  <form
    ref="form"
    class="form"
    @submit="handleSubmit"
  >
    <div class="form__fields">
      <slot />
    </div>
    
    <div class="form__actions">
      <slot name="actions">
        <BaseButton
          type="submit"
          :loading="loading"
        >
          {{ submitText }}
        </BaseButton>
      </slot>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.form__fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-neutral-200);
}
</style>
