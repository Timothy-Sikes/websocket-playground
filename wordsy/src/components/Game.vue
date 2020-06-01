<template>
  <div class="game">
    <board v-bind:board="board"/>
  </div>
</template>

<script>

import Board from "@/components/Board.vue";

var _ = require('lodash');

var cardConfig = [
  { letter: "B", bonus: 0, quantity: 4},
  { letter: "C", bonus: 0, quantity: 4},
  { letter: "D", bonus: 0, quantity: 4},
  { letter: "F", bonus: 1, quantity: 2},
  { letter: "G", bonus: 0, quantity: 4},
  { letter: "H", bonus: 1, quantity: 2},
  { letter: "J", bonus: 2, quantity: 1},
  { letter: "L", bonus: 0, quantity: 4},
  { letter: "M", bonus: 0, quantity: 4},
  { letter: "N", bonus: 0, quantity: 4},
  { letter: "P", bonus: 0, quantity: 4},
  { letter: "Q", bonus: 2, quantity: 1},
  { letter: "R", bonus: 0, quantity: 4},
  { letter: "S", bonus: 0, quantity: 4},
  { letter: "V", bonus: 1, quantity: 2},
  { letter: "W", bonus: 1, quantity: 2},
  { letter: "X", bonus: 2, quantity: 1},
  { letter: "Y", bonus: 1, quantity: 2},
  { letter: "Z", bonus: 1, quantity: 1},
]

var deck;
var discard = [];

function buildDeck(config) {
  var cards = []
  config.forEach(card => {
    for(var i = 0; i < card.quantity; i++) {
      cards.push({letter: card.letter, bonus: card.bonus})
    }
  });

  return cards;
}

function isValidBoardState(board) {
  // if the board has more than 2 of a letter, it is bad.
  // if a board has more than 2 of any bonus, it is bad.
  var byLetter = _.groupBy(board, "letter");
  var byBonus = _.groupBy(
    _.filter(board, function(o) {
      return o.bonus != 0;}),
    "bonus");
    
  var letterTotals = []
  for (let [key, value] of Object.entries(byLetter)) {
    letterTotals.push(value.length);
  }
  var anyOverTwoByLetter = _.some(letterTotals, function(o) { return o > 2 });
  console.log(byLetter);

  var bonusTotals = []
  for (let [key, value] of Object.entries(byBonus)) {
    bonusTotals.push(value.length);
  }
  var anyOverTwoByBonus = _.some(bonusTotals, function(o) { return o > 2 });
  console.log(byBonus);

  return !anyOverTwoByBonus && !anyOverTwoByLetter;
}

function buildBoard(deck) {
  var board = []
  for (var i=0; i < 8; i++) {
    var card = deck.pop();
    board.push(card);
    
    if (!isValidBoardState(board)) {
      discard.push(board.pop())
      i--;
    }
  }
  return { board : board };
}

function getBoard() {
  deck = buildDeck(cardConfig);
  deck = _.shuffle(deck);
  return buildBoard(deck);
}

export default {
  name: "Game",
  props: {
  },
  components: {
    Board
  },
  data: function () {
    return getBoard();
  }
};

</script>

<style scoped>
</style>
