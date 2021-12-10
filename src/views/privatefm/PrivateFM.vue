<template>
  <div class="FM-container" v-if="startfm">
    <div class="FM">
      <div class="FM-img">
        <img class="front-img" :src="startfm.album.picUrl + '?param=348y348'" alt="">
        <img class="rear-img" :src="fmqueue[0] ? fmqueue[0].album.picUrl + '?param=348y348' : ''" alt="">
      </div>
      <div class="fmsing-info">
        <h3>{{ startfm.name }}<span v-if="startfm.mvid">MV</span><span>普通音质</span></h3>
        <div class="title">
          <span>歌手：{{ startfm.artists ? startfm.artists.map(art => art.name).join('/') : '' }}</span>
          <span>专辑：{{ startfm.album ? startfm.album.name : '' }}</span>
        </div>
        <div class="fmsing-menu">
          <a><i class="iconfont icon-player-play"></i>播放</a>
          <a><i class="iconfont icon-xiayigexiayishou"></i>下一首</a>
          <a><i class="iconfont icon-shoucang1"></i>收藏</a>
          <a><i class="iconfont icon-fenxiang"></i>分享</a>
        </div>
      </div>
      <div class="lyric">
        <ul class="lyric-container">
          <li class="lyric-item" v-for="(fly, index) in startfm.flyric" :key="index">
            <span class="lrc">{{ Array.isArray(fly) ? fly[0].replace(/^\[.*?\]/, '').trim() : fly.replace(/^\[.*?\]/, '').trim() }}</span>
            <span class="tlylrc" v-if="Array.isArray(fly)">{{ fly[1].replace(/^\[.*?\]/, '').trim() }}</span>
          </li>
        </ul>
      </div>
    </div>
    <Comment :comment="comment"/>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import Comment from '@/components/common/Comment.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'PrivateFM',
  setup () {
    const state = reactive({
      startfm: null,
      fmqueue: [],
      offset: 1,
      comment: {}
    })
    // 获取歌曲信息和歌词并作相应处理
    const getPrivateFm = async () => {
      const fm = await request('/personal_fm')
      const temp = []
      fm.data.forEach(d => temp.push(d.id))
      const songs = await request('/song/url', { id: temp.join(',') })
      for (let i = 0; i < fm.data.length; i++) {
        fm.data[i].mp3Url = markRaw(songs.data[i])
      }
      state.fmqueue.push(...fm.data)
      if (!state.startfm) {
        state.startfm = state.fmqueue.shift()
      }

      const flyric = await request('/lyric', { id: state.startfm.id })
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
      state.startfm.flyric = markRaw(lrc)
      getStartComment()
    }

    // 获取歌曲
    // const getSong = async () => {
    //   // const song = await request('')
    // }

    // 获取歌曲评论
    const getStartComment = async () => {
      const comment = await request('/comment/music', { id: state.startfm.id, offset: state.offset })
      const hotcom = await request('/comment/hot', { id: state.startfm.id, offset: state.offset, type: 0, limit: 10 })
      state.comment = markRaw({ total: comment.total, comments: comment.comments, hotcom: hotcom.hotComments })
    }

    onMounted(() => {
      getPrivateFm()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    Comment
  }
})
</script>
<style lang="less" scoped>
.FM-container{
  margin-top: 40px;
  .FM{
    display: flex;
    .FM-img{
      width: 30%;
      position: relative;
      img{
        position: absolute;
        border-radius: 20px;
        width: 85%;
        top: 0;
      }
      .front-img{
        left: 0;
        z-index: 11;
      }
      .rear-img{
        right: -20px;
        // z-index: -1;
        transform: scale(0.8);
      }
    }
    .fmsing-info{
      flex: 1;
      color: #fff;
      margin-left: 1%;
      margin-right: 1%;
      h3{
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 30px;
        span{
          margin-left: 5px;
          border-radius: 2px;
          background: #000;
          border: 1px solid #fff;
          padding: 2px 5px;
          color: #fff;
          font-size: 10px;
          font-weight: normal;
        }
      }
      .title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
          margin-bottom: 5px;
        }
      }
      .fmsing-menu{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        a{
          color: #fff;
          width: 50%;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 6px auto;
          border: 1px solid #fff;
          border-radius: 20px;
          box-sizing: border-box;
          // vertical-align: middle;
          i{
            font-size: 30px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
    .lyric{
      width: 38%;
      height: 360px;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      overflow: auto;
      .lyric-container{
        height: 100%;
      }
      .lyric-item{
        padding: 10px;
        list-style: none;
        color: #fff;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:first-child{
          margin-top: 20%;
        }
        span:last-child{
          color: #ccc;
          font-size: 12px;
          // margin-top: 5px;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
