var _ = require("lodash");

class Game {
  constructor() {
    this.deck = this.buildDeck();
    this.discard = [];
    this.board = [];
  }

  buildDeck() {
    var cardConfig = [
      { letter: "B", bonus: 0, quantity: 4 },
      { letter: "C", bonus: 0, quantity: 4 },
      { letter: "D", bonus: 0, quantity: 4 },
      { letter: "F", bonus: 1, quantity: 2 },
      { letter: "G", bonus: 0, quantity: 4 },
      { letter: "H", bonus: 1, quantity: 2 },
      { letter: "J", bonus: 2, quantity: 1 },
      { letter: "L", bonus: 0, quantity: 4 },
      { letter: "M", bonus: 0, quantity: 4 },
      { letter: "N", bonus: 0, quantity: 4 },
      { letter: "P", bonus: 0, quantity: 4 },
      { letter: "Q", bonus: 2, quantity: 1 },
      { letter: "R", bonus: 0, quantity: 4 },
      { letter: "S", bonus: 0, quantity: 4 },
      { letter: "V", bonus: 1, quantity: 2 },
      { letter: "W", bonus: 1, quantity: 2 },
      { letter: "X", bonus: 2, quantity: 1 },
      { letter: "Y", bonus: 1, quantity: 2 },
      { letter: "Z", bonus: 1, quantity: 1 }
    ];

    var cards = [];
    cardConfig.forEach(card => {
      for (var i = 0; i < card.quantity; i++) {
        cards.push({ letter: card.letter, bonus: card.bonus });
      }
    });

    return cards;
  }

  createBoard() {
    this.addToBoard(8);
  }

  addToBoard(numTimes) {
    for (var i = 0; i < numTimes; i++) {
      var card = this.deck.pop();
      this.board.unshift(card);

      if (!this.isValidBoardState(this.board)) {
        this.discard.push(this.board.pop());
        i--;
      }
      if (this.deck.length === 0) {
        this.deck = _.shuffle(this.discard);
        this.discard = [];
      }
    }
  }

  isValidBoardState() {
    // if the board has more than 2 of a letter, replace the letter.
    // if a board has more than 2 of any bonus, replace the letter.
    var byLetter = _.groupBy(this.board, "letter");
    var byBonus = _.filter(this.board, function(o) {
      return o.bonus != 0;
    });

    var letterTotals = [];
    for (let [key, value] of Object.entries(byLetter)) {
      letterTotals.push(value.length);
    }
    var anyOverTwoByLetter = _.some(letterTotals, function(o) {
      return o > 2;
    });

    var bonusTotals = [];
    for (let [key, value] of Object.entries(byBonus)) {
      bonusTotals.push(value.length);
    }
    var anyOverTwoByBonus = bonusTotals.length > 2;

    return !anyOverTwoByBonus && !anyOverTwoByLetter;
  }

  rotateBoard(numTimes = 4) {
    var removed = this.board.splice(-numTimes, numTimes);

    this.discard = this.discard.concat(removed);
    this.addToBoard(numTimes);
  }

  toJson() {
    return {
      board: this.board,
      deck: this.deck,
      discard: this.discard
    };
  }
}

module.exports = Game;