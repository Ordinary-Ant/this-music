<template>
  <div class="mv-container">
    <MVRank :rankList="rankList"/>
    <h2>
      全部MV
    </h2>
    <div class="mv-class">
      <div class="local">
        <span>地区</span>
        <ul>
            <li><a>全部</a></li>
            <li><a>华语</a></li>
            <li><a>欧美</a></li>
            <li><a>日本</a></li>
            <li><a>韩国</a></li>
            <li><a>其他</a></li>
        </ul>
      </div>
      <div class="gender">
        <span>类别</span>
        <ul>
            <li><a>全部</a></li>
            <li><a>男歌手</a></li>
            <li><a>女歌手</a></li>
            <li><a>乐队组合</a></li>
        </ul>
      </div>
      <div class="sort">
        <span>排序</span>
        <ul>
            <li><a>上升最快</a></li>
            <li><a>最热</a></li>
            <li><a>最新</a></li>
        </ul>
      </div>
    </div>
    <VideoList :video="allMv"/>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import MVRank from '@/components/mv/MVRank.vue'
import VideoList from '@/components/mv/videoList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'RecommendMv',
  setup () {
    const state = reactive({
      rankList: [],
      allMv: []
    })

    // 获取所有MV数据
    const getMV = async () => {
      const rank = await request('/top/mv', { limit: 10 })
      const mv = await request('/mv/all')
      state.rankList = markRaw(rank.data)
      state.allMv = markRaw(mv.data)
    }
    onMounted(() => {
      getMV()
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    MVRank,
    VideoList
  }
})
</script>
<style lang="less" scoped>
.mv-container{
  h2{
    color: #fff;
    letter-spacing: 2px;
    font-size: 26px;
    margin: 40px 0 0;
  }
  .mv-class{
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 10px;
    .local,.gender,.sort{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      span{
        line-height: 40px;
        color: #fff;
        letter-spacing: 3px;
        font-size: 18px;
        width: 80px;
        text-align: center;
        border-radius: 30px;
        background-image: linear-gradient(to right, #acb6e5 , #86fde8 );
        box-shadow: 0 3px 5px rgba(32,160,255,.5);
        margin-bottom: 20px;
      }
      ul{
        display: flex;
        list-style: none;
        margin: 0;
        li{
          margin: 0 20px;
          color: #ccc;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
