<template>
  <div class="container flex">
    <div class="canvas-box">
      <canvasComponent />
    </div>
    <div class="flex-1">
      我是右侧预览以及其它操作占位的
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import interfaceType from '../interface/index';
import canvasComponent from '../components/canvas.vue';
export default defineComponent({
  name: 'home',
  components: {
    canvasComponent
  },
  data() {
    return {
      title: 'Canvas系统'
    } as interfaceType
  }
})
</script>
<style scoped>
.container .canvas-box {
  margin-left: 200px;
  border: 1px dashed #000;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>