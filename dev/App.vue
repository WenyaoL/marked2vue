<script setup lang='ts'>
import ExampleView from './ExampleView.vue';
import MoreExampleView from './MoreExampleView.vue';
import MarkedView from './MarkedView.vue';
import MyExampleView from './MyExampleView.vue';
</script>

<template>
  <div class="home">

    <div class="moreExampleView">
      <MoreExampleView />
    </div>

    <div>****************************************************************************************************</div>

    <div class="exampleView">
      <ExampleView />
    </div>

    <div>****************************************************************************************************</div>

    <div class="exampleView">
      <MarkedView />
    </div>

    <div>****************************************************************************************************</div>

    <div class="myexampleView">
      <MyExampleView />
    </div>
  </div>
</template>