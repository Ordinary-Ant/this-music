<template>
  <div class="swiper-container" v-if="banners.length">
    <el-carousel :interval="4000" direction="vertical" height="420px">
      <el-carousel-item v-for="banner in banners" :key="banner.encodeId">
        <img :src="banner.imageUrl + '?param=1160y420'" :alt="banner.typeTitle">
      </el-carousel-item>
    </el-carousel>
    <div class="index-menu">
      <div class="menu-item"><a @click.prevent="$router.push('/singer')"><i class="iconfont icon-user-group-fill"></i><span>歌手</span></a></div>
      <div class="menu-item"><a @click.prevent="$router.push('/singsheet')"><i class="iconfont icon-new"></i><span>歌单</span></a></div>
      <div class="menu-item"><a @click.prevent="$router.push('/newmusic')"><i class="iconfont icon-bofanggedan"></i><span>新歌</span></a></div>
      <div class="menu-item"><a @click.prevent="$router.push('/ranking')"><i class="iconfont icon-icon_rank"></i><span>排行榜</span></a></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'Iswiper',
  props: {
    banners: {
      type: Array,
      defualt () {
        return []
      }
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.swiper-container{
  margin: 10px 0;
  box-sizing: border-box;
  height: 420px;
  position: relative;
  .index-menu{
    margin-left: 80%;
    width: 18%;
    position: absolute;
    top: 0;
    height: 100%;
    background: #fff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    .menu-item{
      width: 50%;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        height: 100%;
        width: 100%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: bold;
        i{
          font-size: 40px;
          margin-bottom: 5px;
        }
      }
      &:nth-child(1){
        padding-bottom: 0 !important;
        padding-right: 2.5px !important;
        a{
          background-image: linear-gradient(-225deg, #6654F1 0%, #EACCF8 48%, #69EACB 100%);
        }
      }
      &:nth-child(2){
        padding-bottom: 0 !important;
        padding-left: 2.5px !important;
        a{
          background-image: linear-gradient(-225deg, #45D4FB 0%, #57E9F2 48%, #9EFBD3 100%);
        }
      }
      &:nth-child(3){
        padding-right: 2.5px !important;
        a{
          background-image: linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%);
        }
      }
      &:nth-child(4){
        padding-left: 2.5px !important;
        a{
          background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
        }
      }
    }
  }
}
.el-carousel__item{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 80%;
  background: #fff;
  transition: all .5s ease-in-out;
}
.el-carousel__item img{
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px 0 5px 5px ;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0 1px rgba(255,255,255,.5), 0 8px 13px rgba(0,0,0,.15) inset;
}
</style>
