<template>
  <div>
    <h2 class="text-7 font-bold">
      {{ name }}
    </h2>
    <div class="w-full overflow-hidden b-1 b-secondary rounded-sm b-solid">
      <div class="w-full bg-background p-3">
        <component :is="com" />
      </div>
      <div class="flex justify-end gap-1 p-2 text-5">
        <a :href="`https://github.com/Bernankez/prototype/blob/master/src/components/${name}.vue`" target="_blank">
          <IconButton icon="i-lucide:github" title="Source" />
        </a>
        <IconButton icon="i-lucide:code" title="Code" @click="showDemoSource = !showDemoSource" />
      </div>
      <div v-if="showDemoSource" class="group relative flex b-0 b-t-1 b-secondary b-solid bg-content text-3.5">
        <div class="box-border overflow-auto p-3">
          <div class="highlighter w-full" v-html="innerHTML"></div>
        </div>
        <div class="absolute right-3 top-3 opacity-100 transition group-hover:opacity-0">
          vue
        </div>
        <IconButton class="absolute right-3 top-3 bg-opacity-70 opacity-0 backdrop-blur-8 backdrop-saturate-50 transition group-hover:opacity-100" title="Copy" :icon="icon" @click="() => { copy(); icon = 'i-lucide:check' }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, ref, shallowRef, watchEffect } from "vue";
import { refAutoReset, useClipboard } from "@vueuse/core";
import IconButton from "./IconButton.vue";
import { useHighlighter } from "@/composables/useHighlighter";

const props = defineProps<{
  name: string;
}>();

const showDemoSource = ref(false);

const components = import.meta.glob("../demos/*.vue");
const demoSources = import.meta.glob("../demos/*.vue", { as: "raw" });

const com = shallowRef<Component>();
const demoSource = ref("");

const { codeToHtml } = useHighlighter();
const innerHTML = codeToHtml(demoSource, "vue");

const icon = refAutoReset("i-lucide:clipboard-copy", 1500);
const { copy } = useClipboard({ source: demoSource, legacy: true });

async function loadComponent() {
  if (components[`../demos/${props.name}.vue`]) {
    const { default: demo } = await components[`../demos/${props.name}.vue`]() as { default: Component };
    com.value = demo;
  }
}
async function loadDemoSource() {
  if (demoSources[`../demos/${props.name}.vue`]) {
    demoSource.value = await demoSources[`../demos/${props.name}.vue`]() as string;
  }
}
watchEffect(() => {
  if (props.name) {
    loadComponent();
    loadDemoSource();
  }
});
</script>

<style scoped>
:deep(.highlighter pre) {
  background-color: transparent !important;
}
</style>
