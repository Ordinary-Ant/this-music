<template>
  <div class="mvRank-container">
    <div class="mvRank-title">
      排行榜<i class="iconfont icon-xiangyou1" @click="$router.push('/mvranking')"></i>
    </div>
    <div class="mvRank-list">
      <div class="mvRank-item" v-for="(item, index) in rankList" :key="item.id">
        <div class="rank"><b>{{ index + 1 }}</b><span>-</span></div>
        <div class="mv-info">
          <img :src="item.cover + '?param=360y202'" alt="">
          <span class="hot"><i class="iconfont icon-huo"></i>{{ item.playCount }}</span>
          <div class="info">
            <p>{{ item.name }}</p>
            <span>{{ item.artistName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'MVRank',
  props: {
    rankList: {
      type: Array,
      require: true
    }
  },
  setup () {
    return {
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.mvRank-container{
  margin-top: 20px;
  .mvRank-title{
    color: #fff;
    font-size: 26px;
    letter-spacing: 3px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .mvRank-list{
    display: flex;
    flex-wrap: wrap;
    .mvRank-item{
      width: 49%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 20px;
      box-sizing: border-box;
      &:nth-child(odd){
        margin-right: 1%;
      }
      .rank{
        width: 10%;
        display: flex;
        flex-direction: column;
        color: #fff;
        align-items: flex-start;
        span{
          margin-left: 4px;
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
          width: 60%;
          height: auto;
          margin-right: 5%;
          border-radius: 5px;
        }
        .info{
          letter-spacing: 2px;
          p{
            color: #fff;
            margin-top: 0;
          }
          span{
            color: #ccc;
            font-size: 14px;
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
}
</style>
