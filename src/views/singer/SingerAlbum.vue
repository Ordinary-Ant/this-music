<template>
  <div class="album-container">
    <div class="album-item" v-for="album in albums" :key="album.id">
      <img :src="album.picUrl + '?param=221y221'" alt="" @click="$router.push(`/album/${album.id}`)">
      <div class="album-sings">
        <h3 class="album-title">{{ album.name }}</h3>
        <div class="album-sing" v-for="(song, index) in albumsSong[album.id]" :key="index">
          <div class="sing-menu">
            <b>0{{ index + 1 }}</b>
            <i class="iconfont icon-shoucang1"></i>
            <i class="iconfont icon-xiazai"></i>
          </div>
          <div class="sing-name">
            {{ song.name }}
          </div>
          <span class="time">04:17</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, markRaw, watch, onMounted, reactive, toRefs } from '@vue/runtime-core'
import request from '@/api/request'
export default defineComponent({
  name: 'SingerAlbum',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      albums: null,
      albumsSong: {}
    })

    // 获取专辑列表
    const getAlbum = async () => {
      const album = await request('/artist/album', { id: props.id, limit: 10 })
      state.albums = markRaw(album.hotAlbums)
      if (state.albums) getAlbumSong()
    }

    // 获取专辑歌曲列表
    const getAlbumSong = async () => {
      state.albums.forEach(async (album) => {
        const res = await request('/album', { id: album.id })
        state.albumsSong[album.id] = res.songs
      })
    }

    onMounted(() => {
      getAlbum()
    })
    // 监听id变化
    watch(() => props.id, () => {
      getAlbum()
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
.album-container{
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  .album-item{
    display: flex;
    margin-bottom: 40px;
    width: 16.6%;
    transition: all 1s ease-in-out;
    padding: 0 10px;
    box-sizing: border-box;
    img{
      width: 100%;
      height: auto;
      border-radius: 10px;
      transition: all 1s ease-in-out;
    }
    .album-sings{
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10%;
      opacity: 0;
      display: none;
      transition: all 1s ease-in-out;
      h3{
        text-align: left;
        margin-top: 5px;
        color: #fff;
      }
      .album-sing{
        display: flex;
        align-items: center;
        height: 40px;
        color: #fff;
        .sing-menu{
          width: 10%;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
        }
        .sing-name{
          width: 40%;
          margin-left: 2%;
          span{
            color: #ccc;
            font-size: 14px;
            margin-left: 10px;
          }
        }
        .time{
          font-size: 14px;
          color: #ccc;
        }
      }
    }
  }
  &:hover{
    .album-item{
      width: 100%;
      img{
        width: 200px;
        height: 200px;
      }
      .album-sings{
        opacity: 1;
        display: block;
      }
    }
  }
}
</style>
