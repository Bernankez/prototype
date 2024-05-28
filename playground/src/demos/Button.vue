<script setup lang="ts">
import { Button } from "@bernankez/prototype";
import { ref } from "vue";

const active = ref(false);
</script>

<template>
  <div class="flex items-center gap-3">
    <Button>A button</Button>
    <Button icon="i-lucide:squircle" title="An icon button" />
    <Button icon="i-lucide:list-collapse">
      Auto collapse
    </Button>
    <Button :active="active || undefined" @click="active = !active">
      A toggle button
    </Button>
    <Button icon="i-lucide:home" href="https://keke.cc" :auto-collapse="false">
      With &lt;a&gt; link
    </Button>
    <Button disabled>
      Disabled
    </Button>
  </div>
</template>
