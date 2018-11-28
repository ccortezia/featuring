<template>
    <footer>
      <div class="author text-muted">
        Developed by <a href="https://github.com/ccortezia">@ccortezia</a>
      </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>


<style lang="less" scoped>
footer {
  display: flex;
  justify-content: center;
  padding: 15px;
  border: solid 2px grey;
  min-height: 50px;
  background-color: #333;

  .author {
    color: #f5f5f5;
  }
  .author a {
    color: #a2b3c6;
  }
  .author a:hover {
    color: #a2b3c6;
  }
}
</style>
