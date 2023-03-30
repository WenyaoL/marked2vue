<script setup lang='ts'>
const props = defineProps<{ level: string | number, id?: string }>()
</script>

<template>
    <h1 class="marked-vue-heading1" :id="id" v-if="level == '1'">
        <slot></slot>
    </h1>
    <h2 class="marked-vue-heading2" :id="id" v-else-if="level == '2'">
        <slot></slot>
    </h2>
    <h3 class="marked-vue-heading3" :id="id" v-else-if="level == '3'">
        <slot></slot>
    </h3>
    <h4 class="marked-vue-heading4" :id="id" v-else-if="level == '4'">
        <slot></slot>
    </h4>
    <h5 class="marked-vue-heading5" :id="id" v-else-if="level == '5'">
        <slot></slot>
    </h5>
    <h6 class="marked-vue-heading6" :id="id" v-else>
        <slot></slot>
    </h6>
</template>

<style scoped>
.marked-vue-heading1 {
    font-size: 2em;
    border-bottom: 1px solid #eee;
}

.marked-vue-heading2 {
    font-size: 1.75em;
    border-bottom: 1px solid #eee;
}

.marked-vue-heading3 {
    font-size: 1.5em;
}

.marked-vue-heading4 {
    font-size: 1.25em;
}

.marked-vue-heading5 {
    font-size: 1.0em;
}

.marked-vue-heading6 {
    font-size: 0.8em;
}
</style>