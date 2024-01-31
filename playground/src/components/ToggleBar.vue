<template>
  <div class="relative w-full bg-secondary text-secondary-foreground rounded-sm overflow-hidden">
    <div :style="{ width, transform: `translateX(${translateX})` }" class="p-1 absolute h-full rounded-sm transition-300">
      <div class="bg-primary h-full rounded-sm">
        {{ " " }}
      </div>
    </div>
    <div class="flex">
      <div v-for="item in props.items" :key="item.value" class="z-1 flex justify-center items-center flex-1 py-2.5 cursor-pointer transition-300" :class="[activeItem === item.value ? 'text-primary-foreground font-bold' : '']" @click="onItem(item)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  items?: { label: string | number; value: string | number }[];
  activeItem?: string | number;
}>();

const emit = defineEmits<{
  "update:activeItem": [value: string | number];
}>();

const width = computed(() => `${100 / (props.items?.length || 1)}%`);
const translateX = computed(() => {
  const activeIndex = props.items?.findIndex(item => item.value === props.activeItem) || 0;
  return `${activeIndex * 100}%`;
});

function onItem(item: { label: string | number; value: string | number }) {
  emit("update:activeItem", item.value);
}
</script>
