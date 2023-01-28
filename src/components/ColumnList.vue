<template>
  <div>
    <h5>column list</h5>
    <ul v-if="app.columnList?.length" style="display: flex">
      <li v-for="column in app.columnList" :key="column.id">
        <column-item :column="column" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import ColumnItem from "@/components/ColumnItem.vue";
import useAppStore from "@/stores/app";

const app = useAppStore();
</script>
