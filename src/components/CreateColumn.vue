<template>
  <div class="create-column">
    <div @click="openModal">
      Добавить новую колонку
      <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
    </div>
    <tr-modal
      :isOpened="createModal"
      btnText="Добавить колонку"
      @mSubmit="createColumn"
      @mClose="closeModal"
    >
      <template v-slot:modal-body>
        <h5>create column for project {{ app.activeProject }}</h5>
        <input
          v-model="columnName"
          type="text"
          placeholder="Введите название колонки"
          class="input"
          @keydown="enterSubmit($event, createColumn)"
        />
      </template>
    </tr-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

import enterSubmit from "@/lib/enterSubmit";

import TrModal from "@/components/kit/TrModal.vue";

import axios from "axios";

import useAuthStore from "@/stores/auth";
import useAppStore from "@/stores/app";

const auth = useAuthStore();
const app = useAppStore();

const columnName = ref("");
const createModal = ref(false);

const createColumn = async () => {
  if (!app.activeProject) return;

  const resp = await axios.post(
    "http://localhost:3001/columns/create-column",
    {
      name: columnName.value,
      position: 0,
      project_id: app.activeProject,
    },
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );

  console.log(resp.data.message);

  if (resp.data.column) {
    app.addColumn(resp.data.column);
    createModal.value = false;
  }
  columnName.value = "";
};

const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
  columnName.value = "";
};
</script>

<style scoped>
.create-column {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
  cursor: pointer;
}
</style>
