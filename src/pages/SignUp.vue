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
      <RouterLink to="/sign-in" class="sign-link">Войти</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postSignUp } from "@/api/api";
import TrInput from "@/components/kit/TrInput.vue";

const router = useRouter();

const name = ref("");
const login = ref("");
const password = ref("");

const signUp = async () => {
  await postSignUp(name.value, login.value, password.value);
  // todo Исправить краш скрипта при ответе сервера с ошибкой

  name.value = "";
  login.value = "";
  password.value = "";

  router.push("/sign-in");
};
</script>

<style scoped>
.submit {
  margin-bottom: 0;
}
</style>
