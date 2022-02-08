<template>
  <div class="sole-container">
    <div class="sole-item" v-for="item in all" :key="item.id">
      <div class="sole-img">
        <img :src="item.sPicUrl" alt="">
      </div>
      <span>{{ item.name }}</span>
    </div>
    <div class="page-container">
      <div class="prev-text" @click="handlePrev"><i class="iconfont icon-angle-double-left"></i></div>
      <div class="next-text" @click="handleNext"><i class="iconfont icon-angle-double-right"></i></div>
    </div>
  </div>
</template>
<script>
import request from '@/api/request'
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
export default defineComponent({
  name: 'Sole',
  setup () {
    const state = reactive({
      all: [],
      more: true,
      offset: 0
    })
    // 获取所有独家作品
    const getSoles = async (offset = 0) => {
      const soles = await request('/personalized/privatecontent/list', { offset })
      state.all = markRaw(soles.result)
    }

    // 当前页数修改
    const handleNext = () => {
      if (state.more) {
        state.offset += 35
        getSoles(state.offset)
      }
    }
    // 当前页数修改
    const handlePrev = () => {
      if (state.offset <= 0) return
      state.offset -= 35
      getSoles(state.offset)
    }
    onMounted(() => {
      getSoles()
    })
    return {
      ...toRefs(state),
      handleNext,
      handlePrev
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.sole-container{
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .sole-item{
    width: 33.3%;
    box-sizing: border-box;
    padding: 0 20px;
    margin-bottom: 30px;
    .sole-img{
      width: 100%;
      // height: 250px;
      margin-bottom: 5px;
      img{
        border-radius: 5px;
        width: 100%;
        height: auto;
      }
    }
    span{
      letter-spacing: 2px;
      color: #fff;
    }
  }
  .page-container{
    width: 100%;
    height: 50px;
    // margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .prev-text,.next-text{
      cursor: pointer;
      i{
        font-size: 40px;
        color: #fff;
        text-shadow: 0 0 10px rgba(255,255,255,.5);
      }
    }
  }
}
</style>
