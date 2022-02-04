<template>
  <div class="station-container">
    <BannerAndClass :banners="banners" :catelist="catelist"/>
    <div v-if="recommends['情感']">
      <RecommendDJList v-for="(recommend, index) in recommends" :key="index" :recommend="recommend"/>
    </div>
  </div>
</template>
<script>
import request from '@/api/request'
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import BannerAndClass from '@/components/station/BannerAndClass.vue'
import RecommendDJList from '@/components/station/RecommendDJList.vue'
export default defineComponent({
  name: 'Station',
  setup () {
    const state = reactive({
      banners: [],
      catelist: [],
      recommends: {}
    })
    // 获取电台所有数据
    const getAllStation = async () => {
      const banners = await request('/dj/banner')
      const catelist = await request('/dj/catelist')
      state.banners = markRaw(banners.data)
      state.catelist = markRaw(catelist.categories)
      // 分类数据合并再分类
      catelist.categories.map(async cate => {
        const temp = await request('/dj/recommend/type', { type: cate.id })
        if (temp.djRadios.length) {
          temp.djRadios.map(dj => {
            if (dj.category.length) {
              state.recommends[dj.category] ? state.recommends[dj.category].push(markRaw(dj)) : state.recommends[dj.category] = markRaw([])
            }
          })
        }
      })
      // const recommend = await request('/dj/category/recommend')
      // recommend.data.map(async recomm => {
      //   const temp = await request('/dj/radio/hot', { cateId: recomm.categoryId, limit: 10 })
      //   state.recommends.push({ name: recomm.categoryName, list: temp.djRadios.slice(0, 10) })
      // })

      console.log(state)
    }
    onMounted(() => {
      getAllStation()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    BannerAndClass,
    RecommendDJList
  }
})
</script>
<style lang="less" scoped>
.station-container{
  margin-top: 40px;
}
</style>
