<script setup lang="ts">
interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  data: Record<string, any>[]
  loading?: boolean
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  emptyText?: string
}

withDefaults(defineProps<Props>(), {
  loading: false,
  emptyText: 'No data available'
})

const emit = defineEmits<{
  sort: [key: string]
}>()

const handleSort = (column: Column) => {
  if (column.sortable) {
    emit('sort', column.key)
  }
}
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'table__header',
              { 'table__header--sortable': column.sortable }
            ]"
            @click="handleSort(column)"
          >
            {{ column.label }}
            <span
              v-if="column.sortable"
              class="table__sort-icon"
              :class="{
                'table__sort-icon--active': sortKey === column.key,
                'table__sort-icon--desc': sortKey === column.key && sortOrder === 'desc'
              }"
            >
              ▲
            </span>
          </th>
        </tr>
      </thead>
      
      <tbody>
        <template v-if="loading">
          <tr>
            <td :colspan="columns.length" class="table__loading">
              Loading...
            </td>
          </tr>
        </template>
        
        <template v-else-if="data.length === 0">
          <tr>
            <td :colspan="columns.length" class="table__empty">
              {{ emptyText }}
            </td>
          </tr>
        </template>
        
        <template v-else>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="table__row"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="table__cell"
            >
              {{ row[column.key] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-base);
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: var(--color-neutral-100);
}

.table__header {
  padding: var(--spacing-3);
  background-color: var(--color-neutral-100);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-500);
  border-bottom: 2px solid var(--color-neutral-200);
  white-space: nowrap;
}

.table__header--sortable {
  cursor: pointer;
  user-select: none;
}

.table__header--sortable:hover {
  background-color: var(--color-neutral-200);
}

.table__sort-icon {
  display: inline-block;
  margin-left: var(--spacing-2);
  font-size: var(--font-size-sm);
  opacity: 0.3;
  transition: var(--transition-base);
}

.table__sort-icon--active {
  opacity: 1;
  color: var(--color-primary-400);
}

.table__sort-icon--desc {
  transform: rotate(180deg);
}

.table__cell {
  padding: var(--spacing-3);
  border-bottom: 1px solid var(--color-neutral-200);
  color: var(--color-neutral-500);
}

.table__row {
  transition: var(--transition-base);
}

.table__row:hover {
  background-color: var(--color-neutral-100);
}

.table__row:last-child .table__cell {
  border-bottom: none;
}

.table__loading,
.table__empty {
  padding: var(--spacing-8);
  text-align: center;
  color: var(--color-neutral-400);
}
</style>
