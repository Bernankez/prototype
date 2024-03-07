<template>
  <div class="toggle-wrapper">
    <label>
      <input
        v-model="modelValue"
        class="toggle-checkbox" :class="[disabled ? '' : 'toggle-enabled']"
        type="checkbox"
        :disabled="props.disabled"
        :true-value="props.trueValue"
        :false-value="props.falseValue"
      />
      <span class="toggle-background" :class="[dark ? 'toggle-background-dark' : '', disabled ? 'toggle-background-disabled' : '']"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMergedState } from "../composables/useMergedState";
import { isDefined } from "../utils/is";

const props = withDefaults(defineProps<{
  modelValue?: any;
  dark?: boolean;
  width?: string;
  height?: string;
  toggleDiameter?: string;
  toggleWider?: string;
  switchColorOff?: string;
  switchColorOn?: string;
  switchColorOffDark?: string;
  trueValue?: any;
  falseValue?: any;
  disabled?: boolean;
}>(), {
  dark: false,
  width: "80px",
  height: "46px",
  toggleDiameter: "40px",
  toggleWider: "52px",
  switchColorOff: "#e9e9e9",
  switchColorOn: "#30d158",
  switchColorOffDark: "#39393d",
  trueValue: true,
  falseValue: false,
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const uncontrolled = ref(props.falseValue);
const controlled = computed({
  get: () => props.modelValue,
  set: v => isDefined(v) && emit("update:modelValue", v),
});

const modelValue = useMergedState(controlled, uncontrolled);
</script>

<style scoped>
.toggle-wrapper {
  --button-toggle-offset: calc((v-bind("props.height") - v-bind("props.toggleDiameter")) / 2);
  --toggle-shadow-offset: 10px;
}

.toggle-background {
  position: relative;
  display: inline-block;
  width: v-bind("props.width");
  height: v-bind("props.height");
  border-radius: calc(v-bind("props.height") / 2);
  background-color: v-bind("props.switchColorOff");
  transition: 0.3s all ease-in-out;
}

.toggle-background-disabled {
  cursor: not-allowed;
}

.toggle-background::after {
  position: absolute;
  top: var(--button-toggle-offset);
  display: inline-block;
  width: v-bind("props.toggleDiameter");
  height: v-bind("props.toggleDiameter");
  border-radius: calc(v-bind("props.toggleDiameter") / 2);
  background-color: #fff;
  box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgb(0 0 0 / 10%);
  transform: translateX(var(--button-toggle-offset));
  transition: 0.3s all ease-in-out;
  content: "";
}

.toggle-checkbox {
  display: none;
}

.toggle-checkbox:checked + span {
  background-color: v-bind("props.switchColorOn");
}

.toggle-checkbox:checked + span::after {
  box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgb(0 0 0 / 10%);
  transform: translateX(calc(v-bind("props.width") - v-bind("props.toggleDiameter") - var(--button-toggle-offset)));
}

.toggle-enabled:active + span::after {
  width: v-bind("props.toggleWider");
}

.toggle-enabled:checked:active + span::after {
  transform: translateX(calc(v-bind("props.width") - v-bind("props.toggleWider") - var(--button-toggle-offset)));
}

.toggle-background-dark {
  background-color: v-bind("props.switchColorOffDark");
}
</style>
