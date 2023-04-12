<script setup lang='ts'>
const props = defineProps<{href:string,title?:string}>()
</script>

<template>
    <a class="marked-vue-link" :href="href" :title="title"><slot></slot></a>
</template>

<style>
.marked-vue-link{
    color: #4183c4;
}
</style>