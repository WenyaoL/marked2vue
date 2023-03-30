<script setup lang='ts'>
const props = defineProps<{}>()
</script>

<template>
    <blockquote class="marked-vue-blockquote">
        <slot></slot>
    </blockquote>
</template>

<style scoped>
.marked-vue-blockquote {
    padding: 0 15px;
    color: #777;
    border-left: 4px solid #dfe2e5;
    margin-left: 10px;
}
</style>