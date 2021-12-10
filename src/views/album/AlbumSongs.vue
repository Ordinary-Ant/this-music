<template>
  <div class="albumsongs-container">
    <SheetSings :songs="albumData.songs"/>
  </div>
</template>
<script>
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from 'vuex'
import SheetSings from '@/components/singsheet/SheetSings.vue'
export default defineComponent({
  name: 'AlbumSongs',
  setup () {
    const $store = useStore()
    return {
      albumData: computed(() => $store.state.albumData)
    }
  },
  components: {
    SheetSings
  }
})
</script>
<style lang="less" scoped>
</style>
