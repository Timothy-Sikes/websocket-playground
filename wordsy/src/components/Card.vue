<template>
  <div class="card">
    <p>{{card}} {{bonus}}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: String,
    bonus: String,
  }
};
</script>

<style scoped>
</style>
