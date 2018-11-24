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
