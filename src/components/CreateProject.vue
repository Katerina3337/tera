<template>
  <div>
    <h5>create project</h5>

    <input v-model="projectName" type="text" />

    <button @click="createProject">create</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";
import useAuthStore from "@/stores/auth";

const projectName = ref("");
const auth = useAuthStore();

const emit = defineEmits(["projectCreated"]);

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
};
</script>
