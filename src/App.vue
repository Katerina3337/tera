<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/sign-up">Sign up</RouterLink>
      <RouterLink to="/sign-in">Sign in</RouterLink>
      <a @click="logout">logout</a>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import useAuthStore from "@/stores/auth";

const auth = useAuthStore();
const logout = () => {
  auth.logout();
};
</script>
