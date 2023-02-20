<template>
  <div v-if="auth.user" class="logout">
    {{ auth.user.login }}
    <font-awesome-icon
      @click="logout"
      icon="fa-solid fa-arrow-right-from-bracket"
      class="icon"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const logout = () => {
  auth.logout();
  router.push("/sign-in");
};
</script>

<style scoped>
.logout {
  width: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
  padding: 10px 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
}
.icon {
  cursor: pointer;
}
</style>
