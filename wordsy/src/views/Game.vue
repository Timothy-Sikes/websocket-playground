<template>
  <div class="gameHolder">
    <Game :board="[
      {letter: 'A', bonus: 2, guid: 'abca'},
      {letter: 'B', bonus: 0, guid: 'babk'}
      ]" />
  </div>
</template>

<script>
// @ is an alias to /src
import Game from "@/components/Game.vue";

var _ = require('lodash');

export default {
  name: "GameView",
  components: {
    Game
  }
};

</script>
