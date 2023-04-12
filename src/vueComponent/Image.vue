<script setup lang='ts'>
const props = defineProps<{src:string,alt?:string,title?:string}>()
</script>

<template>
    <img class="marked-vue-img" :src="src" :alt="alt" :title="title"/>
</template>

<style>
.marked-vue-img{
    display: block;
    margin: 0 auto;
}
</style>