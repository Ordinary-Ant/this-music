<template>
  <div class="otheroption">
    <div class="menu">
      <a class="menu-btn" @click="handleSetStatus"><i class="iconfont" :class="status ? 'icon-danquxunhuan' : 'icon-liebiaoxunhuan'"></i></a>
      <span class="menu-title">{{ status ? '单曲循环' : '列表循环' }}</span>
    </div>
    <div class="volume">
      <a class="volume-btn"><i class="iconfont icon-yinliang"></i></a>
      <div class="volume-div">
        <div class="volume-control">
          <div class="current-volume">
            <div class="volume-circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="songlist">
      <a class="songlist-btn" @click="showList = !showList"><i class="iconfont icon-bofanggedan"></i></a>
      <div class="list-wrap" v-if="showList">
        <div class="list-title">
          <h3>当前播放</h3>
          <div class="title-menu">
            <span><i class="iconfont icon-shoucang1"></i>收藏全部</span>
            <span @click="handleClearAll"><i class="iconfont icon-15qingkong-1"></i>清空所有</span>
          </div>
        </div>
        <ul class="list-song" v-if="audioList.length">
          <li class="list-item" v-for="audio in audioList" :key="audio.id">
            <div class="song-icon">
              <i class="iconfont" :class="isPlay ? 'icon-player-pause-01' : 'icon-player-play'"  v-show="audio.id === realCurrentPlay.id"></i>
            </div>
            <div class="song-name">{{ audio.name }}</div>
            <span class="song-ator">{{ audio.ator }}</span>
            <span class="song-time">{{ dayjs(audio.dt).format('mm:ss') }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from '@vue/runtime-core'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'PlayMenu',
  setup () {
    const $store = useStore()
    const state = reactive({
      showList: false
    })

    const handleClearAll = () => {
      $store.commit('remove_all_song')
    }

    const handleSetStatus = () => {
      $store.commit('set_status')
    }

    return {
      ...toRefs(state),
      dayjs,
      isPlay: computed(() => $store.state.isPlay),
      realCurrentPlay: computed(() => $store.getters.realCurrentPlay),
      audioList: computed(() => $store.state.playList),
      status: computed(() => $store.state.currentStatus),
      handleClearAll,
      handleSetStatus
    }
  }
})
</script>

<style lang="less" scoped>
.otheroption{
    width: 30%;
    margin-right: 5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .volume,.songlist,.menu{
      margin-right: 40px;
      position: relative;
      a{
        width: 50px;
        height: 50px;
        i{
          font-size: 30px;
          color: #666;
        }
      }
    }
    .menu{
      span{
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translateX(-50%);
        width: 80px;
        height: 25px;
        line-height: 25px;
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        opacity: 0;
        transition: opacity .6s ease-in-out;
      }
      &:hover{
        span{
          opacity: 1;
        }
      }
    }
    .volume{
      .volume-div{
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translateX(-50%);
        height: 130px;
        width: 40px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        opacity: 0;
        transition: opacity .6s ease-in-out;
        .volume-control{
          position: relative;
          height: 100px;
          width: 6px;
          background-color: #ccc;
          margin: 15px auto;
          border-radius: 10px;
          .current-volume{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 5px;
            transition: height 1s linear;
            .volume-circle{
              position: absolute;
              bottom: -3px;
              left: -1px;
              width: 8px;
              height: 8px;
              background: #000;
              box-shadow: 0 0 5px rgba(255, 255, 255, .5);
              border-radius: 50%;
            }
          }
        }
      }
      &:hover{
        .volume-div{
          opacity: 1;
        }
      }
    }
    .songlist{
      margin-right: 0;
      .list-wrap{
        position: absolute;
        bottom: 60px;
        right: 0;
        width: 500px;
        height: 500px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        transition: all .6s ease-in-out;
        overflow: auto;
        .list-title{
          border-bottom: 1px #ccc solid;
          .title-menu{
            display: flex;
            justify-content: flex-end;
            color: #666;
            margin-bottom: 10px;
            span{
              font-size: 14px;
              &:first-child{
                margin-right: 20px;
              }
            }
          }
        }
        .list-song{
          list-style: none;
          padding: 0;
          .list-item{
            display: flex;
            align-items: center;
            height: 30px;
            font-size: 14px;
            color: #666;
            .song-icon{
              width: 5%;
            }
            .song-name{
              width: 45%;
            }
            .song-ator{
              width: 45%;
            }
            .song-time{
              width: 10%;
            }
          }
        }
      }
    }
}
</style>
