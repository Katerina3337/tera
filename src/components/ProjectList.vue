<template>
  <div>
    <h5>project list</h5>
    <ul>
      <li
        v-for="project in projectList"
        @click="app.setActiveProject(project.id)"
        :key="project.id"
      >
        {{ project.name }} |id: {{ project.id }}|
        <span v-if="app.activeProject === project.id">active project</span>
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
</script>
