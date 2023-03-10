<template>
  <div @click="toggleSelect" class="select">
    <div class="select__selected-option">{{ selectedOption?.name }}</div>
    <div v-if="selectOpened" class="select__dropdown">
      <div
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        class="option"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
defineProps(["options", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const selectOpened = ref(false);
const selectedOption = ref(null);

const toggleSelect = () => {
  selectOpened.value = !selectOpened.value;
};
const selectOption = (o) => {
  selectedOption.value = o;
  emit("update:modelValue", o);
};
</script>

<style scoped>
.select {
  height: 100%;
  width: 85px;
  position: relative;
  display: flex;
  justify-content: center;
}

.select__selected-option {
  background-color: #5d5a88;
}

.select__dropdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35px;
  padding: 7px;
  background-color: #a4a2c4;
  border-radius: 5px;
}

.option {
  padding: 1px 5px;
  text-align: center;
  border-radius: 3px;
}

.option:hover {
  background-color: #5d5a88;
}
</style>
