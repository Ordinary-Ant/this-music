<template>
  <Iswiper :banners="banners"/>
  <RecommendSingList :hasTaste="hasTaste"/>
  <RecommendNewSing :newSing="newSing"/>
  <PrivateContent :soleDoor="soleDoor"/>
  <RecommendMV :mvDoor="mvDoor"/>
  <!-- <Sidebar /> -->
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import Iswiper from '@/components/index/Iswiper.vue'
import RecommendSingList from '@/components/index/RecommendSingList.vue'
import RecommendNewSing from '@/components/index/RecommendNewSing.vue'
import PrivateContent from '@/components/index/PrivateContent.vue'
import RecommendMV from '@/components/index/RecommendMV.vue'
// import Sidebar from '@/components/common/Sidebar.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'Display',
  setup () {
    // 首页所有数据
    const state = reactive({
      banners: [],
      hasTaste: [],
      newSing: [],
      soleDoor: [],
      mvDoor: []
    })

    // 请求1：获取首页所有数据
    const getIndexAll = async () => {
      const banner = await request('/banner', { type: 0 })
      const singlist = await request('/personalized', { limit: 10 })
      const newsing = await request('/personalized/newsong', { limit: 12 })
      const soledoor = await request('/personalized/privatecontent')
      const mvdoor = await request('/personalized/mv')
      state.banners = markRaw(banner.banners)
      state.hasTaste = markRaw(singlist.result)
      state.newSing = markRaw(newsing.result)
      state.soleDoor = markRaw(soledoor.result)
      state.mvDoor = markRaw(mvdoor.result.splice(0, 3))
    }

    onMounted(() => {
      getIndexAll()
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    Iswiper,
    RecommendSingList,
    RecommendNewSing,
    PrivateContent,
    RecommendMV
  }
})
</script>
<style lang="less" scoped>

</style>
