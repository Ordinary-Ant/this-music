<template>
  <div class="player-container">
    <div class="player-top">
      <div class="player-trend">
        <div class="trend-bg">
          <div class="bg-block"></div>
          <img :src="songinfo.al ? songinfo.al.picUrl + '?param=260y260' : ''" class="sing-img" />
        </div>
      </div>
      <div class="player-lyric">
        <div class="lyric-top">
          <h1>{{ songinfo.name }}<b>VIP</b><b v-show="songinfo.mvid">MV</b></h1>
          <span>{{ songinfo.alia ? songinfo.alia[0] : '' }}</span>
          <span>{{ songinfo.ator ? songinfo.ator : '' }}</span>
        </div>
        <div class="lyric-body">
          <p class="lyric-item"
            v-for="(fly, index) in flyric"
            :key="index"
            :class="{ 'fly-active': fly.active }"
          >
            <span class="lrc">{{ Array.isArray(fly) ? fly[0].fly.replaceAll(/\[.*?\]/g, '').trim() : fly.fly.replaceAll(/\[.*?\]/g, '').trim() }}</span>
            <span class="tlylrc" v-if="Array.isArray(fly)">{{ fly[1].replace(/^\[.*?\]/, '').trim() }}</span>
          </p>
        </div>
      </div>
      <div class="player-other">
        <div class="other-wrap">
          <div class="likes-sing">
            <h4>包含这首歌的歌单</h4>
            <div class="likes-item" v-for="sheet in similarSheet" :key="sheet.id" @click="$router.push(`/singlesheet/${sheet.id}`)">
              <img :src="sheet.coverImgUrl + '?param=50y50'" alt="">
              <span>{{ sheet.name }}</span>
            </div>
          </div>
          <div class="other-sing">
            <h4>喜欢这首歌的人也听</h4>
            <div class="other-item" v-for="song in similarSong" :key="song.id">
              <img :src="song.album ? song.album.picUrl + '?param=50y50' : ''" alt="">
              <span>{{ song.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Comment :comment="comment"/>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, markRaw, computed, watch } from '@vue/runtime-core'
import Comment from '@/components/common/Comment.vue'
import request from '@/api/request'
import { format } from '@/utils/format'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Player',
  setup () {
    const $store = useStore()
    const state = reactive({
      flyric: [],
      similarSheet: [],
      similarSong: [],
      comment: {
        hotcom: [],
        comments: [],
        total: 0
      }
    })

    // 处理歌词
    const getSongFlyric = async () => {
      const flyric = await request('/lyric', { id: $store.getters.realCurrentPlay.id })
      const lrc = flyric.lrc ? flyric.lrc.lyric.split('\n') : ''
      const tlyric = flyric.tlyric ? flyric.tlyric.lyric.split('\n') : ''
      if (lrc && tlyric) {
        for (let i = 0; i < lrc.length; i++) {
          for (let j = 0; j < tlyric.length; j++) {
            if (lrc[i].length && tlyric[j] && tlyric.length && lrc[i].match(/^\[(.*?)\]/i)[1] === tlyric[j].match(/^\[(.*?)\]/i)[1]) {
              lrc.splice(i, 1, [lrc[i], tlyric[j]])
              break
            }
          }
        }
      }
      for (let i = 0; i < lrc.length; i++) {
        if (Array.isArray(lrc[i])) {
          const fly = lrc[i][0].length ? lrc[i][0].replace(/^\[.*?\]/, format(lrc[i][0].match(/^\[(.*?)\]/)[1])) : ''
          lrc[i][0] = { fly: fly, active: false }
        } else {
          const fly = lrc[i].length ? lrc[i].replace(/^\[.*?\]/, format(lrc[i].match(/^\[(.*?)\]/)[1])) : ''
          lrc[i] = { fly: fly, active: false }
        }
      }
      state.flyric = lrc
    }

    // 获取相似歌单和歌曲
    const getSimilar = async () => {
      const sheet = await request('/simi/playlist', { id: $store.getters.realCurrentPlay.id })
      const song = await request('/simi/song', { id: $store.getters.realCurrentPlay.id })
      state.similarSheet = markRaw(sheet.playlists)
      state.similarSong = markRaw(song.songs)
    }

    // 获取评论
    const getComment = async () => {
      const hot = await request('/comment/hot', { id: $store.getters.realCurrentPlay.id, type: 0, limit: 10 })
      const def = await request('/comment/new', { id: $store.getters.realCurrentPlay.id, type: 0 })
      state.comment.hotcom = markRaw(hot.hotComments)
      state.comment.comments = markRaw(def.data.comments)
      state.comment.total = def.data.totalCount
    }

    onMounted(() => {
      getSongFlyric()
      getSimilar()
      getComment()
    })

    watch(() => $store.state.syncTime, (newVal) => {
      let index = 0
      for (let i = index; i < state.flyric.length; i++) {
        let fly = null
        if (Array.isArray(state.flyric[i])) {
          if (state.flyric[i][0].fly.length) {
            fly = state.flyric[i][0].fly
          } else continue
          if (fly.match(/^\[(.*?)\]/)[1] <= newVal) {
            for (let j = 0; j <= index; j++) state.flyric[j][0].active = false
            state.flyric[i][0].active = true
          }
        } else {
          if (state.flyric[i].fly.length) {
            fly = state.flyric[i].fly
          } else continue
          if (fly.match(/^\[(.*?)\]/)[1] <= newVal) {
            for (let j = 0; j <= index; j++) state.flyric[j].active = false
            state.flyric[i].active = true
          }
        }
        index++
      }
    })

    watch(() => $store.getters.realCurrentPlay, () => {
      getSongFlyric()
      getSimilar()
      getComment()
    })

    return {
      ...toRefs(state),
      songinfo: computed(() => $store.getters.realCurrentPlay),
      syncTime: computed(() => $store.state.syncTime)
    }
  },
  components: {
    Comment
  }
})
</script>
<style lang="less" scoped>
.player-container{
  margin-top: 40px;
  .player-top{
    display: flex;
    .player-trend{
      padding-top: 120px;
      width: 30%;
      display: flex;
      justify-content: center;
      .trend-bg{
        width: 350px;
        height: 350px;
        border-radius: 50%;
        border: 50%;
        background: #666;
        position: relative;
        box-shadow: 0 0 5px rgba(255, 255, 255, 6);
        div,img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .bg-block{
          width: 330px;
          height: 330px;
          border-radius: 50%;
          background: #000;
          z-index: 9;
        }
        .sing-img{
          width: 260px;
          height: 260px;
          border-radius: 50%;
          z-index: 99;
          box-shadow: 0 0 5px rgba(255,255,255,.5);
        }
      }
    }
    .player-lyric{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40%;
      .lyric-top{
        color: #fff;
        letter-spacing: 1px;
        display: flex;
        flex-direction: column;
        h1{
          display: flex;
          align-items: center;
          margin: 0 0 40px;
          b{
            margin-left: 5px;
            padding: 2px 5px;
            border: 1px solid #fff;
            font-size: 14px;
            border-radius: 5px;
          }
        }
        span{
          font-size: 14px;
          margin-bottom: 10px;
          text-align: center;
        }
      }
      .lyric-body{
        height: 380px;
        width: 100%;
        margin-top: 20px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #ccc;
        font-size: 14px;
        transition: all .3s ease-in-out;
        .lyric-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          .lrc{
            color: #fff;
          }
          .tlylrc{
            font-size: 12px;
            margin-top: 5px;
          }
          &:first-child{
            margin-top: 20%;
          }
        }
      }
    }
    .player-other{
      width: 30%;
      padding-top: 100px;
      .other-wrap{
        height: 400px;
        width: 100%;
        padding-left: 80px;
        box-sizing: border-box;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .likes-sing,.other-sing{
          color: #fff;
          display: flex;
          width: 100%;
          flex-direction: column;
          margin-bottom: 20px;
          cursor: pointer;
          h4{
            margin: 0 0 10px;
          }
          .likes-item,.other-item{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            img{
              width: 50px;
              height: 50px;
              border-radius: 10px;
              margin-right: 5px;
            }
            span{
              color: #ccc;
              font-size: 14px;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-right: 5px;
            }
          }
        }
      }
    }
  }
}
.fly-active{
  transform: scale(1.1);
  .lrc{
    color: gold !important;
    font-weight: bold;
  }
  .tlylrc{
    color: gold !important;
  }
}
</style>
