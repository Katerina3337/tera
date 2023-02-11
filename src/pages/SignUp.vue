<template>
  <div>
    <div class="sign-form">
      <input
        v-model="name"
        type="text"
        placeholder="Имя пользователя"
        class="input"
        @keydown="enterSubmit($event, signUp)"
      />

      <input
        v-model="login"
        type="text"
        placeholder="Логин"
        class="input"
        @keydown="enterSubmit($event, signUp)"
      />

      <input
        v-model="password"
        type="text"
        placeholder="Пароль"
        class="input"
        @keydown="enterSubmit($event, signUp)"
      />
      <button @click="signUp" class="submit">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import enterSubmit from "@/lib/enterSubmit";
import axios from "axios";

const name = ref("");
const login = ref("");
const password = ref("");

const router = useRouter();

const signUp = async () => {
  const response = await axios.post("http://localhost:3001/auth/signup", {
    name: name.value,
    login: login.value,
    password: password.value,
  });
  name.value = "";
  login.value = "";
  password.value = "";
  console.log(response.data.message);

  router.push("/sign-in");
};
</script>

<style scoped>
.input {
  margin-bottom: 20px;
}
.submit {
  margin-bottom: 0;
}
</style>
