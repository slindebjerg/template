<script setup lang="ts">
import Card from '../components/Card.vue'
import TextInput from '../components/TextInput.vue'
import TextArea from '../components/TextArea.vue'
import BaseButton from '../components/buttons/BaseButton.vue'
import Modal from '../components/Modal.vue'
import Table from '../components/Table.vue'
import Tooltip from '../components/Tooltip.vue'
import Form from '../components/Form.vue'
import { ref } from 'vue'

// Form state
const username = ref('')
const email = ref('')
const message = ref('')
const formLoading = ref(false)

// Modal state
const showModal = ref(false)

// Table data
const tableData = [
  { id: 1, name: 'Component A', status: 'Active', usage: '85%' },
  { id: 2, name: 'Component B', status: 'Inactive', usage: '45%' },
  { id: 3, name: 'Component C', status: 'Active', usage: '92%' }
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'usage', label: 'Usage', sortable: true }
]

const handleSubmit = (data: Record<string, any>) => {
  formLoading.value = true
  setTimeout(() => {
    formLoading.value = false
    console.log('Form submitted:', data)
  }, 1500)
}
</script>

<template>
  <div class="example">
    <h1>Component Examples</h1>

    <section class="example__section">
      <h2>Cards</h2>
      <div class="example__grid">
        <Card title="Basic Card">
          <p>This is a basic card component.</p>
        </Card>

        <Card 
          title="Elevated Card" 
          subtitle="With subtitle"
          elevated
        >
          <p>This card has elevation and a subtitle.</p>
        </Card>

        <Card 
          title="Hoverable Card"
          hoverable
        >
          <p>This card has a hover effect.</p>
        </Card>

        <Card 
          title="Loading Card"
          loading
        >
          <p>This content is loading...</p>
        </Card>
      </div>
    </section>

    <section class="example__section">
      <h2>Buttons</h2>
      <div class="example__buttons">
        <BaseButton>Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="tertiary">Tertiary</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
        <BaseButton loading>Loading</BaseButton>
        <BaseButton disabled>Disabled</BaseButton>
      </div>

      <div class="example__buttons">
        <BaseButton size="small">Small</BaseButton>
        <BaseButton>Medium</BaseButton>
        <BaseButton size="large">Large</BaseButton>
      </div>
    </section>

    <section class="example__section">
      <h2>Form Elements</h2>
      <Form 
        class="example__form"
        :loading="formLoading"
        @submit="handleSubmit"
      >
        <TextInput
          v-model="username"
          label="Username"
          required
          placeholder="Enter username"
        />

        <TextInput
          v-model="email"
          type="email"
          label="Email"
          placeholder="Enter email"
          error="Please enter a valid email"
        />

        <TextInput
          label="Success Input"
          modelValue="john@example.com"
          success
        />

        <TextArea
          v-model="message"
          label="Message"
          placeholder="Enter your message"
          :rows="4"
        />
      </Form>
    </section>

    <section class="example__section">
      <h2>Table</h2>
      <Table
        :columns="columns"
        :data="tableData"
      />
    </section>

    <section class="example__section">
      <h2>Tooltips</h2>
      <div class="example__tooltips">
        <Tooltip text="Top tooltip">
          <BaseButton variant="secondary">Hover me (Top)</BaseButton>
        </Tooltip>

        <Tooltip text="Right tooltip" position="right">
          <BaseButton variant="secondary">Hover me (Right)</BaseButton>
        </Tooltip>

        <Tooltip text="Bottom tooltip" position="bottom">
          <BaseButton variant="secondary">Hover me (Bottom)</BaseButton>
        </Tooltip>

        <Tooltip text="Left tooltip" position="left">
          <BaseButton variant="secondary">Hover me (Left)</BaseButton>
        </Tooltip>
      </div>
    </section>

    <section class="example__section">
      <h2>Modal</h2>
      <BaseButton @click="showModal = true">Open Modal</BaseButton>

      <Modal
        v-model="showModal"
        title="Example Modal"
      >
        <p>This is an example modal with customizable content.</p>
        <p>You can close it by clicking the X, the overlay, or pressing ESC.</p>
      </Modal>
    </section>
  </div>
</template>

<style scoped>
.example {
  padding: var(--spacing-8);
  max-width: 1200px;
  margin: 0 auto;
}

.example__section {
  margin-bottom: var(--spacing-12);
}

.example__section h2 {
  margin-bottom: var(--spacing-6);
  color: var(--color-primary-400);
}

.example__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
}

.example__buttons {
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  flex-wrap: wrap;
}

.example__form {
  max-width: 500px;
}

.example__tooltips {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}
</style>
