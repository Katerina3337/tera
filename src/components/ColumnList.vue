<template>
  <div class="columns">
    <ul v-if="app.columnList?.length && !refreshList" class="column-list">
      <li v-for="column in app.columnList" :key="column.id" class="column-item">
        <column-item :column="column" @update-columns="updateColumns" />
      </li>
    </ul>
    <create-column />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ColumnItem from "@/components/ColumnItem.vue";
import CreateColumn from "@/components/CreateColumn.vue";

import useAppStore from "@/stores/app";
const app = useAppStore();

//todo временный костыль обновления колонок после перенова задачи

const refreshList = ref(false);
const updateColumns = () => {
  refreshList.value = true;
  setTimeout(() => {
    refreshList.value = false;
  }, 0);
};
</script>

<style scoped>
.columns {
  display: flex;
  justify-content: start;
  align-items: flex-start;
  margin: 15px 30px;
  padding: 15px 15px;
  background-color: #a4a2c4;
  border-radius: 8px;
}
.column-list {
  display: flex;
  padding: 0;
  list-style: none;
}
.column-item {
  width: 200px;
  height: 100%;
  min-height: 100%;
  margin-right: 15px;
  padding: 10px 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
}
</style>
