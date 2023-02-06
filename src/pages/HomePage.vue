<template>
  <div>
    <h1 class="title">teraBoard</h1>
    <div class="navbar">
      <project-list />
      <div class="logout">
        {{ auth.user.login }}
        <font-awesome-icon
          icon="fa-solid fa-arrow-right-from-bracket"
          class="icon"
        />
      </div>
    </div>
    <column-list />
  </div>
</template>

<script setup>
import ProjectList from "@/components/ProjectList.vue";

import ColumnList from "@/components/ColumnList.vue";

import useAuthStore from "@/stores/auth";

const auth = useAuthStore();
const logout = () => {
  auth.logout();
};
</script>

<style scoped>
.title {
  margin: 0 0 10px 45px;
}
.navbar {
  display: flex;
}
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
