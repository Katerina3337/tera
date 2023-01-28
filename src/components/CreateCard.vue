<template>
  <div>
    <h5>create card for column</h5>

    <input v-model="cardName" placeholder="cardName" type="text" /> <br />
    <input v-model="summery" placeholder="summery" type="text" /> <br />
    <textarea v-model="description" placeholder="description" /> <br />

    <button @click="createCard">create</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import axios from "axios";

import useAuthStore from "@/stores/auth";

const auth = useAuthStore();
const props = defineProps(["columnId"]);
const emit = defineEmits(["cardCreated"]);

const cardName = ref("");
const summery = ref("");
const description = ref("");

const createCard = async () => {
  if (!props.columnId) return;

  const resp = await axios.post(
    "http://localhost:3001/card/create-card",
    {
      name: cardName.value,
      summery: summery.value,
      description: description.value,
      column_id: props.columnId,
    },
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );
  console.log(resp.data.message);
  if (resp.data.card) {
    emit("cardCreated", resp.data.card);
  }
};
</script>
