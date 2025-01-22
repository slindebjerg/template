<script setup lang="ts">
import Card from '../components/Card.vue'
import TextInput from '../components/TextInput.vue'
import TextArea from '../components/TextArea.vue'
import BaseButton from '../components/buttons/BaseButton.vue'
import Modal from '../components/Modal.vue'
import Tooltip from '../components/Tooltip.vue'
import { ref } from 'vue'

const showContactModal = ref(false)
const email = ref('')
const message = ref('')
const formError = ref('')

const handleContact = () => {
  if (!email.value || !message.value) {
    formError.value = 'Please fill in all fields'
    return
  }
  // Handle form submission here
  showContactModal.value = false
  email.value = ''
  message.value = ''
  formError.value = ''
}

const teamMembers = [
  {
    name: 'Jane Smith',
    role: 'Lead Developer',
    joinDate: '2022-01-15',
    contributions: '156'
  },
  {
    name: 'John Doe',
    role: 'UI/UX Designer',
    joinDate: '2022-03-01',
    contributions: '89'
  },
  {
    name: 'Alice Johnson',
    role: 'Product Manager',
    joinDate: '2022-02-10',
    contributions: '134'
  }
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'joinDate', label: 'Join Date', sortable: true },
  { key: 'contributions', label: 'Contributions', sortable: true }
]
</script>

<template>
  <div class="about">
    <h1>About Our Project</h1>
    
    <div class="about__grid">
      <Card 
        title="Our Mission" 
        subtitle="Building Better Solutions"
        elevated
      >
        <p>We are dedicated to creating innovative solutions that help businesses 
        and individuals achieve their goals through cutting-edge technology and 
        thoughtful design.</p>
        
        <Tooltip text="Click to learn more about our mission">
          <BaseButton 
            variant="secondary"
            size="small"
          >
            Learn More
          </BaseButton>
        </Tooltip>
      </Card>

      <Card 
        title="Get in Touch"
        hoverable
        @click="showContactModal = true"
      >
        <p>Have questions or want to collaborate? We'd love to hear from you! 
        Click anywhere on this card to open the contact form.</p>
      </Card>
    </div>

    <div class="about__team">
      <h2>Our Team</h2>
      <Table 
        :columns="columns"
        :data="teamMembers"
      />
    </div>

    <Modal
      v-model="showContactModal"
      title="Contact Us"
      confirm-text="Send Message"
    >
      <form @submit.prevent="handleContact">
        <TextInput
          v-model="email"
          label="Email"
          type="email"
          required
          :error="formError"
          placeholder="your@email.com"
        />
        
        <TextArea
          v-model="message"
          label="Message"
          required
          :error="formError"
          placeholder="How can we help you?"
          rows="4"
        />
      </form>
    </Modal>
  </div>
</template>

<style scoped>
.about {
  padding: var(--spacing-8);
  max-width: 1200px;
  margin: 0 auto;
}

.about h1 {
  margin-bottom: var(--spacing-8);
  color: var(--color-primary-400);
}

.about__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

.about__team {
  margin-top: var(--spacing-8);
}

.about__team h2 {
  margin-bottom: var(--spacing-4);
  color: var(--color-primary-400);
}
</style>
