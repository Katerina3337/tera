<template>
  <div>
    <div class="navigation">
      <div class="controls">
        <div class="column-name">{{ colName }}</div>
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
import axios from "axios";
import useAuthStore from "@/stores/auth";

const auth = useAuthStore();

const props = defineProps(["card", "colName"]);
const emits = defineEmits(["updateCard"]);
const editedSummery = ref(props.card.summery);
const editedDescription = ref(props.card.description);

const updateCard = async () => {
  const resp = await axios.post(
    "http://localhost:3001/card/update-card",
    {
      ...props.card,
      summery: editedSummery.value,
      description: editedDescription.value,
    },
    {
      headers: {
        Authorization: auth.token,
      },
    }
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
.column-name,
.card-name,
.submit-button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 15px;
  color: #ffffff;
  background-color: #5d5a88;
  border: none;
  border-radius: 8px;
  cursor: pointer;
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
