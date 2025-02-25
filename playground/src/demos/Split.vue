<script setup lang="ts">
import { Split } from "@bernankez/prototype";
</script>

<template>
  <div class="h-100 w-full b-1 b-border b-solid">
    <Split class="h-full w-full">
      <template #1>
        <div class="h-full w-full bg-yellow-1">
          Area1
        </div>
      </template>
      <template #2>
        <div class="h-full w-full bg-blue-1">
          Area2
        </div>
      </template>
    </Split>
  </div>
  <div class="mt-sm h-100 w-full b-1 b-border b-solid">
    <Split direction="vertical" :resize-trigger-size="1" :resize-trigger-dragging-size="8" class="h-full w-full">
      <template #1>
        <div class="h-full w-full bg-yellow-1">
          Area1
        </div>
      </template>
      <template #resize-trigger>
        <div class="h-px w-full bg-muted-foreground"></div>
      </template>
      <template #2>
        <div class="h-full w-full bg-blue-1">
          Area2
        </div>
      </template>
    </Split>
  </div>
</template>
