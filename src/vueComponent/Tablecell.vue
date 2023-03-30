<script setup lang='ts'>
const props = defineProps<{flags: { header: any; align: any; }}>()
</script>

<template>
    <th v-if="flags.header" :align="flags.align"><slot></slot></th>
    <td v-else :align="flags.align"><slot></slot></td>
</template>

<style scoped>

</style>