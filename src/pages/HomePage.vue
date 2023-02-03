<template>
  <div>
    <h1 class="title">teraBoard</h1>

    <project-list />

    <column-list />
  </div>
</template>

<script setup>
import ProjectList from "@/components/ProjectList.vue";

import ColumnList from "@/components/ColumnList.vue";
</script>

<style scoped>
.title {
  margin: 0 0 10px 45px;
}
</style>
