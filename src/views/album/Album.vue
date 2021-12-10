<template>
  <div class="album-container">
    <div class="albuminfo-wrap" :style="{ 'background-image': `url(${album.detail.blurPicUrl})` }">
      <img class="al-img" :src="album.detail.picUrl + '?param=435y435'" alt="">
      <div class="album-info">
        <h2><span>专辑</span>{{ album.detail.name }}</h2>
        <p>
          <span class="ator">歌手：{{ album.detail.artists ? album.detail.artists[0].name : '' }}</span>
          <span class="ct">创建时间：{{ dayjs(album.detail.publishTime).format('YYYY-MM-DD') }}</span>
        </p>
        <div class="btn-group">
          <a><i class="iconfont icon-24gl-play"></i>播放全部</a>
          <a><i class="iconfont icon-tianjia"></i>收藏({{ albumInfo.subCount }})</a>
          <a><i class="iconfont icon-fenxiang"></i>分享({{ albumInfo.shareCount }})</a>
          <a><i class="iconfont icon-xiazai"></i>下载全部</a>
        </div>
      </div>
    </div>
    <div class="album-menu">
      <div class="title">
        <a @click.prevent="$router.push({ name: 'AlbumSongs' })">歌曲列表</a>
        <a @click.prevent="$router.push({ name: 'AlbumComment' })">评论({{ albumInfo.commentCount }})</a>
        <a @click.prevent="$router.push({ name: 'AlbumInfo' })">专辑详情</a>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, markRaw, watch } from '@vue/runtime-core'
import request from '@/api/request'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'Album',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const $store = useStore()
    const state = reactive({
      albumInfo: {},
      album: {
        detail: {},
        songs: []
      }
    })

    // 获取专辑所有数据
    const getAlbumState = async () => {
      const albumInfo = await request('/album/detail/dynamic', { id: props.id })
      const albumData = await request('/album', { id: props.id })
      state.albumInfo = markRaw(albumInfo)
      state.album.detail = markRaw(albumData.album)
      state.album.songs = markRaw(albumData.songs)
      $store.commit('get_album', state.album)
    }

    onMounted(() => {
      getAlbumState()
    })

    // 监听id变化
    watch(() => props.id, () => {
      getAlbumState()
    })
    return {
      ...toRefs(state),
      dayjs
    }
  }
})
</script>
<style lang="less" scoped>
.album-container{
  margin-top: 20px;
  .albuminfo-wrap{
    box-sizing: border-box;
    display: flex;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(255,255,255,.5);
    background-repeat: no-repeat;
    background-size: cover;
    .al-img{
      width: 30%;
      height: auto;
    }
    .album-info{
      flex: 1;
      padding-left: 10%;
      background: rgba(0,0,0,.7);
      box-sizing: border-box;
      h2{
        display: flex;
        align-items: center;
        color: #fff;
        margin-top: 30px;
        span{
          border: orange solid 1px;
          color: orange;
          margin-right: 5px;
          font-size: 14px;
          padding: 0 5px;
          letter-spacing: 1px;
          font-weight: normal;
        }
      }
      p{
        display: flex;
        flex-direction: column;
        color: #fff;
        span{
          margin-bottom: 10px;
        }
      }
      .btn-group{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        a{
          // display: inline;
          width: 20%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
          color: #fff;
          i{
            margin-right: 10px;
          }
        }
      }
    }
  }
  .album-menu{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      a{
        color: #fff;
        letter-spacing: 1px;
        padding: 5px;
        margin: 5px;
        border-bottom: 1px transparent solid;
        cursor: pointer;
      }
    }
  }
}
</style>
