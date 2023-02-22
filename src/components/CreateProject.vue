<template>
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
      <tr-input
        v-model="projectName"
        placeholder="Введите название проекта"
        @submitInput="createProject"
      />
    </template>
  </tr-modal>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { postCreateProject } from "@/api/api";

import TrModal from "@/components/kit/TrModal.vue";
import TrInput from "@/components/kit/TrInput.vue";

import useAuthStore from "@/stores/auth";
const auth = useAuthStore();

const projectName = ref("");
const createModal = ref(false);

const emit = defineEmits(["projectCreated"]);

const createProject = async () => {
  const resp = await postCreateProject(projectName.value, auth.token);

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
