<template>
  <div>
    <h1>sign-up</h1>

    <button @click="openModal">send</button>

    <tr-modal
      btnText="Зарегистрироваться"
      :isOpened="createModal"
      @mSubmit="signUp"
      @mClose="closeModal"
    >
      <template v-slot:modal-body>
        <input
          v-model="name"
          type="text"
          placeholder="Имя пользователя"
          class="input"
        />
        <br />
        <input v-model="login" type="text" placeholder="Логин" class="input" />
        <br />
        <input
          v-model="password"
          type="text"
          placeholder="Пароль"
          class="input"
        />
      </template>
    </tr-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TrModal from "@/components/kit/TrModal.vue";
import axios from "axios";

const name = ref("");
const login = ref("");
const password = ref("");

const createModal = ref(false);

const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
};

const signUp = async () => {
  const response = await axios.post("http://localhost:3001/auth/signup", {
    name: name.value,
    login: login.value,
    password: password.value,
  });
  name.value = "";
  login.value = "";
  password.value = "";
  createModal.value = false;
  console.log(response.data.message);
};
</script>
