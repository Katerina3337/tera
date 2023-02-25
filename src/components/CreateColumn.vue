<template>
  <div v-if="app.activeProject" @click="openModal" class="create-column">
    <div>
      Добавить новую колонку
      <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
    </div>
  </div>
  <tr-modal
    :isOpened="createModal"
    btnText="Добавить колонку"
    @mSubmit="createColumn"
    @mClose="closeModal"
  >
    <template v-slot:modal-body>
      <tr-input
        v-model="columnName"
        placeholder="Введите название колонки"
        @submitInput="createColumn"
      />
    </template>
  </tr-modal>
</template>

<script setup>
import { ref } from "vue";
import { postCreateColumn } from "@/api/api";

import TrModal from "@/components/kit/TrModal.vue";
import TrInput from "@/components/kit/TrInput.vue";

import useAuthStore from "@/stores/auth";
import useAppStore from "@/stores/app";

const auth = useAuthStore();
const app = useAppStore();

const columnName = ref("");
const createModal = ref(false);

const createColumn = async () => {
  if (!app.activeProject) return;

  const resp = await postCreateColumn(
    columnName.value,
    app.activeProject,
    auth.token
  );

  console.log(resp);

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
