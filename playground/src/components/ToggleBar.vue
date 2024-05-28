<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  items?: { label: string | number; value: string }[];
  activeItem?: string | number;
}>();

const width = computed(() => `${100 / (props.items?.length || 1)}%`);
const translateX = computed(() => {
  const activeIndex = props.items?.findIndex(item => item.value === props.activeItem) || 0;
  return `${activeIndex * 100}%`;
});
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-sm bg-secondary text-secondary-foreground">
    <div :style="{ width, transform: `translateX(${translateX})` }" class="absolute h-full rounded-sm p-1 transition-300">
      <div class="h-full rounded-sm bg-primary">
        {{ " " }}
      </div>
    </div>
    <div class="flex">
      <RouterLink v-for="item in props.items" :key="item.value" :to="item.value" class="z-1 flex flex-1 cursor-pointer items-center justify-center py-2.5 transition-300" :class="[activeItem === item.value ? 'text-primary-foreground font-bold' : '']">
        {{ item.label }}
      </RouterLink>
    </div>
  </div>
</template>
