<template>
  <div>
    <div class="navigation">
      <div class="controls">
        <tr-select
          id="select_column"
          :options="app.columnList"
          v-model="cardColumn"
        />

        <div class="card-name">{{ card.name }}</div>
      </div>
      <div @click="updateCard" class="submit-button">Сохранить</div>
    </div>
    <textarea
      class="summary"
      name="summary"
      v-model="editedSummery"
      cols="120"
      rows="5"
    ></textarea>
    <br />
    <textarea
      class="description"
      name="description"
      v-model="editedDescription"
      cols="120"
      rows="15"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { postUpdateCard } from "@/api/api";
import TrSelect from "@/components/kit/TrSelect.vue";
import useAuthStore from "@/stores/auth";
import useAppStore from "@/stores/app";

const auth = useAuthStore();
const app = useAppStore();

const props = defineProps(["card", "colName"]);
const emits = defineEmits(["updateCard"]);
const editedSummery = ref(props.card.summery);
const editedDescription = ref(props.card.description);

const cardColumn = ref({ name: props.colName });
const updateCard = async () => {
  const resp = await postUpdateCard(
    props.card,
    editedSummery.value,
    editedDescription.value,
    cardColumn.value?.id,
    auth.token
  );

  if (resp.status === 200) {
    emits("updateCard", resp.data.card);
  }
};
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.controls {
  display: flex;
}

.card-name,
.submit-button {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 15px;
  font-size: 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.select_column option {
  background-color: #a4a2c4;
}

.select_column option:hover {
  background-color: #5d5a88;
}

.card-name {
  margin-left: 15px;
}
.summary,
.description {
  padding: 10px;
  border-radius: 8px;
  resize: none;
  outline: 0;
}
</style>
