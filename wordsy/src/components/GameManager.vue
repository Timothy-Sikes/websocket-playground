<template>
  <div class="gameManager">
    <Game v-bind:board="board" />
    <button v-on:click="next">Next</button>
  </div>
</template>

<script>
import Game from "@/components/Game.vue";
import io from "socket.io-client";

export default {
  name: "GameManager",
  props: {},
  components: {
    Game
  },
  data: function() {
    return {
      socket: io("http://localhost:8000"),
      gameId: null,
      board: [
        { letter: "A", bonus: 2, guid: "abca" },
        { letter: "B", bonus: 0, guid: "babk" },
        { letter: "A", bonus: 2, guid: "e" },
        { letter: "B", bonus: 0, guid: "a" },
        { letter: "A", bonus: 2, guid: "eg" },
        { letter: "B", bonus: 0, guid: "zbn" },
        { letter: "A", bonus: 2, guid: "ye" },
        { letter: "B", bonus: 0, guid: "rq" }
      ]
    };
  },
  methods: {
    newGame: function() {
      this.socket.send(
        JSON.stringify({
          action: "newGame"
        })
      );
    },
    next: function(board) {
      this.socket.send(
        JSON.stringify({
          action: "rotateBoard",
          gameId: this._data.gameId
        })
      );
    },
    updateGame: function(data) {
      console.log("data");
      console.log(data);
      console.log("got the new board:");
      console.log(data.game.board);
      this.board = data.game.board;
      this.gameId = data.gameId;
    }
  },
  created() {
    this.socket.on("open", function open() {
      console.log("Connecting...");
    });

    var self = this;

    this.socket.on("message", function incoming(data) {
      console.log("Got a message!");
      var parsed = JSON.parse(data);

      if (parsed !== null && parsed !== '') {
        var response = "";

        switch (parsed.action) {
          case "newGame":
            console.log(this);
            console.log(self);
            response = self.updateGame(parsed);
            break;
          case "broadcastBoard":
            response = self.updateGame(parsed);
            break;
          case "OnStart":
            //response = this.onStart(parsed);
            console.log("got onStart Message.");
            break;
          default:
            console.log("Unknown action");
        }
      }
    });

    this.newGame();
  }
};
</script>

<style scoped></style>
