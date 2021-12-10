<template>
  <div class="sheetindex-container">
    <div class="sheet-detail">
      <div class="btn-group">
        <a><i class="iconfont icon-24gl-play"></i>播放全部</a>
        <a><i class="iconfont icon-tianjia"></i>收藏({{ info.bookedCount }})</a>
        <a><i class="iconfont icon-fenxiang"></i>分享({{ info.shareCount }})</a>
        <a><i class="iconfont icon-xiazai"></i>下载全部</a>
      </div>
      <div class="sheet-img">
        <h2><span>歌单</span>{{ detail.name }}</h2>
        <img :src="detail.coverImgUrl" alt="">
      </div>
      <div class="sheet-info">
        <p><img :src="detail.creator ? detail.creator.avatarUrl : ''" alt=""><b>{{ detail.creator ? detail.creator.nickname : '' }}</b><span>{{ createTime }}创建</span></p>
        <span>标签：流行</span>
        <span>歌曲：{{ detail.trackCount }} <b>播放量：{{ Math.floor(info.playCount / 10000) }} 万</b></span>
        <span class="des">简介：{{ detail.description }}</span>
      </div>
    </div>
    <div class="sheet-menu">
      <div class="title">
        <a>歌曲列表</a>
        <a>评论({{ info.commentCount }})</a>
        <a>收藏者</a>
      </div>
      <div class="search">
        <input type="text" placeholder="请输入要搜索的内容" id="sheet-sea">
        <label for="sheet-sea"><i class="iconfont icon-search"></i></label>
      </div>
    </div>
    <SheetSings :songs="songs"/>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import dayjs from 'dayjs'
import request from '@/api/request'
import SheetSings from '@/components/singsheet/SheetSings.vue'
export default defineComponent({
  name: 'SingleSheet',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      info: {},
      detail: {},
      createTime: '',
      songs: []
    })
    // 获取歌单详细和歌单所有歌曲
    const getSheetAll = async () => {
      const sheetInfo = await request('/playlist/detail/dynamic', { id: props.id })
      const sheetSongs = await request('/playlist/detail', { id: props.id })
      state.info = markRaw(sheetInfo)
      state.detail = markRaw(sheetSongs.playlist)
      state.createTime = dayjs(state.detail.creator.createTime).format('YYYY-MM-DD')
      const songsId = sheetSongs.playlist.trackIds.map(track => {
        track = track.id
        return track
      })
      // state.songsId = markRaw(songsId)
      const songs = await request('/song/detail', { ids: songsId.join(',') })
      const songsurl = await request('/song/url', { id: songsId.join(',') })
      if (songs.songs && songsurl.data) {
        for (let i = 0; i < songs.songs.length; i++) {
          for (let j = 0; j < songsurl.data.length; j++) {
            if (songs.songs[i].id === songsurl.data[j].id) {
              songs.songs[i].mp3url = songsurl.data[j]
              break
            }
          }
        }
      }
      state.songs = markRaw(songs.songs)
    }

    onMounted(() => {
      getSheetAll()
    })

    // 监听id变化
    watch(() => props.id, () => {
      getSheetAll()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    SheetSings
  }
})
</script>
<style lang="less" scoped>
.sheetindex-container{
  margin-top: 20px;
  .sheet-detail{
    display: flex;
    justify-content: space-between;
    .btn-group{
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      width: 30%;
      box-sizing: border-box;
      padding: 70px 30px 10px 0;
      a{
        background: #fff;
        border-radius: 20px;
        border: none;
        padding: 10px 20px;
        letter-spacing: 1px;
        margin-bottom: 10px;
        i{
          margin-right: 5px;
        }
      }
    }
    .sheet-img{
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2{
        display: flex;
        align-items: center;
        margin-top: 0;
        color: #fff;
        span{
          border: orange solid 1px;
          color: orange;
          margin-right: 5px;
          font-size: 12px;
          padding: 0 3px;
          letter-spacing: 1px;
          font-weight: normal;
          text-align: center;
          width: 8%;
        }
      }
      img{
        width: 280px;
        // height: 280px;
        height: auto;
        border-radius: 10px;
      }
    }
    .sheet-info{
      width: 30%;
      padding: 50px 0 10px 30px;
      display: flex;
      flex-direction: column;
      p{
        display: flex;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        b{
          color: skyblue;
        }
        span{
          margin-left: 10px;
          font-size: 14px;
          color: #ccc;
        }
      }
      span{
        color: #fff;
        letter-spacing: 1px;
        line-height: 30px;
        b{
          font-weight: normal;
          margin-left: 10px;
        }
      }
      .des{
        overflow: hidden;            // 溢出隐藏
        text-overflow: ellipsis;     // 溢出用省略号显示
        display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
        -webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
        -webkit-line-clamp:5;
      }
    }
  }
  .sheet-menu{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    // align-items: center;
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
    .search{
      width: 220px;
      height: 30px;
      border-radius: 20px;
      overflow: hidden;
      input{
        width: 80%;
        height: 105%;
        outline: none;
        margin: 0;
        padding: 0;
        border: none;
        padding-left: 20px;
        box-sizing: border-box;
        color: #666;
        font-size: 14px;
      }
      label{
        display: inline-block;
        width: 20%;
        height: 100%;
        line-height: 30px;
        background: #fff;
        text-align: center;
      }
    }
  }
}
</style>
