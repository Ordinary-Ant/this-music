<template>
  <div class="music-container">
    <LeftNav @getIndex="getIndex"/>
    <RightList :singList="singList"/>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, ref, watch } from '@vue/runtime-core'
import LeftNav from '@/components/newmusic/LeftNav.vue'
import RightList from '@/components/newmusic/RightList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'NewMusic',
  emits: ['getIndex'],
  setup () {
    const singList = ref(null)
    const listIndex = ref(0)

    // 定义自定义事件用于改变index
    const getIndex = (index) => {
      listIndex.value = index
    }

    // 根据index获取对应的歌曲数据
    const showList = async () => {
      const all = await request('/top/song', { type: listIndex.value })
      singList.value = markRaw(all.data.splice(0, 15))
    }

    onMounted(() => {
      showList()
    })

    // 监听index变化
    watch(listIndex, () => {
      showList()
    })
    return {
      getIndex,
      singList
    }
  },
  components: {
    LeftNav,
    RightList
  }
})
</script>
<style lang="less" scoped>
.music-container{
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
