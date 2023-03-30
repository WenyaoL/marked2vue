<script setup lang='ts'>
const props = defineProps<{text:string}>()
</script>

<template>
    <code class="marked-vue-codeInline">{{ text }}</code>
</template>

<style scoped>
.marked-vue-codeInline{
    border: 1px solid #e7eaed;
    border-radius: 3px;
    color: #e83e8c;
    background-color: #f6f6f6;
    font-size: large;
}
</style>