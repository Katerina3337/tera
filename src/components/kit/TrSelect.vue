<template>
  <div @click="toggleSelect" class="select">
    <div class="select__selected-option">{{ selectedOption.name }}</div>
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
import { defineProps, defineEmits } from "vue";
defineProps(["options", "selectOpened", "selectedOption"]);
const emit = defineEmits(["toggleSel"]);

const toggleSelect = () => {
  emit("toggleSel");
};
const selectOption = (o) => {
  emit("selectOpt", o);
};
</script>

<style scoped>
.select {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
  padding: 7px;
  background-color: #a4a2c4;
}

.option {
  padding: 3px 5px;
  border-radius: 3px;
}

.option:hover {
  background-color: #5d5a88;
}
</style>
