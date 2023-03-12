<template>
  <div v-if="isOpened" class="wrapper">
    <div class="modal" :style="{ maxWidth: modalWidth + 'px' }">
      {{ modalWidth }}
      <div @click="modalClose" class="close">
        <div class="cross-sign"></div>
      </div>
      <slot name="modal-body"></slot>
      <div class="buttons">
        <button v-if="!hideSubmit" @click="modalSubmit" class="submit">
          {{ btnText }}
        </button>
        <button v-if="cancelAction" @click="modalClose" class="cancel__action">
          Отмена
        </button>
      </div>
    </div>
    <div @click="modalClose" class="overlay"></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps([
  "isOpened",
  "btnText",
  "hideSubmit",
  "modalWidth",
  "cancelAction",
]);

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

.modal-edit .modal {
  padding-top: 35px;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 55px 50px 25px 50px;
  width: 100%;
  max-width: 500px;
  position: relative;
  background-color: #f9f8ff;
  border-radius: 30px;
  z-index: 2;
}
.close {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 5px;
  right: 10px;
  border-radius: 50%;
  cursor: pointer;
}
.cross-sign {
  position: absolute;
  top: 15px;
  right: 28px;
}
.cross-sign:before,
.cross-sign:after {
  content: "";
  position: absolute;
  width: 24px;
  height: 4px;
  background: gray;
}
.cross-sign:before {
  transform: rotate(45deg);
}
.cross-sign:after {
  transform: rotate(-45deg);
}

.cancel__action {
  min-width: 130px;
  height: 45px;
  margin-left: 20px;
  padding: 0 15px;
  font-size: 15px;
  color: #5d5a88;
  border: 3px solid #5d5a88;
  border-radius: 47px;
  outline: 0;
  cursor: pointer;
}

.cancel__action:hover {
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}
</style>
