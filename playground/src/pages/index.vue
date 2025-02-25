<script setup lang="ts">
import { useMarkdownIt } from "@/composables/useMarkdownIt";
import Readme from "../../../README.md?raw";

const { codeToHtml } = useMarkdownIt();
const innerHTML = codeToHtml(Readme);
</script>

<template>
  <div class="text-base prose xl:text-base" v-html="innerHTML">
  </div>
</template>

<style scoped>
:global(.prose pre) {
  background-color: var(--content) !important;
}

:global(.prose) {
  max-width: unset;
}
</style>
