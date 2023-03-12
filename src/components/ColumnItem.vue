<template>
  <div class="column">
    <h3 class="column-title">{{ column.name }}</h3>
    <font-awesome-icon
      @click="openColModal"
      icon="fa-solid fa-trash"
      title="Удалить колонку"
      class="icon"
    />
    <tr-modal
      btnText="Удалить колонку"
      :isOpened="useModal"
      :cancel-action="true"
      @mSubmit="removeColumn(column.id)"
      @mClose="closeColModal"
    />
  </div>
  <ul v-if="cardList && cardList.length" class="cards">
    <li
      v-for="card in cardList"
      :key="card.id"
      @click="editCard(card, column.name)"
      class="card"
    >
      <div class="card_name">{{ card.name }}</div>
      <div class="card_summary">{{ card.summery }}</div>
      <font-awesome-icon
        @click.stop="openCardModal"
        icon="fa-solid fa-trash"
        title="Удалить задачу"
        class="card-icon"
      />
    </li>
    <tr-modal
      btnText="Удалить задачу"
      :isOpened="createCardModal"
      :cancel-action="true"
      @mSubmit="removeCard(card.id)"
      @mClose="closeCardModal"
    />
  </ul>
  <tr-modal
    :hide-submit="true"
    btnText="Добавить задачу"
    :isOpened="createModal"
    :modalWidth="1000"
    @mClose="closeModal"
    class="modal-edit"
  >
    <template v-slot:modal-body>
      <card-edit
        :card="cardEdited"
        :col-name="cardEditedColName"
        @update-card="updateCard"
      />
    </template>
  </tr-modal>
  <create-card :column-id="column.id" @card-created="addCard" />
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";
import { getCardList, deleteColumn, deleteCard } from "@/api/api";
import CreateCard from "@/components/CreateCard.vue";
import TrModal from "@/components/kit/TrModal.vue";
import CardEdit from "@/components/CardEdit.vue";

import useAppStore from "@/stores/app";
const app = useAppStore();

import useAuthStore from "@/stores/auth";
const auth = useAuthStore();

const props = defineProps(["column"]);
const emit = defineEmits(["update-columns"]);

const cardList = ref(null);
const createModal = ref(false);
const useModal = ref(false);
const createCardModal = ref(false);
const cardEdited = ref(null);
const cardEditedColName = ref("");

onMounted(async () => {
  if (!props.column.id) return;

  const resp = await getCardList(props.column.id, auth.token);

  cardList.value = resp.data;
});
const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
};

const openColModal = () => {
  useModal.value = true;
};

const closeColModal = () => {
  useModal.value = false;
};

const openCardModal = () => {
  createCardModal.value = true;
};

const closeCardModal = () => {
  createCardModal.value = false;
};

const editCard = (card, columnName) => {
  openModal();
  cardEdited.value = card;
  cardEditedColName.value = columnName;
};

const updateCard = (upCard) => {
  const updatedCard = cardList.value.find((item) => {
    return item.id === upCard.id;
  });
  updatedCard.summery = upCard.summery;
  updatedCard.description = upCard.description;
  closeModal();

  emit("update-columns");
};

const addCard = (card) => {
  cardList.value.push(card);
};

const removeCard = async (id) => {
  const resp = await deleteCard(id, auth.token);

  if (resp.status === 200) {
    const cardIdx = cardList.value.findIndex((item) => {
      return item.id === id;
    });

    cardList.value.splice(cardIdx, 1);
  }
  closeColModal();
};

const removeColumn = async (id) => {
  const resp = await deleteColumn(id, auth.token);

  if (resp.status === 200) {
    const columnIdx = app.columnList.findIndex((item) => {
      return item.id === id;
    });

    app.columnList.splice(columnIdx, 1);
  }
  closeCardModal();
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

.card_name {
  font-weight: bold;
}

.card_summary {
  margin-right: 3px;
}

.card-icon {
  display: inline-block;
  position: absolute;
  right: 5px;
  bottom: 5px;
  margin-left: 5px;
}
</style>
