<template>
  <div>
    <div class="sign-form">
      <input
        v-model="login"
        type="text"
        placeholder="Логин"
        class="input"
        @keydown="enterSubmit($event, signIn)"
      />
      <input
        v-model="password"
        type="text"
        placeholder="Пароль"
        class="input"
        @keydown="enterSubmit($event, signIn)"
      />
      <button @click="signIn" class="submit sign-in__button">Войти</button>
      <RouterLink to="/sign-up" class="submit sign-up__button"
        >Зарегистрироваться</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import enterSubmit from "@/lib/enterSubmit";
import { useRouter } from "vue-router";
import axios from "axios";
import useAuthStore from "@/stores/auth";

const login = ref("");
const password = ref("");
const auth = useAuthStore();

const router = useRouter();

const signIn = async () => {
  const response = await axios.post("http://localhost:3001/auth/login", {
    login: login.value,
    password: password.value,
  });

  console.log(response.data);
  if (response.data.message === "Auth successful") {
    auth.setToken(response.data.token);
    login.value = "";
    password.value = "";
  }
  router.push("/");
};
</script>

<style scoped>
.input {
  margin-bottom: 25px;
}
.submit {
  margin-top: 0;
}
.sign-in__button {
  margin-top: 25px;
}
.sign-up__button {
  margin: 10px 0 0 0;
  display: flex;
  align-items: center;
  color: #5d5a88;
  background-color: #d4d2e3;
  border: 1px solid #5d5a88;
  text-decoration: none;
}
</style>
