<template>
  <div class="column">
    <div class="title">
      <h3 class="column-title">{{ column.name }}</h3>
      <font-awesome-icon
          @click="openColModal"
          icon="fa-solid fa-trash"
          title="Удалить колонку"
          class="icon"
      />
    </div>
    <tr-modal
      btnText="Удалить колонку"
      :isOpened="useModal"
      :cancel-action="true"
      @mSubmit="removeColumn(column.id)"
      @mClose="closeColModal"
    />
    <card-list :colId="column.id" :col="column" @update-columns="upCol"></card-list>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { deleteColumn } from "@/api/api";
import CardList from "@/components/CardList.vue";
import TrModal from "@/components/kit/TrModal.vue";

import useAppStore from "@/stores/app";
const app = useAppStore();

import useAuthStore from "@/stores/auth";
const auth = useAuthStore();

defineProps(["column"]);
const emit = defineEmits(["upCol"]);

const useModal = ref(false);

const openColModal = () => {
  useModal.value = true;
};

const closeColModal = () => {
  useModal.value = false;
};

const upCol = () => {
  emit("update-columns");
}

const removeColumn = async (id) => {
  const resp = await deleteColumn(id, auth.token);

  if (resp.status === 200) {
    const columnIdx = app.columnList.findIndex((item) => {
      return item.id === id;
    });

    app.columnList.splice(columnIdx, 1);
  }
  closeColModal();
};
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  display: inline-block;
  margin-bottom: 15px;
  cursor: pointer;
}

.column-title {
  margin-bottom: 15px;
}
</style>
