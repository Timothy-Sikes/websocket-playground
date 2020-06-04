<template>
  <div class="board">
    <div class="board2">
      <div class="boardOuterContainer">
        <div class="boardContainer">
          <div class="boardColumn">
            <CardRow
              v-bind:letter1="board[0].letter"
              v-bind:bonus1="board[0].bonus"
              v-bind:letter2="board[1].letter"
              v-bind:bonus2="board[1].bonus"
              v-bind:value="5"
            />
          </div>
          <div class="boardColumn">
            <CardRow
              v-bind:letter1="board[2].letter"
              v-bind:bonus1="board[2].bonus"
              v-bind:letter2="board[3].letter"
              v-bind:bonus2="board[3].bonus"
              v-bind:value="4"
            />
          </div>
          <div class="boardColumn">
            <CardRow
              v-bind:letter1="board[4].letter"
              v-bind:bonus1="board[4].bonus"
              v-bind:letter2="board[5].letter"
              v-bind:bonus2="board[5].bonus"
              v-bind:value="3"
            />
          </div>
          <div class="boardColumn">
            <CardRow
              v-bind:letter1="board[6].letter"
              v-bind:bonus1="board[6].bonus"
              v-bind:letter2="board[7].letter"
              v-bind:bonus2="board[7].bonus"
              v-bind:value="2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardRow from "@/components/CardRow.vue";

export default {
  name: "Board",
  props: {
    board: Array
  },
  components: {
    CardRow
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

.boardOuterContainer {
  max-width: 500px;
  min-width: 350px;
  display: inline-block;
  font-size: 25px;
  font: bold;
}

.boardColumn {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  align-items: baseline;
  max-width: 100px;
  min-width: 75px;
}

.boardColumn:nth-child(even) {
  background: lightblue;
}

.boardColumn:nth-child(odd) {
  background: lightcyan;
}
</style>
