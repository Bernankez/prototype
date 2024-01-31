<template>
  <div class="flex items-center gap-3">
    <Bubble class="p-5">
      <div class="i-lucide:line-chart text-6"></div>
    </Bubble>
    <Bubble class="p-4">
      🫧
    </Bubble>
    <Bubble class="p-3" :animation-duration="4" shadow="red" shadow-inset="green">
      ^_^
    </Bubble>
  </div>
</template>

<script setup lang="ts">
import { Bubble } from "@bernankez/prototype";
</script>
