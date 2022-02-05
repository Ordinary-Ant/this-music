<template>
  <div class="mvranklist-container">
    <div class="mvranklist-item" v-for="(item, index) in list" :key="item.id">
      <div class="rank"><b>{{ index + 1 }}</b><span :class="item.lastRank > 0 ? 'top' : 'down'">{{ item.lastRank > 0 ? '↑' + item.lastRank : '↓' + item.lastRank }}</span></div>
        <div class="mv-info">
          <img :src="item.cover + '?param=394y222'" alt="">
          <span class="hot"><i class="iconfont icon-huo"></i>{{ item.playCount }}</span>
          <div class="info">
            <p>{{ item.name }}</p>
            <span>{{ item.artistName }}</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import request from '@/api/request'
export default defineComponent({
  name: 'RankingList',
  props: {
    area: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      list: []
    })

    // 获取mv榜信息
    const getMvRank = async () => {
      const all = await request('/top/mv', { area: props.area, limit: 50 })
      state.list = all.data
    }

    watch(() => props.area, () => {
      getMvRank()
    })

    onMounted(() => {
      getMvRank()
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less" scoped>
.mvranklist-container{
  display: flex;
  flex-wrap: wrap;
  .mvranklist-item{
    width: 33.3%;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 0 20px;
    box-sizing: border-box;
    .rank{
      width: 10%;
      display: flex;
      flex-direction: column;
      color: #fff;
      align-items: flex-start;
      b{
        margin-left: 5px;
      }
      span{
        font-size: 14px;
        font-weight: bold;
      }
      .top{
        color: green;
      }
      .down{
        color: red;
      }
    }
    .mv-info{
      flex: 1;
      display: flex;
      align-items: center;
      margin: 5px 0 5px 5px;
      box-shadow: -1px 0 10px rgba(#70adb5, .7),-2px 0 10px rgba(#555574, .7);
      border-radius: 5px;
      position: relative;
      img{
        width: 100%;
        min-height: 187px;
        height: auto;
        border-radius: 5px;
      }
      .info{
        position: absolute;
        bottom: 5px;
        letter-spacing: 2px;
        display: block;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        text-align: center;
        p{
          color: #fff;
          margin: 0 0 5px;
          font-weight: bold;
        }
        span{
          color: #ccc;
          font-weight: bold;
          font-size: 12px;
        }
      }
      .hot{
        position: absolute;
        top: 10px;
        left: 10px;
        color: #666;
      }
    }
  }
}
</style>
