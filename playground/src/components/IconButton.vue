<template>
  <div role="button" class="p-2 hover:bg-secondary transition rounded-sm cursor-pointer" @click="onClick">
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
