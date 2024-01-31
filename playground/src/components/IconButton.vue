<template>
  <div role="button" class="cursor-pointer rounded-sm p-2 transition hover:bg-secondary" @click="onClick">
    <div class="text-4.5" :class="[icon]"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();

function onClick() {
  emit("click");
}
</script>
