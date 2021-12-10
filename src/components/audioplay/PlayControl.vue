<template>
  <div class="handlemenu">
    <div class="audio-menu">
        <a class="pre" @click="handlePrePlay"><i class="iconfont icon-shangyishoushangyige"></i></a>
        <a class="player" @click="handleChangePlay(!isPlay)"><i class="iconfont" :class="isPlay ? 'icon-player-pause-01' : 'icon-player-play'"></i></a>
        <a class="next" @click="handleNextPlay"><i class="iconfont icon-xiayigexiayishou"></i></a>
    </div>
    <div class="audio-time">
        <span>{{ currentTime }}</span>
        <div class="time-control">
          <div class="current-time" :style="{ width: currentWidth + '%' }">
            <div class="current-circle"></div>
          </div>
        </div>
        <span>{{ duration }}</span>
        <audio
          :src="currentSong.url ? currentSong.url.url : ''"
          @canplaythrough="handleSongOnLoad"
          @pause="handlePause"
          @timeupdate="handleTimeUpdate"
          @ended="handleTimeEnd"
          ref="audio"
        ></audio>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, watch, reactive, markRaw, toRefs, ref, onMounted, onBeforeUnmount } from '@vue/runtime-core'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'PlayControl',
  setup () {
    const $store = useStore()
    const state = reactive({
      index: $store.state.currentIndex,
      currentSong: $store.getters.realCurrentPlay,
      currentTime: '00:00',
      duration: '00:00',
      currentWidth: 0,
      firstblood: true
    })

    const audio = ref('')

    onMounted(() => {
      audio.value.currentTime = $store.state.currentPlayTime
      audio.value.load()
    })

    // 点击切换播放状态
    const handleChangePlay = (status) => {
      $store.commit('set_play', status)
      if (status) {
        audio.value.play()
      } else {
        audio.value.pause()
      }
    }

    // 暂停播放
    const handlePause = () => {
      $store.commit('store_current', { song: state.currentSong, time: audio.value.currentTime })
    }

    // 切换上一首
    const handlePrePlay = () => {
      if (state.index > 0) {
        $store.commit('set_current', --state.index)
      }
    }

    // 切换下一首
    const handleNextPlay = () => {
      if (state.index < $store.state.playList.length - 1) {
        $store.commit('set_current', ++state.index)
      }
    }

    // 资源加载完毕
    const handleSongOnLoad = (event) => {
      if (event.isTrusted) {
        state.duration = dayjs(audio.value.duration * 1000).format('mm:ss')
        state.currentTime = dayjs(event.target.currentTime * 1000).format('mm:ss')
        state.currentWidth = (audio.value.currentTime / audio.value.duration * 100).toFixed(2)
        if (!state.firstblood) {
          handleChangePlay(true)
        }
        state.firstblood = false
      } else {
        state.duration = '00:00'
        state.currentTime = '00:00'
        state.currentWidth = 0
      }
    }

    // 播放时间变化
    const handleTimeUpdate = (event) => {
      state.currentTime = dayjs(event.target.currentTime * 1000).format('mm:ss')
      state.currentWidth = (event.target.currentTime / audio.value.duration * 100).toFixed(2)
      $store.commit('sync_time', event.target.currentTime * 1000)
    }

    // 一首歌播完后
    const handleTimeEnd = () => {
      if ($store.state.currentStatus) {
        // $store.commit('set_current', state.index)
        audio.value.currentTime = 0
        audio.value.load()
      } else {
        $store.commit('set_current', ++state.index)
      }
    }

    // 监听歌变动
    watch(() => $store.state.currentPlay, (newVal) => {
      state.currentSong = markRaw(newVal)
    })

    onBeforeUnmount(() => {
      $store.commit('store_current', { song: state.currentSong, time: audio.value.currentTime })
      $store.commit('set_index', state.index)
    })

    return {
      handleChangePlay,
      ...toRefs(state),
      isPlay: computed(() => $store.state.isPlay),
      audio,
      handleSongOnLoad,
      handleTimeUpdate,
      handleTimeEnd,
      handlePrePlay,
      handleNextPlay,
      handlePause
    }
  }
})
</script>

<style lang="less" scoped>
.handlemenu{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  .audio-menu{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    a{
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      box-shadow: 0 0 3px rgba(0, 0, 0, .3);
      margin: 5px 10px 0;
      i{
        font-size: 30px;
        color: #666;
      }
    }
    .player{
      width: 45px;
      height: 45px;
      line-height: 45px;
      i{
        font-size: 35px;
      }
    }
  }
  .audio-time{
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      color: #666;
      font-size: 14px;
    }
    .time-control{
      position: relative;
      height: 5px;
      background-color: #ccc;
      margin: 0 10px;
      border-radius: 10px;
      flex: 1;
      .current-time{
        position: absolute;
        top: 0;
        left: 0;
        height: 5px;
        background: skyblue;
        transition: width 1s linear;
        .current-circle{
          position: absolute;
          top: -2px;
          right: -3px;
          width: 8px;
          height: 8px;
          background: #000;
          box-shadow: 0 0 5px rgba(255, 255, 255, .5);
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
