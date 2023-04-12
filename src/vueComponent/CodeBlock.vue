<script setup lang='ts'>
const props = defineProps<{}>()
</script>

<template>
    <pre class="marked-vue-fence"><slot></slot></pre>
</template>

<style>
.marked-vue-fence{
    font-size: 13.5px;
    border: 1px solid #e7eaed;
    border-radius: 5px;
    background-color: #f6f6f6;
}
</style>