<template>
  <div>
    <div class="column">
      <h3 class="column-title">{{ column.name }} |id: {{ column.id }}|</h3>
      <font-awesome-icon
        @click="deleteColumn(column.id)"
        icon="fa-solid fa-trash"
        title="Удалить колонку"
        class="icon"
      />
    </div>
    <ul v-if="cardList && cardList.length" class="cards">
      <li
        v-for="card in cardList"
        :key="card.id"
        @click="editCard(card, column.name)"
        class="card"
      >
        {{ card.name }} <br />
        {{ card.summery }}
        <font-awesome-icon
          @click="deleteCard(card.id)"
          icon="fa-solid fa-trash"
          title="Удалить задачу"
          class="card-icon"
        />
      </li>
    </ul>
    <tr-modal
      :hide-submit="true"
      btnText="Добавить задачу"
      :isOpened="createModal"
      :modalWidth="1000"
      @mClose="closeModal"
    >
      <template v-slot:modal-body>
        <card-edit :card="cardEdited" :col-name="cardEditedColName" />
      </template>
    </tr-modal>
    <create-card :column-id="column.id" @card-created="addCard" />
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import axios from "axios";
import CreateCard from "@/components/CreateCard.vue";
import TrModal from "@/components/kit/TrModal.vue";
import CardEdit from "@/components/CardEdit.vue";

import useAppStore from "@/stores/app";
const app = useAppStore();

import useAuthStore from "@/stores/auth";

const auth = useAuthStore();
const cardList = ref(null);

const createModal = ref(false);
const cardEdited = ref(null);
const cardEditedColName = ref("");

const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
};

const editCard = (card, columnName) => {
  openModal();
  cardEdited.value = card;
  cardEditedColName.value = columnName;
};

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

const deleteCard = async (id) => {
  const resp = await axios.delete(
    `http://localhost:3001/card/delete-card/${id}`,
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );

  console.log(resp);
  console.log(resp.status === 200);
  if (resp.status === 200) {
    const cardIdx = cardList.value.findIndex((item) => {
      return item.id === id;
    });

    cardList.value.splice(cardIdx, 1);
  }
};

const deleteColumn = async (id) => {
  const resp = await axios.delete(
    `http://localhost:3001/columns/delete-column/${id}`,
    {
      headers: {
        Authorization: auth.token,
      },
    }
  );

  console.log(resp);
  console.log(resp.status === 200);
  console.log(app.columnList);
  if (resp.status === 200) {
    const columnIdx = app.columnList.findIndex((item) => {
      return item.id === id;
    });

    app.columnList.splice(columnIdx, 1);
  }
};
</script>

<style scoped>
.column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  display: block;
  margin-bottom: 15px;
  cursor: pointer;
}

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
  position: relative;
  color: #5d5a88;
  background-color: #d4d2e3;
  border-radius: 5px;
  cursor: pointer;
}

.card-icon {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
