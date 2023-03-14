<template>
  <ul v-if="cardList && cardList.length" class="cards">
    <li
      v-for="card in cardList"
      :key="card.id"
      @click="editCard(card, col.name)"
      class="card"
    >
    <card-item :card="card" @open-modal="openCardModal"></card-item>
    </li>
    <tr-modal
        btnText="Удалить задачу"
        :isOpened="createCardModal"
        :cancel-action="true"
        @mSubmit="removeCard"
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
  <create-card :column-id="colId" @card-created="addCard" />
</template>

<script setup>
import CreateCard from "@/components/CreateCard.vue";
import CardEdit from "@/components/CardEdit.vue";
import CardItem from "@/components/CardItem.vue";
import TrModal from "@/components/kit/TrModal.vue";
import useAuthStore from "@/stores/auth";
import { deleteCard, getCardList } from "@/api/api";
import { ref, defineProps, defineEmits, onMounted } from "vue";

const auth = useAuthStore();

const props = defineProps(["colId", "col"]);
const emit = defineEmits([]);

const cardEdited = ref(null);
const cardEditedColName = ref("update-columns");

const createModal = ref(false);

const createCardModal = ref(false);

const deleteCardId = ref(null);

const cardList = ref(null);
onMounted(async () => {
  if (!props.colId) return;

  const resp = await getCardList(props.colId, auth.token);

  cardList.value = resp.data;
  console.log(cardList);
});

const openModal = () => {
  createModal.value = true;
};
const closeModal = () => {
  createModal.value = false;
};

const openCardModal = (cardId) => {
  createCardModal.value = true;
  deleteCardId.value = cardId;
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

const removeCard = async () => {
  const resp = await deleteCard(deleteCardId.value, auth.token);

  if (resp.status === 200) {
    const cardIdx = cardList.value.findIndex((item) => {
      return item.id === deleteCardId.value;
    });

    cardList.value.splice(cardIdx, 1);
  }
  closeCardModal();
};
</script>

<style scoped>
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
</style>
