<template>
  <button @click="openModal" class="create-card">Добавить задачу</button>
  <tr-modal
    btnText="Добавить задачу"
    :isOpened="createModal"
    @mSubmit="createCard"
    @mClose="closeModal"
  >
    <template v-slot:modal-body>
      <tr-input
        v-model="cardName"
        placeholder="Название"
        @submitInput="createCard"
      />
      <br />
      <tr-input
        v-model="summery"
        placeholder="Краткое описание"
        @submitInput="createCard"
      />
      <br />
      <textarea
        v-model="description"
        placeholder="Описание"
        class="textarea"
        @keydown="enterSubmit($event, createCard)"
      />
      <br />
    </template>
  </tr-modal>
</template>

<script setup>
import axios from "axios";
import { ref, defineProps } from "vue";
import enterSubmit from "@/lib/enterSubmit";
import TrModal from "@/components/kit/TrModal.vue";
import TrInput from "@/components/kit/TrInput.vue";

import useAuthStore from "@/stores/auth";

const auth = useAuthStore();

const props = defineProps(["columnId"]);
const emit = defineEmits(["cardCreated"]);

const cardName = ref("");
const summery = ref("");
const description = ref("");

const createModal = ref(false);

const openModal = () => {
  createModal.value = true;
};

const closeModal = () => {
  createModal.value = false;
};

const createCard = async () => {
  if (!props.columnId) return;

  const resp = await axios.post(
    "http://localhost:3001/card/create-card",
    {
      name: cardName.value,
      summery: summery.value,
      description: description.value,
      column_id: props.columnId,
    },
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );

  if (resp.data.card) {
    emit("cardCreated", resp.data.card);
    cardName.value = "";
    summery.value = "";
    description.value = "";
  }
  createModal.value = false;
};
</script>

<style scoped>
.create-card {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #d4d2e3;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.textarea {
  width: 100%;
  max-width: 300px;
  height: 100px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #d4d2e3;
  border: none;
  border-radius: 30px;
  outline: 0;
  resize: none;
}
</style>
