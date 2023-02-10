<template>
  <div class="s">
    <div class="navigation">
      <div class="controls">
        <div class="column-name">Название колонки</div>
        <div class="card-name">Название задачи</div>
      </div>
      <div class="submit-button">Сохранить</div>
    </div>
    <textarea
      class="summary"
      name="summary"
      id=""
      cols="120"
      rows="5"
    ></textarea>
    <br />
    <textarea
      class="description"
      name="description"
      id=""
      cols="120"
      rows="15"
    ></textarea>
  </div>
</template>

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
