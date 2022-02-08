<template>
  <div class="songinfo">
    <img :src="currentSong.al ? currentSong.al.picUrl + '?param=70y70' : '@/assets/awator.webp'" alt="无音乐" @click="$router.push('/player')">
    <div class="info">
      <span class="song-name">{{ currentSong.name || 'xxx' }}</span>
      <span class="song-ator">{{ currentSong.ator || 'xxx' }}</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'PlayInfo',
  setup () {
    const $store = useStore()
    return {
      currentSong: computed(() => $store.getters.realCurrentPlay)
    }
  }
})
</script>

<style lang="less" scoped>
.songinfo{
  display: flex;
  align-items: center;
  margin-left: 5%;
  width: 30%;
  img{
      width: 70px;
      height: 70px;
      border-radius: 10px;
  }
  .info{
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      font-size: 16px;
      letter-spacing: 2px;
      color: #000;
      .song-ator{
        color: #666;
        font-size: 14px;
        margin-top: 10px;
      }
  }
}
</style>
