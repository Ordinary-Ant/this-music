<template>
  <div class="MVRanking-container">
    <div class="mvranking-class">
      <ul>
        <li><a href="">内地</a></li>
        <li><a href="">港台</a></li>
        <li><a href="">欧美</a></li>
        <li><a href="">日本</a></li>
        <li><a href="">韩国</a></li>
      </ul>
      <span>最近更新：今天<i class="iconfont icon-changjianwentixiangguanwenti"></i></span>
    </div>
    <RankingList />
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
import RankingList from '@/components/mvranking/RankingList.vue'
export default defineComponent({
  name: 'MVRanking',
  setup () {
    return {
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
        a{
          text-decoration: none;
          color: #fff;
          letter-spacing: 3px;
        }
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
}
</style>
