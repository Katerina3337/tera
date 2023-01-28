<template>
  <div>
    <h3>{{ column.name }} |id: {{ column.id }}|</h3>
    <ul v-if="cardList && cardList.length">
      <li v-for="card in cardList" :key="card.id">
        {{ card.name }} <br />
        {{ card.summery }}
      </li>
    </ul>

    <create-card :column-id="column.id" @card-created="addCard" />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import axios from "axios";
import CreateCard from "@/components/CreateCard.vue";

import useAuthStore from "@/stores/auth";

const auth = useAuthStore();
const cardList = ref(null);

const props = defineProps(["column"]);

onMounted(async () => {
  if (!props.column.id) return;

  const resp = await axios.get(
    `http://localhost:3001/card/get-column-cards/${props.column.id}`,
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );

  cardList.value = resp.data;
});

const addCard = (card) => {
  cardList.value.push(card);
};
</script>
