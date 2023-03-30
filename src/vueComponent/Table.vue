<script setup lang='ts'>
const props = defineProps<{}>()
</script>

<template>
    <table >
        <slot name="header"></slot>
        <slot></slot>
    </table>
</template>

<style scoped>

</style>