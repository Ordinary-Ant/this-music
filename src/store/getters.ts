export default {
  realCurrentPlay (state: any) {
    if (!state.currentPlay.id && state.playList.length > 0) {
      return state.playList[0]
    }
    return state.currentPlay
  }
}
