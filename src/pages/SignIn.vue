<template>
  <div>
    <h1>sign-in</h1>

    <button @click="openModal">sign in</button>
    <tr-modal
      btnText="Войти"
      :isOpened="createModal"
      @mSubmit="signIn"
      @mClose="closeModal"
    >
      <template v-slot:modal-body>
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
import useAuthStore from "@/stores/auth";

const login = ref("");
const password = ref("");
const auth = useAuthStore();

const createModal = ref(false);

const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
};

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
  createModal.value = false;
};
</script>
