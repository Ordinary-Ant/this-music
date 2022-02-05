export default {
  albumData: {},

  isPlay: false,
  playList: JSON.parse(window.localStorage.getItem('playlist') || '[]'),
  currentPlay: JSON.parse(window.localStorage.getItem('current') || 'null'),
  currentPlayTime: JSON.parse(window.localStorage.getItem('currentTime') || '0'),
  currentIndex: JSON.parse(window.localStorage.getItem('currentIndex') || '0'),
  currentStatus: 0,
  syncTime: '00:00.000'
}
