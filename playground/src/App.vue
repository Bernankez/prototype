<template>
  <div class="flex px-6">
    <div class="mx-auto max-w-230 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-10 font-bold font-italic">
          Prototype
        </h1>
        <div class="flex items-center">
          <a href="https://github.com/Bernankez/prototype/releases" target="_blank" class="cursor-pointer p-2 font-semibold">
            v{{ version }}
          </a>
          <a href="https://keke.cc/" target="_blank">
            <IconButton icon="i-lucide:home" title="Homepage" />
          </a>
          <a href="https://github.com/Bernankez/prototype" target="_blank">
            <IconButton icon="i-lucide:github" title="GitHub" />
          </a>
          <IconButton :icon="isDark ? 'i-lucide:moon-star' : 'i-lucide:sun'" title="Toggle theme" @click="toggle" />
        </div>
      </div>
      <div class="flex">
        <ToggleBar v-model:active-item="activeItem" :items="items" />
      </div>
      <div class="mt-2 pb-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useToggle } from "@vueuse/core";
import { ref, watch } from "vue";
import { version } from "../../package.json";
import IconButton from "./components/IconButton.vue";
import ToggleBar from "./components/ToggleBar.vue";
import { isDark } from "@/shared/isDark";

const toggle = useToggle(isDark);

const items = ref([
  { label: "Guide", value: "/" },
  { label: "Demo", value: "/demo" },
]);

const router = useRouter();
const activeItem = ref(location.pathname);
watch(activeItem, (value) => {
  router.push(value);
});
watch(() => router.currentRoute.value.path, (value) => {
  activeItem.value = value;
});
</script>
