<template>
    <p>{{letter}} {{bonus ? "+" + bonus : ""}}</p>
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
