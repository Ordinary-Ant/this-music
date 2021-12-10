<template>
  <div class="singerMv-container">
    <VideoList :video="mvs"/>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted, watch, toRefs, markRaw } from '@vue/runtime-core'
import request from '@/api/request'
import VideoList from '@/components/mv/videoList.vue'
export default defineComponent({
  name: 'SingerMV',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      mvs: []
    })

    // 获取歌手mv
    const getSingerMV = async () => {
      const mv = await request('/artist/mv', { id: props.id })
      state.mvs = markRaw(mv.mvs)
    }

    onMounted(() => {
      getSingerMV()
    })

    // 监听id变化
    watch(() => props.id, () => {
      getSingerMV()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    VideoList
  }
})
</script>
<style lang="less" scoped>
</style>
