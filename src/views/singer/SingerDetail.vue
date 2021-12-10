<template>
  <div class="sdetail-container">
    <div class="sdetail-top">
      <div class="simg">
        <img :src="detail.artist ? detail.artist.cover + '?param=355y289' : ''" alt="">
      </div>
      <div class="sdetail-info">
        <h1>{{ detail.artist ? detail.artist.name : '' }}
          <span>{{ englishName ? englishName : '' }}</span>
        </h1>
        <div class="btn-menu">
          <a><i class="iconfont icon-tianjia"></i>收藏</a>
          <a><i class="iconfont icon-wode"></i>歌手详情</a>
        </div>
        <div class="sdetail-nums">
          <span>单曲数：{{ detail.artist ? detail.artist.musicSize : '' }}</span>
          <span>专辑数：{{ detail.artist ? detail.artist.albumSize : '' }}</span>
          <span>MV数：{{ detail.artist ? detail.artist.mvSize : '' }}</span>
        </div>
      </div>
    </div>
    <div class="sdetail-class">
      <a @click.prevent="$router.push({ name: 'SingerAlbum' })">专辑</a>
      <a @click.prevent="$router.push({ name: 'SingerMV' })">MV</a>
      <a @click.prevent="$router.push({ name: 'SingerSeemArt' })">相似歌手</a>
      <a @click.prevent="$router.push({ name: 'SingerInfo' })">歌手详情</a>
    </div>
    <router-view v-slot="{ Component }">
      <!-- <transition> -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      <!-- </transition> -->
    </router-view>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import request from '@/api/request'
export default defineComponent({
  name: 'SingerDetail',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      detail: {},
      englishName: ''
    })

    // 获取歌手基本信息
    const getDetail = async () => {
      const detail = await request('/artist/detail', { id: props.id })
      const album = await request('/artist/album', { id: props.id, limit: 1 })
      state.englishName = album.artist.alias[0]
      state.detail = markRaw(detail.data)
    }
    onMounted(async () => {
      getDetail()
    })

    // 监听id变化
    watch(() => props.id, () => {
      getDetail()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.sdetail-container{
  margin-top: 20px;
  .sdetail-top{
    display: flex;
    .simg{
      width: 30%;
      padding: 0 80px 0 0;
      box-sizing: border-box;
      img{
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin-left: 10px;
      }
    }
    .sdetail-info{
      h1{
        color: #fff;
        margin-bottom: 20px;
        span{
          margin-left: 10px;
          font-size: 14px;
          color: #ccc;
        }
      }
      .btn-menu{
        display: flex;
        margin-bottom: 20px;
        a{
          padding: 10px 20px;
          border-radius: 20px;
          border: 1px solid #fff;
          margin-right: 10px;
          color: #fff;
          i{
            margin-right: 5px;
          }
        }
      }
      .sdetail-nums{
        display: flex;
        flex-direction: column;
        color: #fff;
        span{
          line-height: 30px;
        }
      }
    }
  }
  .sdetail-class{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a{
      color: #fff;
      font-size: 16px;
      margin: 0 15px;
      padding: 0 0 5px;
      border-bottom: solid transparent 2px;
      &:hover{
        border-color: tomato;
      }
    }
  }
}
</style>
