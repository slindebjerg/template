<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  text: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top'
})

const tooltipRef = ref<HTMLElement | null>(null)
const showTooltip = ref(false)

const updatePosition = (event: MouseEvent) => {
  if (!tooltipRef.value) return
  
  const target = event.target as HTMLElement
  const targetRect = target.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  
  const positions = {
    top: {
      x: targetRect.left + (targetRect.width - tooltipRect.width) / 2,
      y: targetRect.top - tooltipRect.height - 8
    },
    right: {
      x: targetRect.right + 8,
      y: targetRect.top + (targetRect.height - tooltipRect.height) / 2
    },
    bottom: {
      x: targetRect.left + (targetRect.width - tooltipRect.width) / 2,
      y: targetRect.bottom + 8
    },
    left: {
      x: targetRect.left - tooltipRect.width - 8,
      y: targetRect.top + (targetRect.height - tooltipRect.height) / 2
    }
  }

  const { x, y } = positions[props.position]
  
  tooltipRef.value.style.left = `${x}px`
  tooltipRef.value.style.top = `${y}px`
}

const handleMouseEnter = (event: MouseEvent) => {
  showTooltip.value = true
  nextTick(() => updatePosition(event))
}

const handleMouseLeave = () => {
  showTooltip.value = false
}
</script>

<template>
  <div class="tooltip-wrapper">
    <div
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
    <Teleport to="body">
      <div
        v-if="showTooltip"
        ref="tooltipRef"
        :class="['tooltip', `tooltip--${position}`]"
        role="tooltip"
      >
        {{ text }}
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
  position: relative;
}

.tooltip {
  position: fixed;
  z-index: var(--z-popover);
  padding: var(--spacing-2) var(--spacing-3);
  background-color: var(--color-neutral-500);
  color: var(--color-neutral-100);
  border-radius: var(--radius-base);
  font-size: var(--font-size-sm);
  pointer-events: none;
  max-width: 300px;
  box-shadow: var(--shadow-lg);
}

.tooltip::after {
  content: '';
  position: absolute;
  border: 6px solid transparent;
}

.tooltip--top::after {
  border-top-color: var(--color-neutral-500);
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip--right::after {
  border-right-color: var(--color-neutral-500);
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
}

.tooltip--bottom::after {
  border-bottom-color: var(--color-neutral-500);
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip--left::after {
  border-left-color: var(--color-neutral-500);
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
