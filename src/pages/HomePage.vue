<template>
  <div>
    <h1 class="title">teraBoard</h1>
    <div class="navbar">
      <project-list />
      <tr-profile />
    </div>
    <column-list />
  </div>
</template>

<script setup>
import TrProfile from "@/components/TrProfile.vue";
import ProjectList from "@/components/ProjectList.vue";
import ColumnList from "@/components/ColumnList.vue";
</script>

<style scoped>
.title {
  margin: 0 0 10px 45px;
}
.navbar {
  display: flex;
}
</style>
