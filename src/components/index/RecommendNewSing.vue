<template>
  <div class="recommendnewsing-container">
    <div class="title" @click="$router.push('/newmusic')">
      新歌上线<i class="iconfont icon-xiangyou1"></i>
    </div>
    <div class="song-list">
      <div class="list-item" v-for="sing in newSing" :key="sing.id">
        <div class="item-image">
          <i class="iconfont icon-24gl-play" @click="handlePlay(sing.id)"></i>
          <img :src="sing.picUrl + '?param=90y90'" alt="">
        </div>
        <div class="item-title">
          <p class="sing-info">{{ sing.name }}</p>
          <p class="sing-ator">{{ sing.song.artists.reduce((ans, s) => ans += ('/' + s.name ), '').replace('/', '') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import request from '@/api/request'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'RecommendNewSing',
  props: {
    newSing: {
      type: Array,
      require: true
    }
  },
  setup () {
    const $store = useStore()
    // 添加音乐并播放
    const handlePlay = async (id) => {
      try {
        const isCanListen = await request('/check/music', { id })
        const songs = await request('/song/detail', { ids: id })
        const song = songs.songs[0]
        const songUrl = await request('/song/url', { id })
        if (isCanListen.success) {
          const obj = {
            id: song.id,
            url: songUrl.data[0],
            name: song.name,
            ator: song.ar.map(a => a.name).join('/'),
            al: song.al,
            alia: song.alia,
            publishTime: song.publishTime,
            mvid: song.mv,
            dt: song.dt
          }
          $store.commit('add_song', obj)
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      handlePlay
    }
  }
})
</script>

<style lang="less" scoped>
.recommendnewsing-container{
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
  .song-list{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .list-item{
      display: flex;
      width: 25%;
      margin-bottom: 20px;
      .item-image{
        width: 90px;
        height: 90px;
        box-sizing: border-box;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        transition: all .6s ease-in-out;
        img{
          width: 100%;
          height: 100%;
        }
        i{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
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
        &:hover i{
          opacity: 1;
        }
      }
      .item-title{
        flex: 1;
        padding: 10px;
        text-align: left;
        color: #fff;
        letter-spacing: 2px;
        font-size: 14px;
        padding-top: 10px;
        .sing-info{
          width: 178px;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .sing-ator{
          width: 178px;
          font-size: 12px;
          color: #ccc;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
