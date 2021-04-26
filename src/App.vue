<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
interface InterfaceData {
  title: string
  author: string
  year: string
}
export default defineComponent({
  data() {
    return {
      title: 'Vue 3 Guide',
      author: 'Vue Team',
      year: '333'
    } as InterfaceData
  },
  created() {
    let title: string = this.title;
    this.title = title + '333';
    console.log('this.title', this.title);
  }
})
</script>
