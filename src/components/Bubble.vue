<template>
  <div class="bubble w-fit">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bubble {
  --shadow-inset: rgb(51 51 51 / 100%);
  --shadow: rgb(51 51 51 / 25%);

  border-radius: 50%;
  box-shadow: 0 0 0.428vw 0 var(--shadow-inset) inset, 0 0 0.428vw 0 var(--shadow);
  animation: ease-in-out infinite, linear infinite;
  animation-name: radius-1, scale-1;
  animation-duration: 7s;
}

.dark .bubble {
  --shadow-inset: rgb(255 255 255 / 100%);
  --shadow: rgb(255 255 255 / 25%);
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
