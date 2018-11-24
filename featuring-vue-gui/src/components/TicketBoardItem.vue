<template>
    <li>ITEM {{ id }}</li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        id: Number,
    },
});
</script>
