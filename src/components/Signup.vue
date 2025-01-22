<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import Form from './Form.vue'
import TextInput from './TextInput.vue'
import BaseButton from './buttons/BaseButton.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const email = ref('')
const password = ref('')
const formError = ref('')
const loading = ref(false)

const handleSignup = async (data: Record<string, any>) => {
  loading.value = true
  formError.value = ''

  try {
    await userStore.signUp(data.email, data.password)
  } catch (error) {
    formError.value = 'Failed to create account'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="signup">
    <Card 
      title="Create Account" 
      subtitle="Join us today!"
      elevated
    >
      <Form
        class="signup__form"
        :loading="loading"
        submit-text="Sign Up"
        @submit="handleSignup"
      >
        <TextInput
          v-model="email"
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
          :error="formError"
        />

        <TextInput
          v-model="password"
          label="Password"
          type="password"
          required
          placeholder="Choose a password"
          :error="formError"
        />

        <template #actions>
          <BaseButton
            type="submit"
            :loading="loading"
          >
            Create Account
          </BaseButton>
        </template>
      </Form>
    </Card>
  </div>
</template>

<style scoped>
.signup {
  max-width: 400px;
  margin: var(--spacing-8) auto;
  padding: 0 var(--spacing-4);
}

.signup__form {
  margin-top: var(--spacing-4);
}
</style>