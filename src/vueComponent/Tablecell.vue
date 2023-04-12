<script setup lang='ts'>
const props = defineProps<{flags: { header: any; align: any; }}>()
</script>

<template>
    <th class="marked-vue-th" v-if="flags.header" :align="flags.align"><slot></slot></th>
    <td class="marked-vue-td" v-else :align="flags.align"><slot></slot></td>
</template>

<style>

</style>