<template>
  <div class="projects">
    <ul class="project-list">
      <li
        v-for="project in projectList"
        @click="app.setActiveProject(project.id)"
        :key="project.id"
        class="project-item"
        :class="{ active: isActive(project.id) }"
      >
        <div class="project">
          {{ project.name }}
          <font-awesome-icon
            @click.stop="deleteProject(project.id)"
            icon="fa-solid fa-trash"
            title="Удалить проект"
            class="icon"
          />
        </div>
      </li>
    </ul>

    <create-project @projectCreated="addProject" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { deleteDeleteProject, getProjectList } from "@/api/api";
import CreateProject from "@/components/CreateProject.vue";

import useAppStore from "@/stores/app";
import useAuthStore from "@/stores/auth";

const app = useAppStore();
const auth = useAuthStore();

const projectList = ref(null);

onMounted(async () => {
  const resp = await getProjectList(auth.token);
  projectList.value = resp.data;
});

const isActive = (projectId) => {
  return app.activeProject === projectId;
};

const addProject = (project) => {
  projectList.value.push(project);
};

const deleteProject = async (id) => {
  const resp = await deleteDeleteProject(id, auth.token);

  if (resp.status === 200) {
    app.deactivateProject();

    const projectIdx = projectList.value.findIndex((item) => {
      return item.id === id;
    });

    projectList.value.splice(projectIdx, 1);
  }
};
</script>

<style scoped>
.projects {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px 0 30px;
  padding: 10px 15px;
  background-color: #a4a2c4;
  border-radius: 8px;
}
.project-list {
  display: flex;
  padding: 0;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.project-item {
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

.project:hover .icon {
  opacity: 1;
}

.icon {
  opacity: 0;
  margin-left: 15px;
}

.active {
  color: #5d5a88;
  background-color: #d4d2e3;
}
</style>
