<template>
  <div>
    <div class="sign-form">
      <tr-input v-model="login" placeholder="Логин" @submitInput="signIn" name="login" />
      <span class="validation-message">{{ errorMessage }}</span>
      <tr-input
        v-model="password"
        :isPassword="true"
        placeholder="Пароль"
        @submitInput="signIn"
        name="password"
      />
      <span class="validation-message">{{ errMessage }}</span>
      <button @click="signIn" class="submit sign-in__button" :disabled="!isDisabled">Войти</button>
      <RouterLink to="/sign-up" class="sign-link"
        >Зарегистрироваться</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { postSignIn } from "@/api/api";
import TrInput from "@/components/kit/TrInput.vue";
import { useField } from "vee-validate";
import * as yup from 'yup';


import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

onMounted(() => {
  if(errorMessage || errMessage){
    isDisabled.value = !isDisabled.value;
  }
});
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
//
// const schema = yup.object({
//   login: yup.string().required("Это поле обязательное").email("Данное поле должно быть электронной почтой"),
//   password: yup.string().required("Это поле обязательное").min(8, "Минимум 8 символов"),
// });

// useForm({
//   validationSchema: schema,
// });

const { value: login, errorMessage } = useField('login', yup.string().required("Это поле обязательное").email("Данное поле должно быть электронной почтой"));
const { value: password, errorMessage: errMessage } = useField('password', yup.string().required("Это поле обязательное").min(8, "Минимум 8 символов"));

const isDisabled = ref(false);

</script>

<style scoped>
.submit {
  margin-top: 0;
}
.sign-in__button {
  margin-top: 15px;
}
.validation-message {
  height: 30px;
  font-size: 14px;
  color: #5952a2;
}
</style>
