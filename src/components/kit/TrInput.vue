<template>
  <input
    class="input"
    :type="isPassword ? 'password' : 'text'"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown="
      enterSubmit($event, () => {
        $emit('submit-input');
      })
    "
  />
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import enterSubmit from "@/lib/enterSubmit";

defineProps(["modelValue", "placeholder", "isPassword"]);
defineEmits(["update:modelValue", "submit-input"]);
</script>
