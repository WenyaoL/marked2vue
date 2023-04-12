<script setup lang='ts'>
const props = defineProps<{ordered: any, start: string | number}>()
</script>

<template>
    <ol class="marked-vue-orderList" v-if="ordered" :start="start"><slot></slot></ol>
    <ul class="marked-vue-bulletList" v-else><slot></slot></ul>
</template>

<style>
.marked-vue-orderList{
    padding-inline-start: 35px;
}

.marked-vue-bulletList{
    padding-inline-start: 35px;
}
</style>