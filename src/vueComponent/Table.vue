<script setup lang='ts'>
import {useSlots} from 'vue'
const props = defineProps<{}>()
const slots = useSlots()
const hasSlot = (name:string) => !!slots[name];
</script>

<template>
    <table class="marked-vue-table" >
        <thead class="marked-vue-thead"><slot name="header"></slot></thead>
        <tbody class="marked-vue-tbody" v-if="hasSlot('default')"><slot></slot></tbody>
    </table>
</template>

<style></style>