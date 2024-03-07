<template>
  <div
    class="collapse"
    :class="[collapsed ? 'collapse-collapsed' : 'collapse-not-collapsed']"
  >
    <div class="summary" @click="collapsed = !collapsed">
      <div :style="{ width: '100%' }">
        <slot name="summary" :collapsed="collapsed">
          {{ title }}
          <span class="description">{{ desc }}</span>
        </slot>
      </div>
    </div>
    <div class="content" :class="[collapsed ? 'content-collapsed' : 'content-not-collapsed ']">
      <slot :collapsed="collapsed"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMergedState } from "../composables/useMergedState";
import { isDefined } from "../utils/is";

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
  display: grid;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: rgb(249 250 251);
  transition-timing-function: ease-in-out;
  transition-duration: v-bind(duration);
  transition-property: padding, grid-template-rows;
}

.dark .collapse {
  background-color: rgb(24 24 24);
}

.collapse-collapsed {
  grid-template-rows: auto 0fr;
  padding-bottom: 0;
}

.collapse-not-collapsed {
  grid-template-rows: auto 1fr;
  padding-bottom: 1.25rem;
}

.summary {
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  cursor: pointer;
}

.description {
  margin-left: 0.5rem;
  color: rgb(163 163 163 / var(--un-text-opacity));
  font-size: 0.875rem;
  vertical-align: bottom;
}

.arrow {
  font-size: 1.25rem;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-property:
    color,
    background-color,
    border-color,
    outline-color,
    text-decoration-color,
    fill,
    stroke,
    opacity,
    box-shadow,
    transform,
    filter,
    backdrop-filter;
}

.content {
  padding-right: 1.25rem;
  padding-left: 1.25rem;
  transition-timing-function: ease-in-out;
  transition-duration: v-bind(duration);
  transition-property: opacity;
}

.content-collapsed {
  min-height: 0;
  opacity: 0;
}

.content-not-collapsed {
  min-height: fit-content;
}
</style>
