<template>
  <div class="albuminfo-container">
    <p v-for="(txt, index) in state" :key="index">{{txt}}</p>
  </div>
</template>
<script>
import { computed, defineComponent, markRaw, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'AlbumInfo',
  setup () {
    const $store = useStore()
    const state = ref([])

    const albumData = computed(() => $store.state.albumData)
    if (albumData.value.detail) {
      const info = albumData.value.detail.description.split('\n\n')
      state.value = markRaw(info)
    }

    return {
      state
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.albuminfo-container{
  padding: 20px;
  color: #fff;
  letter-spacing: 2px;
  font-size: 14px;
  p{
    text-indent: 32px;
    line-height: 25px;
  }
}
</style>
