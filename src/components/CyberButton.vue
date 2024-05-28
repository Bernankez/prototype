<script setup lang="ts">
import { type VNode, computed, createTextVNode, useSlots, withDefaults } from "vue";

const props = withDefaults(defineProps<{
  text?: string;
}>(), {
  text: "",
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const slots = useSlots();
const text = computed(() => {
  if (slots.default) {
    const slot = slots.default() as VNode[];
    if (slot.length) {
      const textNode = createTextVNode();
      const first = slot[0];
      if (first.type === textNode.type) {
        return first.children;
      }
    }
  }
  return props.text;
});

const computedText = computed(() => `"${text.value}"`);

function click(e: MouseEvent) {
  emit("click", e);
}
</script>

<template>
  <div class="cyber-button-wrapper">
    <link href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
    <button class="cyber-button" @click="click">
      <slot>
        {{ text }}
      </slot>
    </button>
  </div>
</template>

<style scoped>
.cyber-button-wrapper {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
}

.cyber-button {
  position: relative;
  padding: 0 25px;
  border: 0;
  color: #fff;
  font-size: 28px;
  font-family: "Bebas Neue", cursive;
  line-height: 88px;
  letter-spacing: 3px;
  background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
  outline: transparent;
  box-shadow: 6px 0 0 #00e6f6;
}

.cyber-button::after {
  position: absolute;
  inset: 0;
  display: block;
  text-shadow:
    -3px -3px 0 #f8f005,
    3px 3px 0 #00e6f6;
  background: linear-gradient(
    45deg,
    transparent 3%,
    #00e6f6 3%,
    #00e6f6 5%,
    #ff013c 5%
  );
  content: v-bind(computedText);
  clip-path: var(--slice-0);
}

.cyber-button:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

.cyber-button:active {
  transform: scale(0.95, 0.95);
}

@keyframes glitch {
  0% {
    transform: translate(-20px, -10px);
    clip-path: var(--slice-1);
  }

  10% {
    transform: translate(10px, 10px);
    clip-path: var(--slice-3);
  }

  20% {
    transform: translate(-10px, 10px);
    clip-path: var(--slice-1);
  }

  30% {
    transform: translate(0, 5px);
    clip-path: var(--slice-3);
  }

  40% {
    transform: translate(-5px, 0);
    clip-path: var(--slice-2);
  }

  50% {
    transform: translate(5px, 0);
    clip-path: var(--slice-3);
  }

  60% {
    transform: translate(5px, 10px);
    clip-path: var(--slice-4);
  }

  70% {
    transform: translate(-10px, 10px);
    clip-path: var(--slice-2);
  }

  80% {
    transform: translate(20px, -10px);
    clip-path: var(--slice-5);
  }

  90% {
    transform: translate(-10px, 0);
    clip-path: var(--slice-1);
  }

  100% {
    transform: translate(0);
    clip-path: var(--slice-1);
  }
}
</style>
