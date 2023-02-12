<template>
  <div class="project-list">
    <ul class="list">
      <li
        v-for="project in projectList"
        @click="app.setActiveProject(project.id)"
        :key="project.id"
        class="list-item"
        :class="{ active: isActive(project.id) }"
      >
        {{ project.name }} |id: {{ project.id }}|
        <font-awesome-icon
          @click="deleteProject(project.id)"
          icon="fa-solid fa-trash"
        />
      </li>
    </ul>

    <create-project @projectCreated="addProject" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import CreateProject from "@/components/CreateProject.vue";

import useAppStore from "@/stores/app";
import useAuthStore from "@/stores/auth";

const app = useAppStore();
const auth = useAuthStore();

const projectList = ref(null);

const isActive = (projectId) => {
  return app.activeProject === projectId;
};

onMounted(async () => {
  const resp = await axios.get("http://localhost:3001/projects/get-all", {
    headers: {
      Authorization: auth.token,
    },
  });

  projectList.value = resp.data;
});

const addProject = (project) => {
  projectList.value.push(project);
};

const deleteProject = async (id) => {
  const resp = await axios.delete(
    "http://localhost:3001/projects/delete-project",
    {
      headers: {
        Authorization: auth.token,
      },
      data: {
        project_id: id,
      },
    }
  );

  console.log(resp);
  console.log(resp.status === 200);
  if (resp.status === 200) {
    const projectIdx = projectList.value.findIndex((item) => {
      return item.id === id;
    });

    projectList.value.splice(projectIdx, 1);
  }
};
</script>

<style scoped>
.project-list {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px 0 30px;
  padding: 10px 15px;
  background-color: #a4a2c4;
  border-radius: 8px;
}
.list {
  display: flex;
  padding: 0;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.list-item {
  margin-right: 20px;
  padding: 10px 15px;
  font-size: 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
  cursor: pointer;
}
.active {
  color: #5d5a88;
  background-color: #d4d2e3;
}
</style>
