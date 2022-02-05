<template>
  <div class="MVRanking-container">
    <div class="mvranking-class">
      <ul @click="handleSetArea">
        <li :class="area === '内地' ? 'show' : ''">内地</li>
        <li :class="area === '港台' ? 'show' : ''">港台</li>
        <li :class="area === '欧美' ? 'show' : ''">欧美</li>
        <li :class="area === '日本' ? 'show' : ''">日本</li>
        <li :class="area === '韩国' ? 'show' : ''">韩国</li>
      </ul>
      <span>最近更新：今天<i class="iconfont icon-changjianwentixiangguanwenti"></i></span>
    </div>
    <RankingList :area="area"/>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/runtime-core'
import RankingList from '@/components/mvranking/RankingList.vue'
export default defineComponent({
  name: 'MVRanking',
  setup () {
    const state = reactive({
      area: ''
    })
    // 根据地区获取mv排行榜
    const handleSetArea = (e) => {
      if (e.target.tagName === 'UL') return
      state.area = e.target.textContent
    }
    return {
      ...toRefs(state),
      handleSetArea
    }
  },
  components: {
    RankingList
  }
})
</script>
<style lang="less" scoped>
.MVRanking-container{
  .mvranking-class{
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    ul{
      list-style: none;
      display: flex;
      li{
        padding: 10px 20px;
        color: #fff;
        letter-spacing: 3px;
        cursor: pointer;
        border-radius: 10px;
      }
    }
    span{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 30px;
      color: #ccc;
      font-size: 14px;
      i{
        margin-left: 5px;
      }
    }
  }
  .show{
    background-image: linear-gradient(to right, #acb6e5 , #86fde8 );

  }
}
</style>
