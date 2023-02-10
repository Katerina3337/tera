<template>
  <div v-if="isOpened" class="wrapper">
    <div class="modal" :style="{ maxWidth: modalWidth + 'px' }">
      {{ modalWidth }}
      <div @click="modalClose" class="close"></div>
      <slot name="modal-body"></slot>
      <button v-if="!hideSubmit" @click="modalSubmit" class="submit">
        {{ btnText }}
      </button>
    </div>
    <div @click="modalClose" class="overlay"></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["isOpened", "btnText", "hideSubmit", "modalWidth"]);

const emit = defineEmits(["mSubmit", "mClose"]);

const modalClose = (e) => {
  emit("mClose", e);
};

const modalSubmit = (e) => {
  emit("mSubmit", e);
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #cccae3;
  opacity: 0.9;
  z-index: 1;
}
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 55px 50px 10px 50px;
  width: 100%;
  max-width: 500px;
  position: relative;
  background-color: #f9f8ff;
  border-radius: 30px;
  z-index: 2;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 38px;
}
.close:before,
.close:after {
  content: "";
  position: absolute;
  width: 24px;
  height: 4px;
  background: gray;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
