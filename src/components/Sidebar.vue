<script setup lang="ts">
interface NavItem {
  id: string | number
  label: string
  icon?: string
  href?: string
  children?: NavItem[]
}

interface Props {
  items: NavItem[]
  modelValue?: string | number
  collapsed?: boolean
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  width: '240px'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isActive = (item: NavItem) => {
  return props.modelValue === item.id
}

const handleClick = (item: NavItem) => {
  emit('update:modelValue', item.id)
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--collapsed': collapsed }"
    :style="{ width: collapsed ? '64px' : width }"
  >
    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <li
          v-for="item in items"
          :key="item.id"
          class="sidebar__item"
        >
          <a
            :href="item.href"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': isActive(item) }"
            @click.prevent="handleClick(item)"
          >
            <span v-if="item.icon" class="sidebar__icon">
              {{ item.icon }}
            </span>
            <span
              v-if="!collapsed"
              class="sidebar__label"
            >
              {{ item.label }}
            </span>
          </a>
          
          <template v-if="item.children && !collapsed">
            <ul class="sidebar__children">
              <li
                v-for="child in item.children"
                :key="child.id"
                class="sidebar__child"
              >
                <a
                  :href="child.href"
                  class="sidebar__child-link"
                  :class="{ 'sidebar__child-link--active': isActive(child) }"
                  @click.prevent="handleClick(child)"
                >
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  height: 100%;
  background-color: white;
  border-right: 1px solid var(--color-neutral-200);
  transition: width var(--transition-base);
}

.sidebar__nav {
  position: sticky;
  top: 0;
  height: 100%;
  overflow-y: auto;
}

.sidebar__list {
  list-style: none;
  padding: var(--spacing-2) 0;
  margin: 0;
}

.sidebar__item {
  margin-bottom: var(--spacing-1);
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-neutral-500);
  text-decoration: none;
  transition: var(--transition-base);
}

.sidebar__link:hover {
  background-color: var(--color-neutral-100);
  color: var(--color-primary-400);
  text-decoration: none;
}

.sidebar__link--active {
  background-color: var(--color-primary-100);
  color: var(--color-primary-400);
  font-weight: var(--font-weight-medium);
}

.sidebar__icon {
  flex-shrink: 0;
  font-size: var(--font-size-lg);
}

.sidebar__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar__children {
  list-style: none;
  padding-left: var(--spacing-8);
  margin: var(--spacing-1) 0;
}

.sidebar__child {
  margin-bottom: var(--spacing-1);
}

.sidebar__child-link {
  display: block;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-neutral-400);
  text-decoration: none;
  transition: var(--transition-base);
  font-size: var(--font-size-sm);
}

.sidebar__child-link:hover {
  color: var(--color-primary-400);
  text-decoration: none;
}

.sidebar__child-link--active {
  color: var(--color-primary-400);
  font-weight: var(--font-weight-medium);
}

/* Collapsed state */
.sidebar--collapsed .sidebar__link {
  justify-content: center;
  padding: var(--spacing-2);
}

.sidebar--collapsed .sidebar__icon {
  margin: 0;
}
</style>
