<template>
  <div class="singerInfo-container">
    <div class="singer-briefDesc" v-if="briefDesc">
      <h4>简介</h4>
      <p>{{ briefDesc }}</p>
    </div>
    <div class="singer-otherInfo" v-for="(item, index) in introduction" :key="index">
      <h4>{{ item.ti }}</h4>
      <p v-for="(txt, index) in item.txt" :key="index">{{ txt }}</p>
    </div>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, watch, reactive, toRefs } from '@vue/runtime-core'
import request from '@/api/request'
export default defineComponent({
  name: 'SingerMV',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      introduction: [],
      briefDesc: ''
    })
    // 获取歌手详情信息
    const getInfo = async () => {
      const desc = await request('/artist/desc', { id: props.id })
      const introduction = desc.introduction.map(item => {
        item.txt = item.txt.split('\n')
        return item
      })
      state.introduction = markRaw(introduction)
      state.briefDesc = desc.briefDesc
    }
    onMounted(() => {
      getInfo()
    })
    // 监听id变化
    watch(() => props.id, () => {
      getInfo()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.singer-briefDesc,.singer-otherInfo{
  color: #fff;
  letter-spacing: 1px;
  margin-top: 40px;
  p{
    padding: 10px;
    color: #ccc;
    font-size: 14px;
    letter-spacing: 2px;
    text-indent: 28px;
    line-height: 28px;
  }
}
</style>
