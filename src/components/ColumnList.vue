<template>
  <div class="column-list">
    <ul v-if="app.columnList?.length" style="display: flex" class="list">
      <li v-for="column in app.columnList" :key="column.id" class="column-item">
        <column-item :column="column" />
      </li>
    </ul>
    <create-column />
  </div>
</template>

<script setup>
import ColumnItem from "@/components/ColumnItem.vue";
import CreateColumn from "@/components/CreateColumn.vue";
import useAppStore from "@/stores/app";

const app = useAppStore();
</script>

<style scoped>
.column-list {
  display: flex;
  justify-content: start;
  align-items: flex-start;
  margin: 15px 30px;
  padding: 15px 15px;
  background-color: #a4a2c4;
  border-radius: 8px;
}
.list {
  padding: 0;
  list-style: none;
}
.column-item {
  margin-right: 15px;
  padding: 10px 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border-radius: 8px;
}
</style>
