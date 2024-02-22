<template>
  <div
    class="collapse grid overflow-hidden rounded-2 bg-gray-50 dark:bg-dark-800"
    :class="[collapsed ? 'p-b-0 grid-rows-[auto_0fr]' : 'p-b-5 grid-rows-[auto_1fr]']"
  >
    <div class="z-1 flex cursor-pointer justify-between p-5" @click="collapsed = !collapsed">
      <div>
        <slot name="summary">
          {{ title }}
          <span class="m-l-2 align-end text-3.5 text-neutral-400">{{ desc }}</span>
        </slot>
      </div>
      <div class="i-icon-park-outline:right text-5 transition" :class="[collapsed ? '' : 'rotate-90']"></div>
    </div>
    <div class="content p-x-5" :class="[collapsed ? 'opacity-0 min-h-0' : 'min-h-fit']">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title?: string;
  desc?: string;
}>();

const collapsed = ref(true);
</script>

<style scoped>
.collapse {
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-property: padding, grid-template-rows;
}

.content {
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-property: opacity;
}
</style>
