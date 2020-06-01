<template>
  <div class="board">
    <card
      v-for="item in board"
      v-bind:key="item.guid"
      v-bind:letter="item.letter"
      v-bind:bonus="item.bonus" />

    <div class="board2">
      <div class="boardContainer">
        <div class="boardColumn">
          <span class="flexItemColumn"> a </span>
          <span class="flexItemColumn"> b +2 </span>
          <span class="flexItemColumn"> 5 </span>
        </div>
        <div class="boardColumn">
          <span class="flexItemColumn"> d </span>
          <span class="flexItemColumn"> e </span>
          <span class="flexItemColumn"> 4 </span>
        </div>
        <div class="boardColumn">
          <span class="flexItemColumn"> f </span>
          <span class="flexItemColumn"> g +3 </span>
          <span class="flexItemColumn"> 3 </span>
        </div>
        <div class="boardColumn">
          <span class="flexItemColumn"> h </span>
          <span class="flexItemColumn"> i </span>
          <span class="flexItemColumn"> 2 </span>
        </div>
      </div>
    </div>
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

  .boardContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-self: center;
    align-items: start;
  }

  .boardColumn {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-grow: 1;
  }
  .flexItemColumn {
    flex-grow: 1;
    flex-basis: 50px;
  }
</style>
