<template>
  <div class="test">
    <Test msg="Inside the test.vue view." />
  </div>
</template>

<script>
// @ is an alias to /src
import Test from "@/components/Test.vue";

export default {
  name: "TestView",
  components: {
    Test
  }
};
</script>
