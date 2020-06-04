<template>
  <div class="cardRow">
    <span class="flexItemColumn">
      {{ letter1 || "" }} {{ bonus1 ? "(+" + bonus1 + ")" : "" }}
    </span>
    <span class="flexItemColumn">
      {{ letter2 || "" }} {{ bonus2 ? "(+" + bonus2 + ")" : "" }}
    </span>
    <span class="value">
      {{ value || "" }}
    </span>
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
    value: Number
  }
};
</script>

<style scoped>
.flexItemColumn {
  flex-grow: 1;
  flex-basis: 50px;
}
.cardRow {
  display: contents;
}
.value {
  font-weight: bolder;
}
</style>
