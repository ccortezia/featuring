<template>
  <div class="home">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default Vue.extend({
  name: 'home',
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > footer,
  > header {
    flex-shrink: 0;
  }

  > div {
    flex: 1 0 auto;
  }
}
</style>
