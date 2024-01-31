<template>
  <div class="flex px-6">
    <div class="max-w-230 mx-auto w-full">
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-10 font-italic">
          Prototype
        </h1>
        <div class="flex items-center">
          <a href="https://github.com/Bernankez/prototype/releases" target="_blank" class="cursor-pointer p-2 font-semibold">
            v{{ version }}
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
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useToggle } from "@vueuse/core";
import { computed, ref } from "vue";
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
const activeItem = computed({
  get: () => router.currentRoute.value.path,
  set: value => router.push(value),
});
</script>
