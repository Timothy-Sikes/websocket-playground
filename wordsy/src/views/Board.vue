<template>
  <div class="boardHolder">
    <Board
      :board="[
        { letter: 'A', bonus: '', guid: 'abca' },
        { letter: 'B', bonus: '', guid: 'babk' }
      ]"
    />
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
