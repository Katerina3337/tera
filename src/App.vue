<template>
  <header></header>

  <RouterView />
</template>

<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import useAuthStore from "@/stores/auth";

const auth = useAuthStore();

onMounted(() => {
  const lsToken = localStorage.getItem("token");
  if (lsToken) {
    auth.setToken(lsToken);
    // auth.token = lsToken;
  }
});
</script>
