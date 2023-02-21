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
        <div class="project">
          {{ project.name }}
          <div class="delete" @click="deleteProject(project.id)">
            <font-awesome-icon
              icon="fa-solid fa-trash"
              title="Удалить проект"
              class="icon"
            />
          </div>
        </div>
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

  if (resp.status === 200) {
    app.deactivateProject();
    app.columnList.splice(0, app.columnList.length);
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
  padding: 10px;
  font-size: 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
  cursor: pointer;
}

.project {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete {
  margin-left: 10px;
  padding: 7px 10px;
  background-color: #a4a2c4;
  border-radius: 5px;
}

.icon {
  margin: 0;
}

.active {
  color: #5d5a88;
  background-color: #d4d2e3;
}
</style>
