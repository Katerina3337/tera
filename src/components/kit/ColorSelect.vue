<template>
  <div @click="toggleSelect" class="select">
    <div
      v-if="modelValue"
      class="select__selected-option color"
      :class="chosenColor"
    ></div>
    <div v-else class="four-colors">
      <div class="row">
        <div class="col red"></div>
        <div class="col yellow"></div>
      </div>
      <div class="row">
        <div class="col green"></div>
        <div class="col blue"></div>
      </div>
    </div>
    <font-awesome-icon
        @click="deletePriority(null)"
        icon="fa-regular fa-circle"
        title="Убрать приоритетность"
        class="card-icon"
    />
    <div v-if="selectOpened" class="select__dropdown">
      <div @click="selectColor(1)" class="color blue"></div>
      <div @click="selectColor(2)" class="color green"></div>
      <div @click="selectColor(3)" class="color yellow"></div>
      <div @click="selectColor(4)" class="color red"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";

const selectOpened = ref(false);

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const toggleSelect = () => {
  selectOpened.value = !selectOpened.value;
  isChosen.value = true;
};

const isChosen = ref(false);
const chosenColor = computed(() => {
  switch (props.modelValue) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "yellow";
    case 4:
      return "red";
  }
  return "";
});

const deletePriority = (delPriority) => {
  emit("update:modelValue", delPriority);
}

const selectColor = (num) => {
  selectOpened.value = false;
  emit("update:modelValue", num);
};
</script>

<style scoped>
.select {
  min-height: 35px;
  max-width: 200px;
  min-width: 80px;
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

.select__selected-option .color {
  margin-bottom: 0;
}

.select__selected-option.color {
  margin-bottom: 0;
}

.row {
  display: flex;
}

.col {
  width: 10px;
  height: 10px;
  border-radius: 50%;
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

.color {
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
  border-radius: 50%;
}

.color:hover {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}

.blue {
  background-color: blue;
}

.card-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
}
</style>
