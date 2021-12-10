<template>
  <div class="rank-container">
    <Official :OfficialList="OfficialList" />
    <Global :GlobalList="GlobalList" />
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import Official from '@/components/ranking/Official.vue'
import Global from '@/components/ranking/Global.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'Ranking',
  setup () {
    const state = reactive({
      OfficialList: [],
      GlobalList: []
    })
    // 获取所有排行榜数据
    const getAllRank = async () => {
      const rank = await request('/toplist')
      state.GlobalList = markRaw(rank.list.slice(4))

      const OfficialList = rank.list.slice(0, 4)
      OfficialList.forEach(async Official => {
        const OfficialSongs = await request('/playlist/detail', { id: Official.id })
        state.OfficialList.push(OfficialSongs.playlist)
      })
    }
    onMounted(() => {
      getAllRank()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    Official,
    Global
  }
})
</script>
<style lang="less" scoped>

</style>
