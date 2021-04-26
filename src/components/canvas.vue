<template>
  <canvas id="canvas">此浏览器不支持，请换用谷歌浏览器!</canvas>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Point from '../libs/Point.js';
import CallBackFn from '../libs/CallbackFn.js';
export default defineComponent({
  data() {
    return {
      width: 375,
      height: 500,
      canvas: null,
      ctx: null,
      callBackFn: new CallBackFn()
    };
  },
  mounted() {
    const canvas = document.querySelector('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.ctx = ctx;
    this.init();
  },
  methods: {
    // 初始化
    init() {
      let list = [];
      let canvasMethods = this.getCanvasMethods();
      Object.keys(canvasMethods).map(v => {
        list.push(v);
        canvasMethods[v]();
      })
      this.list = list;
      // 绑定事件
      this.addListenerEvent();
    },
    getCanvasMethods() {
      const ctx = this.ctx;
      return {
        draw1() {
          ctx.beginPath()
          ctx.moveTo(10, 10)
          ctx.lineTo(10, 50)
          ctx.lineTo(50, 50)
          ctx.lineTo(50, 10)
          ctx.fillStyle= 'black'
          ctx.fill()
        },
        draw2 () {
          ctx.beginPath()
          ctx.moveTo(100, 100)
          ctx.lineTo(100, 150)
          ctx.lineTo(150, 150)
          ctx.lineTo(150, 100)
          ctx.fillStyle= 'red'
          ctx.fill()
          ctx.closePath()
        }
      }
    },
    addListenerEvent() {
      const that = this;
      const list = this.getCanvasMethods();
      const canvas = this.canvas;
      const ctx = this.ctx;
      const methodsName = this.list;
      this.canvas.addEventListener('click', function (e) {
        const canvasInfo = canvas.getBoundingClientRect()
        methodsName.forEach(v => {
          list[v]();
          const flag = ctx.isPointInPath(e.clientX - canvasInfo.left, e.clientY - canvasInfo.top);
          console.log('flag', flag, v);
          if (flag) {
            that.callBackFn[v]();
          }
        })
      })
    }
  }
})
</script>