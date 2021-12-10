<template>
  <div class="seemArt-container">
    <SingerList :singers="artists"/>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted, watch, toRefs, markRaw } from '@vue/runtime-core'
import request from '@/api/request'
import SingerList from '@/components/singer/SingerList.vue'
export default defineComponent({
  name: 'SingerSeemArt',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      artists: []
    })

    // 获取相似歌手
    const getSingerSeemArt = async () => {
      const seemArt = await request('/simi/artist', { id: props.id })
      state.artists = markRaw(seemArt.artists)
    }

    onMounted(() => {
      getSingerSeemArt()
    })
    // 监听id变化
    watch(() => props.id, () => {
      getSingerSeemArt()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    SingerList
  }
})
</script>
<style lang="less" scoped>
</style>
