<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  shadowInset?: string;
  shadow?: string;
  animationDuration?: string | number;
}>(), {
  animationDuration: "7s",
});

const light = computed(() => ({
  "--shadow-inset": props.shadowInset ?? "rgb(51 51 51 / 100%)",
  "--shadow": props.shadow ?? "rgb(51 51 51 / 25%)",
}));

const dark = computed(() => ({
  "--shadow-inset": props.shadowInset ?? "rgb(255 255 255 / 100%)",
  "--shadow": props.shadow ?? "rgb(255 255 255 / 25%)",
}));

const animationDuration = computed(() => typeof props.animationDuration === "number" ? `${props.animationDuration}s` : props.animationDuration);
</script>

<template>
  <div class="bubble w-fit">
    <slot></slot>
  </div>
</template>

<style scoped>
.bubble {
  --shadow-inset: v-bind("light['--shadow-inset']");
  --shadow: v-bind("light['--shadow']");

  border-radius: 50%;
  box-shadow:
    0 0 0.428vw 0 var(--shadow-inset) inset,
    0 0 0.428vw 0 var(--shadow);
  animation:
    ease-in-out infinite,
    linear infinite;
  animation-name: radius-1, scale-1;
  animation-duration: v-bind(animationDuration);
}

.dark .bubble {
  --shadow-inset: v-bind("dark['--shadow-inset']");
  --shadow: v-bind("dark['--shadow']");
}

@keyframes radius-1 {
  20% {
    border-radius: 40% 50% 50%;
  }

  40% {
    border-radius: 50% 50% 40%;
  }

  60% {
    border-radius: 50% 50% 50% 40%;
  }

  80% {
    border-radius: 50% 40% 50% 50%;
  }
}

@keyframes scale-1 {
  20% {
    transform: scale3d(1, 0.921, 1);
  }

  40% {
    transform: scale3d(0.936, 1, 1);
  }

  60% {
    transform: scale3d(1, 0.947, 1);
  }

  80% {
    transform: scale3d(0.914, 1, 1);
  }
}
</style>
