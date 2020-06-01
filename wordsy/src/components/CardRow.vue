<template>
  <div class="cardRow">
    <p>
      {{letter1}} {{bonus1 ? "+" + bonus1 : ""}}
      {{letter2}} {{bonus2 ? "+" + bonus2 : ""}}
      {{letter3}} {{bonus3 ? "+" + bonus3 : ""}}
      {{letter4}} {{bonus4 ? "+" + bonus4 : ""}}
    </p>
  </div>
</template>

<script>
export default {
  name: "CardRow",
  props: {
    letter1: String,
    bonus1: Number,
    letter2: String,
    bonus2: Number,
    letter3: String,
    bonus3: Number,
    letter4: String,
    bonus4: Number,
  }
};
</script>

<style scoped>
</style>
