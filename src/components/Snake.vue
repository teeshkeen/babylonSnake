<template>
  <div>
    <h3>Snake</h3>
    <canvas class="renderCanvas"></canvas>
  </div>
</template>
<script lang="ts">

import { defineComponent, render } from 'vue';
import { MainScene } from '@/babylon/MainScene'

export default defineComponent({
  name: 'Snake-Snack',
  mounted() {
    const renderCanvas: HTMLCanvasElement = document.querySelector('.renderCanvas')!;
    new MainScene(renderCanvas);
  }
});
</script>

<style scoped>
canvas {
  width: 90%;
  height: 90%;
}
</style>
