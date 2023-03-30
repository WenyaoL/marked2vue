<script setup lang='ts'>
const props = defineProps<{ level: string | number, id?: string }>()
</script>

<template>
    <h1 class="myHeading" :id="id" v-if="level == '1'">
        <slot></slot>
    </h1>
    <h2 class="myHeading" :id="id" v-else-if="level == '2'">
        <slot></slot>
    </h2>
    <h3 class="myHeading" :id="id" v-else-if="level == '3'">
        <slot></slot>
    </h3>
    <h4 class="myHeading" :id="id" v-else-if="level == '4'">
        <slot></slot>
    </h4>
    <h5 class="myHeading" :id="id" v-else-if="level == '5'">
        <slot></slot>
    </h5>
    <h6 class="myHeading" :id="id" v-else>
        <slot></slot>
    </h6>
</template>

<style scoped>
.myHeading{}

</style>