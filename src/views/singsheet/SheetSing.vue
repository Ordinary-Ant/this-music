<template>
  <div class="sheet-sing">
    <SheetSings :songs="songs"/>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, markRaw, watch } from '@vue/runtime-core'
import SheetSings from '@/components/singsheet/SheetSings.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'SheetSing',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      songs: []
    })

    // 获取歌单中所有歌曲
    const getSong = async () => {
      const sheetSongs = await request('/playlist/detail', { id: props.id })
      const songsId = sheetSongs.playlist.trackIds.map(track => {
        track = track.id
        return track
      })
      const songs = await request('/song/detail', { ids: songsId.join(',') })
      // const songsurl = await request('/song/url', { id: songsId.join(',') })
      // if (songs.songs && songsurl.data) {
      //   for (let i = 0; i < songs.songs.length; i++) {
      //     for (let j = 0; j < songsurl.data.length; j++) {
      //       if (songs.songs[i].id === songsurl.data[j].id) {
      //         songs.songs[i].mp3url = songsurl.data[j]
      //         break
      //       }
      //     }
      //   }
      // }
      state.songs = markRaw(songs.songs)
    }

    onMounted(() => {
      getSong()
    })

    watch(() => props.id, () => {
      getSong()
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
.sheet-sing{
}
</style>
