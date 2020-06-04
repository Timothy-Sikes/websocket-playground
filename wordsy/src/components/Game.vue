<template>
  <div class="game">
    <board v-bind:board="board" />
  </div>
</template>

<script>
import Board from "@/components/Board.vue";

export default {
  name: "Game",
  props: {
    board: Array
  },
  components: {
    Board
  },
  methods: {}
};
</script>

<style scoped></style>
