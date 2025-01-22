<script setup lang="ts">
import { ref } from 'vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import BaseButton from '../components/buttons/BaseButton.vue'

const activeTab = ref<'login' | 'signup'>('login')
</script>

<template>
  <div class="home">
    <div class="home__auth">
      <div class="home__tabs">
        <BaseButton
          :variant="activeTab === 'login' ? 'primary' : 'tertiary'"
          @click="activeTab = 'login'"
        >
          Login
        </BaseButton>
        <BaseButton
          :variant="activeTab === 'signup' ? 'primary' : 'tertiary'"
          @click="activeTab = 'signup'"
        >
          Sign Up
        </BaseButton>
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <Login
          v-if="activeTab === 'login'"
          key="login"
        />
        <Signup
          v-else
          key="signup"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8) var(--spacing-4);
  background-color: var(--color-neutral-100);
}

.home__auth {
  width: 100%;
  max-width: 400px;
}

.home__tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>