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

const handleLogin = async (data: Record<string, any>) => {
  loading.value = true
  formError.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    await userStore.signIn(data.email, data.password)
    // Here you would typically make your authentication API call
  } catch (error) {
    formError.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <Card 
      title="Login" 
      subtitle="Welcome back!"
      elevated
    >
      <Form
        class="login__form"
        :loading="loading"
        submit-text="Login"
        @submit="handleLogin"
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
          placeholder="Enter your password"
          :error="formError"
        />

        <template #actions>
          <BaseButton
            type="submit"
            :loading="loading"
          >
            Login
          </BaseButton>
          <BaseButton
            variant="tertiary"
            :disabled="loading"
          >
            Forgot Password?
          </BaseButton>
        </template>
      </Form>
    </Card>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: var(--spacing-8) auto;
  padding: 0 var(--spacing-4);
}

.login__form {
  margin-top: var(--spacing-4);
}
</style>