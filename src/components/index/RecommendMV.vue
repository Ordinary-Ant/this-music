<template>
  <div class="RecommdendMV-container">
    <div class="title" @click="$router.push('/recommendmv')">
      推荐MV<i class="iconfont icon-xiangyou1"></i>
    </div>
    <div class="RecommdendMV-list">
      <div class="list-item" v-for="mv in mvDoor" :key="mv.id">
        <div class="item-image">
          <img :src="mv.picUrl + '?param=465y260'" alt="">
        </div>
        <div class="info">
          <i class="iconfont icon-24gl-play"></i>
          <span>{{ mv.name }}</span>
          <span>{{ mv.artists.reduce((ans, s) => ans += ('/' + s.name), '').replace('/', '') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'RecommendMV',
  props: {
    mvDoor: {
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
.RecommdendMV-container{
  margin-top: 80px;
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
  .RecommdendMV-list{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .list-item{
      width: 32%;
      max-height: 260px;
      display: flex;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      .item-image{
        width: 100%;
        // height: 260px;
        height: auto;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        transition: all .6s ease-in-out;
        cursor: pointer;
        img{
          width: 100%;
          // height: 100%;
          border-radius: 10px;
          transform: scale(1);
          transition: transform 0.6s ease-in-out;
        }
        &:hover img{
          transform: scale(1.2);
        }
      }
      .info{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 55px;
        background: rgba(0, 0, 0, .5);
        padding: 10px;
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;
        span{
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 40px;
          box-sizing: border-box;
        }
        span:last-child{
          display: block;
          color: #ccc;
          font-size: 12px;
          letter-spacing: 1px;
          margin-top: 5px;
        }
         i{
          position: absolute;
          top: 8px;
          right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .8);
          text-align: center;
          line-height: 40px;
          color: #000;
          box-shadow: 0 0 10px rgba(0, 0, 0, .5);
          transition: all 0.6s ease-in-out;
        }
      }
    }
  }
}
</style>
