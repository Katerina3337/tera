<template>
  <div>
    <div class="controls">
      <button @click="openModal" class="project-button">
        Создать проект<font-awesome-icon icon="fa-solid fa-plus" class="icon" />
      </button>
      <button @click="openModal" class="project-button">
        Участники проекта<font-awesome-icon
          icon="fa-solid fa-arrow-down"
          class="icon"
        />
      </button>
      <button @click="openModal" class="project-button">
        Добавить участника<font-awesome-icon
          icon="fa-solid fa-plus"
          class="icon"
        />
      </button>
    </div>
    <tr-modal
      btnText="Создать проект"
      :isOpened="createModal"
      @mSubmit="createProject"
      @mClose="closeModal"
    >
      <template v-slot:modal-body>
        <input
          v-model="projectName"
          type="text"
          placeholder="Введите название проекта"
          class="input"
        />
      </template>
    </tr-modal>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

import TrModal from "@/components/kit/TrModal.vue";

import axios from "axios";
import useAuthStore from "@/stores/auth";

const projectName = ref("");
const auth = useAuthStore();

const emit = defineEmits(["projectCreated"]);

const createModal = ref(false);

const createProject = async () => {
  const resp = await axios.post(
    "http://localhost:3001/projects/create-project",
    {
      name: projectName.value,
    },
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );

  console.log(resp.data.message);

  if (resp.data.project) {
    emit("projectCreated", resp.data.project);
  }
  createModal.value = false;
  projectName.value = "";
};
const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
};
</script>

<style scoped>
.controls {
  display: flex;
}
.project-button {
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 10px 15px;
  font-size: 14px;
  color: #ffffff;
  background-color: #5d5a88;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
