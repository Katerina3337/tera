<template>
  <div>
    <h1>sign-up</h1>

    <input v-model="name" type="text" placeholder="name" />
    <input v-model="login" type="text" placeholder="login" />
    <input v-model="password" type="text" placeholder="password" />

    <button @click="signUp">send</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const login = ref("");
const password = ref("");

const signUp = async () => {
  const response = await axios.post("http://localhost:3001/auth/signup", {
    name: name.value,
    login: login.value,
    password: password.value,
  });

  console.log(response.data.message)
};
</script>
