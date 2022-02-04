<template>
  <div class="sheet-favour">
    <div class="favour-info" v-for="favour in allFovar" :key="favour.allFovar">
      <img class="avatar" :src="favour.avatarUrl + '?param=120y120'" alt="avatar">
      <span class="name">{{ favour.nickname }}</span>
    </div>
  </div>
</template>
<script>
import request from '@/api/request'
import { defineComponent, markRaw, onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
export default defineComponent({
  name: 'SingFavour',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      allFovar: []
    })

    // 获取所有收藏者
    const getFavour = async () => {
      const favour = await request('/playlist/subscribers', { id: props.id })
      state.allFovar = markRaw(favour.subscribers)
    }

    onMounted(() => {
      getFavour()
    })

    watch(() => props.id, () => {
      getFavour()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less" scoped>
.sheet-favour{
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  .favour-info{
    width: 12.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    box-sizing: border-box;
    padding: 5px;
    .avatar{
      width: 70%;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .name{
      font-size: 14px;
      color: #fff;
      letter-spacing: 1px;
    }
  }
}
</style>
