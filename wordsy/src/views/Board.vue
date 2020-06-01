<template>
  <div class="boardHolder">
    <Board :board="[
      {card: 'A', bonus: '', guid: 'abca'},
      {card: 'B', bonus: '', guid: 'babk'}
      ]" />
  </div>
</template>

<script>
// @ is an alias to /src
import Board from "@/components/Board.vue";

export default {
  name: "BoardView",
  components: {
    Board
  }
};
</script>
