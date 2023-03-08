<template>
  <div>
    <div class="sign-form">
      <tr-input v-model="login" placeholder="Логин" @submitInput="signIn" />

      <tr-input
        v-model="password"
        :isPassword="true"
        placeholder="Пароль"
        @submitInput="signIn"
      />
      <button @click="signIn" class="submit sign-in__button">Войти</button>
      <RouterLink to="/sign-up" class="sign-link"
        >Зарегистрироваться</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { postSignIn } from "@/api/api";
import TrInput from "@/components/kit/TrInput.vue";

import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const login = ref("");
const password = ref("");

const signIn = async () => {
  const response = await postSignIn(login.value, password.value);

  // todo Исправить краш скрипта при ответе сервера с ошибкой

  if (response.data.message === "Auth successful") {
    auth.setToken(response.data.token);
    login.value = "";
    password.value = "";
  }
  router.push("/");
};
</script>

<style scoped>
.submit {
  margin-top: 0;
}
.sign-in__button {
  margin-top: 25px;
}
</style>
