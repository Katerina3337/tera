<template>
  <div>
    <h5>create column for project {{ app.activeProject }}</h5>

    <button @click="openModal">create</button>
    <tr-modal
      :isOpened="createModal"
      btnText="Добавить колонку"
      @mSubmit="createColumn"
      @mClose="closeModal"
    >
      <template v-slot:modal-body>
        <input
          v-model="columnName"
          type="text"
          placeholder="Введите название колонки"
          class="input"
        />
      </template>
    </tr-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
};
</script>

<style scoped>
.input {
  width: 100%;
  max-width: 300px;
  height: 45px;
  padding: 0 20px;
  font-size: 16px;
  background-color: #d4d2e3;
  border: none;
  border-radius: 30px;
  outline: 0;
}
</style>
