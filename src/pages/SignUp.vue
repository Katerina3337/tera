<template>
  <div>
    <div class="sign-form">
      <tr-input
        v-model="name"
        placeholder="Имя пользователя"
        @submitInput="signUp"
      />

      <tr-input v-model="login" placeholder="Логин" @submitInput="signUp" />

      <tr-input
        v-model="password"
        :isPassword="true"
        placeholder="Пароль"
        @submitInput="signUp"
      />
      <button @click="signUp" class="submit">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import TrInput from "@/components/kit/TrInput.vue";

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

  // todo Исправить краш скрипта при ответе сервера с ошибкой

  name.value = "";
  login.value = "";
  password.value = "";
  console.log(response.data.message);

  router.push("/sign-in");
};
</script>

<style scoped>
.submit {
  margin-bottom: 0;
}
</style>
