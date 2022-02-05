<template>
  <div class="recommend-container">
    <div class="title" @click="$router.push('/singsheet')">
      推荐歌单<i class="iconfont icon-xiangyou1"></i>
    </div>
    <div class="song-list">
      <div class="list-item" v-for="taste in hasTaste" :key="taste.id" @click="$router.push(`/singlesheet/${taste.id}`)">
        <div class="item-image">
          <i class="iconfont icon-24gl-play"></i>
          <div class="playes"><span class="iconfont icon-bofangliang">{{ Math.floor(taste.playCount / 10000) }}万</span></div>
          <img :src="taste.picUrl + '?param=240y245'" alt="">
        </div>
        <div class="item-title">{{ taste.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'RecommendSingList',
  props: {
    hasTaste: {
      type: Array,
      require: true
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.recommend-container{
  margin-top: 60px;
  .title{
    letter-spacing: 2px;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    i{
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .song-list{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      width: 18%;
      .item-image{
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        position: relative;
        // overflow: hidden;
        transition: all .6s ease-in-out;
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
          box-shadow: 0 3px 5px rgba(32,160,255,.5);
          transition: all .6s ease-in-out;
        }
        .playes{
          position: absolute;
          top: 20px;
          left: 20px;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }
        i{
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, .8);
          text-align: center;
          line-height: 40px;
          color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, .5);
          opacity: 0;
          cursor: pointer;
          transition: all 0.6s ease-in-out;
        }
        &:hover{
          box-shadow: 0 0 10px rgba(255,255,255,.5),
                      0 0 20px 5px rgba(255, 255, 255, .8);
          transform: translateY(-3%);
          i{
            opacity: 1;
          }
        }
      }
      .item-title{
        padding: 10px;
        text-align: left;
        color: #ccc;
        letter-spacing: 2px;
        font-size: 14px;
      }
    }
  }
}
</style>
