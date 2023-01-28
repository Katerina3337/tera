<template>
  <div>
    <h1>sign-in</h1>

    <input v-model="login" type="text" placeholder="login" />
    <input v-model="password" type="text" placeholder="password" />

    <button @click="signIn">sign in</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import useAuthStore from "@/stores/auth";

const login = ref("");
const password = ref("");
const auth = useAuthStore();

const signIn = async () => {
  const response = await axios.post("http://localhost:3001/auth/login", {
    login: login.value,
    password: password.value,
  });

  console.log(response.data);
  if (response.data.message === "Auth successful") {
    auth.setToken(response.data.token);
  }
};
</script>
