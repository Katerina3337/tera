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
  min-height: 35px;
  max-width: 300px;
  min-width: 120px;
  position: relative;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
  cursor: pointer;
}

.select__selected-option {
  background-color: #5d5a88;
}

.select__dropdown {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45px;
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
