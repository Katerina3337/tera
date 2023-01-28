<template>
  <div>
    <h1>teraBoard</h1>

    <h2>project</h2>
    <project-list />
    <hr />

    <h2>columns</h2>
    <column-list />
    <create-column />
    <hr />
  </div>
</template>

<script setup>
import ProjectList from "@/components/ProjectList.vue";

import ColumnList from "@/components/ColumnList.vue";
import CreateColumn from "@/components/CreateColumn.vue";
</script>
