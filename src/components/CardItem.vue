<template>
  <div class="card_name">{{ card.name }}</div>
  <div class="card_summary">{{ card.summery }}</div>
  <font-awesome-icon
      @click.stop="openCardModal(card.id)"
      icon="fa-solid fa-trash"
      title="Удалить задачу"
      class="card-icon"
  />
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps(["card"]);
const emit = defineEmits(["remove-card", "open-modal"]);






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
</style>