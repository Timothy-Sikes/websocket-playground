<template>
  <div class="gameHolder">
    <GameManager />
  </div>
</template>

<script>
// @ is an alias to /src
import GameManager from "@/components/GameManager.vue";

export default {
  name: "GameView",
  components: {
    GameManager
  }
};
</script>
