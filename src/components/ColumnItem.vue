<template>
  <div>
    <h3 class="column-title">{{ column.name }} |id: {{ column.id }}|</h3>
    <ul v-if="cardList && cardList.length" class="cards">
      <li v-for="card in cardList" :key="card.id" class="card">
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

<style scoped>
.column-title {
  margin-bottom: 15px;
}
.cards {
  padding: 0;
  list-style: none;
}
.card {
  margin-bottom: 15px;
  padding: 3px 7px;
  color: #5d5a88;
  background-color: #d4d2e3;
  border-radius: 5px;
  cursor: pointer;
}
</style>
