<template>
  <div>
    <h5>create column for project {{ app.activeProject }}</h5>

    <input v-model="columnName" type="text" />

    <button @click="createColumn">create</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import useAuthStore from "@/stores/auth";
import useAppStore from "@/stores/app";

const auth = useAuthStore();
const app = useAppStore();

const columnName = ref("");

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
  }
};
</script>
