<template>
  <div>
    <div class="sign-form">
      <tr-input
        v-model="name"
        placeholder="Имя пользователя"
        @submitInput="signUp"
      />
      <span>{{ errName }}</span>

      <tr-input v-model="login" placeholder="Логин" @submitInput="signUp" />
      <span>{{ errLogin }}</span>
      <tr-input
        v-model="password"
        :isPassword="true"
        placeholder="Пароль"
        @submitInput="signUp"
      />
      <span>{{ errPassword }}</span>
      <button @click="signUp" class="submit">Зарегистрироваться</button>
      <RouterLink to="/sign-in" class="sign-link">Войти</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { postSignUp } from "@/api/api";
import TrInput from "@/components/kit/TrInput.vue";
import { useField } from "vee-validate";
import * as yup from 'yup';

const router = useRouter();

const signUp = async () => {
  await postSignUp(name.value, login.value, password.value);
  // todo Исправить краш скрипта при ответе сервера с ошибкой

  name.value = "";
  login.value = "";
  password.value = "";

  router.push("/sign-in");
};

const { value: name, errorMessage: errName } = useField('login', yup.string()
    .required("Это поле обязательно для заполнения"));
const { value: login, errorMessage: errLogin } = useField('login', yup.string()
    .required("Это поле обязательно для заполнения")
    .email("Данное поле должно быть электронной почтой"));
const { value: password, errorMessage: errPassword } = useField('password', yup.string()
    .required("Это поле обязательно для заполнения")
    .min(8, "Минимум 8 символов"));
</script>

<style scoped>
.input {
  margin-bottom: 20px;
}
.submit {
  margin-bottom: 0;
  margin-top: 20px;
}
</style>
