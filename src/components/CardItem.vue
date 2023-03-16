<template>
  <div class="card_name">{{ card.name }}</div>
  <div class="card_summary">{{ card.summery }}</div>
  <div class="color" :class="chosenColor"></div>
  <font-awesome-icon
      @click.stop="openCardModal(card.id)"
      icon="fa-solid fa-trash"
      title="Удалить задачу"
      class="card-icon"
  />
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue';

const props = defineProps(["card"]);
const emit = defineEmits(["remove-card", "open-modal"]);

const chosenColor = computed(() => {
  switch (props.card.priority) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "yellow";
    case 4:
      return "red";
  }
  return "";
});

const openCardModal = (cardId) => {
  emit("open-modal", cardId);
}

</script>

<style scoped>
.wrapper {
  position: static;
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


.color {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-bottom: 5px;
  border-radius: 50%;
}

.color:hover {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}

.blue {
  background-color: blue;
}
</style>