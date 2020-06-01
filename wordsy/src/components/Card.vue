<template>
  <div class="card">
    <p>{{letter}} {{bonus ? "+" + bonus : ""}}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    letter: String,
    bonus: Number,
  }
};
</script>

<style scoped>
</style>
