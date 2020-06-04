<template>
  <div class="testTemplate">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "TestComponent",
  props: {
    msg: String
  }
};
</script>

<style scoped></style>
