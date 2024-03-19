<template>
  <div ref="divRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FlowWallpaper } from "./FlowWallpaper";

const divRef = ref<HTMLDivElement>();

const flowWallpaper = new FlowWallpaper();

onMounted(async () => {
  flowWallpaper.create();
  const width = divRef.value!.clientWidth;
  const height = divRef.value!.clientHeight;
  flowWallpaper.setSize(1500, 500);
  divRef.value!.appendChild(flowWallpaper.canvas!);
  await flowWallpaper.loadImage();
  console.log(flowWallpaper.count);
  flowWallpaper.render();
});
</script>
