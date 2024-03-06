<template>
  <div
    class="collapse grid overflow-hidden rounded-2"
    :class="[collapsed ? 'grid-rows-[auto_0fr]' : 'grid-rows-[auto_1fr]']"
  >
    <div class="z-1 flex justify-between" @click="collapsed = !collapsed">
      <div class="w-full">
        <slot name="summary" :collapsed="collapsed">
          {{ title }}
          <span class="m-l-2 align-end text-3.5 text-neutral-400">{{ desc }}</span>
        </slot>
      </div>
      <div class="i-icon-park-outline:right text-5 transition" :class="[collapsed ? '' : 'rotate-90']"></div>
    </div>
    <div class="content" :class="[collapsed ? 'opacity-0 min-h-0' : 'min-h-fit']">
      <slot :collapsed="collapsed"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMergedState } from "../../../src/composables/useMergedState";
import { isDefined } from "../../../src/utils/is";

const props = withDefaults(defineProps<{
  defaultCollapsed?: boolean;
  modelValue?: boolean;
  duration?: number | string;
  title?: string;
  desc?: string;
}>(), {
  modelValue: undefined,
  defaultCollapsed: true,
  duration: 0.2,
});

const emit = defineEmits<{
  "update:modelValue": [collapsed:boolean];
}>();

const controlled = computed({
  get: () => props.modelValue,
  set: c => isDefined(c) && emit("update:modelValue", c),
});

const uncontrolled = ref(props.defaultCollapsed);

const duration = computed(() => typeof props.duration === "number" ? `${props.duration}s` : props.duration);

const collapsed = useMergedState(controlled, uncontrolled);
</script>

<style scoped>
.collapse {
  transition-timing-function: ease-in-out;
  transition-duration: v-bind(duration);
  transition-property: padding, grid-template-rows;
}

.content {
  transition-timing-function: ease-in-out;
  transition-duration: v-bind(duration);
  transition-property: opacity;
}
</style>
