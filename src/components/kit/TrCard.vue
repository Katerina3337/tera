<template>
  <div class="tr-card">
    <slot name="card-body"></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.tr-card {
  width: 100%;
  max-width: 370px;
  display: inline-block;
  margin: 15px;
  padding: 10px;
  background-color: lightgrey;
  border-radius: 10px;
  box-shadow: 1px 1px 1px black;
}
</style>
