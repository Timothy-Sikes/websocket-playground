<template>
  <div class="board">
    <card
      v-for="item in board"
      v-bind:key="item.guid"
      v-bind:card="item.card"
      v-bind:bonus="item.bonus" />
  </div>
</template>

<script>

import Card from "@/components/Card.vue";

export default {
  name: "Board",
  props: {
    board: Array
  },
  components: {
    Card
  }
};
</script>

<style scoped>
</style>
