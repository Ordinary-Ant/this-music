<template>
  <div class="video-list-container">
    <div class="video-item" v-for="v in video" :key="v.id">
      <div class="video-img">
        <img :src="v.imgurl ? v.imgurl + '?param=323y182' : v.cover + '?param=323y182'" alt="">
        <i class="iconfont icon-bofangliang nums">{{ v.playCount }}</i>
        <slot name="extend">
          <span><i class="iconfont icon-24gl-play"></i></span>
        </slot>
      </div>
      <p>{{ v.name }}</p>
      <span>{{ v.artistName }}</span>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'AduioList',
  props: {
    video: {
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
.video-list-container{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .video-item{
    width: 25%;
    padding: 0 20px;
    margin-bottom: 30px;
    box-sizing: border-box;
    .video-img{
      width: 100%;
      position: relative;
      img{
        width: 100%;
        height: auto;
        min-height: 150px;
        border-radius: 10px;
      }
      .nums{
        position: absolute;
        top: 10px;
        left: 10px;
        color: #fff;
      }
      span{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        background: transparent;
        right: 5px;
        bottom: 5px;
        color: #fff;
        display: none;
        transition: all .5s ease-in-out;
      }
      &:hover{
        span{
          display: block;
          background: rgba(0,0,0,.5);
        }
      }
    }
    p{
      margin: 10px 0;
      color: #fff;
      letter-spacing: 1px;
    }
    span{
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>
