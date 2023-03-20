<template>
  <div>
    <div class="sign-form">
      <tr-input v-model="login" placeholder="Логин" @submitInput="signIn" />
      <span>{{ errorMessage }}</span>
      <tr-input
        v-model="password"
        :isPassword="true"
        placeholder="Пароль"
        @submitInput="signIn"
      />
      <span>{{ errMessage }}</span>
      <button @click="signIn" class="submit sign-in__button">Войти</button>
      <RouterLink to="/sign-up" class="sign-link"
        >Зарегистрироваться</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { postSignIn } from "@/api/api";
import TrInput from "@/components/kit/TrInput.vue";
import { useField } from "vee-validate";
import * as yup from 'yup';


import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

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

const { value: login, errorMessage } = useField('login', yup.string().required("Это поле обязательное").email("Данное поле должно быть электронной почтой"));
const { value: password, errorMessage: errMessage } = useField('password', yup.string().required("Это поле обязательное").min(8, "Минимум 8 символов"));

</script>

<style scoped>
.input {
  margin-bottom: 20px;
}
.submit {
  margin-top: 0;
}
.sign-in__button {
  margin-top: 15px;
}
</style>
