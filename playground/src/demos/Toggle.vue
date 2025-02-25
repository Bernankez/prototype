<script setup lang="ts">
import { isDark } from "@/shared/isDark";
import { Toggle } from "@bernankez/prototype";
import { ref } from "vue";

const value = ref(1);
</script>

<template>
  <div class="flex items-center gap-3">
    <Toggle disabled />
    <Toggle v-model="value" :true-value="1" :false-value="2" width="50px" height="30px" toggle-diameter="25px" toggle-wider="30px" :dark="isDark" />
    <Toggle v-model="value" :true-value="2" :false-value="1" switch-color-on="orange" switch-color-off="pink" width="50px" height="25px" toggle-diameter="30px" toggle-wider="33px" />
  </div>
</template>
