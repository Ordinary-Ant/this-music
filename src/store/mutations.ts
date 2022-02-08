import { GET_ALBUM, ADD_SONG, SET_PLAY, REMOVE_ALL_SONG, SET_CURRENT, STORE_CURRENT, SET_INDEX, SET_STATUS, SYNC_TIME } from './mutations-type'

function setIndex (state: any, value: number) {
  state.currentIndex = value
  window.localStorage.setItem('currentIndex', JSON.stringify(state.currentIndex))
}

function storeCurrent (current: any) {
  window.localStorage.setItem('current', JSON.stringify(current))
}

export default {
  // 存储一个专辑内所有数据
  [GET_ALBUM] (state: any, value: any) :void {
    state.albumData = value
  },

  // 修改播放状态
  [SET_PLAY] (state: any, value: boolean) :void {
    state.isPlay = value
  },

  // 往播放列表添加一首音乐
  [ADD_SONG] (state: any, value: any) :void {
    if (state.playList.length) {
      for (let i = 0; i < state.playList.length; i++) {
        if (value.id === state.playList[i].id) state.playList.splice(i, 1)
      }
    }
    state.playList.unshift(value)
    state.currentPlay = state.playList[0]
    window.localStorage.setItem('playlist', JSON.stringify(state.playList))
    setIndex(state, 0)
    storeCurrent(state.currentPlay)
  },

  // 删除音乐列表(一键清空时触发)
  [REMOVE_ALL_SONG] (state: any) :void {
    state.playList = []
    state.currentPlay = {}
    state.currentPlayTime = 0
    state.currentIndex = 0
    window.localStorage.removeItem('playlist')
    window.localStorage.removeItem('current')
    window.localStorage.removeItem('currentTime')
    window.localStorage.removeItem('currentIndex')
  },

  // 设置当前播放的音乐(切歌时触发)
  [SET_CURRENT] (state: any, value: number) :void {
    state.currentPlay = state.playList[value]
    setIndex(state, value)
    storeCurrent(state.playList[value])
  },

  // 存储当前播放歌曲和播放时间(暂停时触发)
  [STORE_CURRENT] (state: any, value: any) :void {
    state.currentPlay = value.song
    state.currentPlayTime = value.time
    window.localStorage.setItem('current', JSON.stringify(state.currentPlay))
    window.localStorage.setItem('currentTime', JSON.stringify(state.currentPlayTime))
  },

  // 设置当前播放的模式()
  [SET_STATUS] (state: any) :void {
    state.currentStatus = (++state.currentStatus) % 2
  },

  // 修改歌曲下标
  [SET_INDEX] (state: any, value: number) :void {
    setIndex(state, value)
  },

  // 同步当前播放时间
  [SYNC_TIME] (state: any, value: string) :void {
    state.syncTime = value
  }
}
