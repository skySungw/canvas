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
      //转盘参数
      canvasParams:  {
        width: 375, //转盘宽度
        height: 375, //转盘高度
        bgcolor: '#5a9cff', //背景颜色
        border: 375 * 0.06, //转盘边框
        lightnum: 24, //背景灯个数
        lightwid: 375 * 0.036 //背景灯大小
      },
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
        this.ctx.save();
        canvasMethods[v]();
        this.ctx.restore();
      })
      this.list = list;
      // 绑定事件
      this.addListenerEvent();
    },
    getCanvasMethods() {
      const that = this;
      const canvas = this.canvas;
      const ctx = this.ctx;
      const { width, height, canvasParams } = this;
      const border = canvasParams.border;
      return {
        drawBgCircle() {
          ctx.beginPath()
          let clg = ctx.createLinearGradient(0, 0, 0, width);
          clg.addColorStop(0,'#fed149');
          clg.addColorStop(1,'#ff7d05');
					ctx.fillStyle = clg;
          ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
          // 内部圆
          ctx.beginPath()
          ctx.fillStyle = '#FFFFFF'
          ctx.arc(width / 2, width / 2, width / 2 - border, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();

					that.bglight('#FFFFFF','#ffcf4d');
          that.bglightani();
        },
        drawInnerCicel() {
           // 内部圆
          ctx.beginPath()
          ctx.fillStyle = '#000'
          ctx.arc(width / 2, width / 2, width / 2 - border, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }
    },
    // 加事件监听
    addListenerEvent() {
      const that = this;
      const list = this.getCanvasMethods();
      const canvas = this.canvas;
      const ctx = this.ctx;
      const methodsName = this.list;
      this.canvas.addEventListener('click', function (e) {
        const canvasInfo = canvas.getBoundingClientRect()
        methodsName.forEach(v => {
          // 扫行当前画布绘画方法
          ctx.save();
          list[v]();
          ctx.restore();
          // 判断点击事件，是否在此图像内
          const flag = ctx.isPointInPath(e.clientX - canvasInfo.left, e.clientY - canvasInfo.top);
          if (flag) {
            that.callBackFn[v] && that.callBackFn[v]();
          }
        })
      })
    },
    //周边背景灯
    bglight(cor1, cor2){
      const { canvasParams } = this;
      const ctx = this.ctx;
      for(let i = 0; i< canvasParams.lightnum; i++){
        if(i % 2 == 0){
          ctx.fillStyle = cor1;
        }else{
          ctx.fillStyle = cor2;
        }
        ctx.beginPath()
        ctx.arc(canvasParams.width / 2 + (canvasParams.width / 2 - canvasParams.border / 2) * Math.cos(360 / canvasParams.lightnum * i * Math.PI/180 ), canvasParams.width / 2 + (canvasParams.width / 2 - canvasParams.border / 2) * Math.sin(360 / canvasParams.lightnum * i * Math.PI / 180), canvasParams.lightwid / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    },
    //周边背景灯动态
    bglightani(){
      let that = this;
      let i=0;
      setInterval(function(){
        i++;
        if(i%2 == 0){
          that.bglight('#FFFFFF','#ffcf4d')
        } else {
          that.bglight('#ffcf4d','#FFFFFF')
        }
      },600)
    }
  }
})
</script>