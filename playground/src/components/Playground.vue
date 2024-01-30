<template>
  <div>
    <h2>{{ name }}</h2>
    <div class="w-full rounded-sm b-2 b-solid b-primary overflow-hidden">
      <div class="w-full bg-background p-3">
        <component :is="com" />
      </div>
      <div class="flex justify-end text-5 gap-1">
        <IconButton icon="i-lucide:github" title="Source" />
        <IconButton icon="i-lucide:code" title="Code" @click="showDemoSource = !showDemoSource" />
      </div>
      <div v-if="showDemoSource">
        <pre>{{ demoSource }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, ref, shallowRef, watchEffect } from "vue-demi";
import IconButton from "./IconButton.vue";

const props = defineProps<{
  name: string;
}>();

const showDemoSource = ref(false);

const components = import.meta.glob("../demos/*.vue");
const demoSources = import.meta.glob("../demos/*.vue", { as: "raw" });

const com = shallowRef<Component>();
const demoSource = ref<string>();

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
