<template>
  <div class="sole-container">
    <div class="sole-item" v-for="item in all" :key="item.id">
      <div class="sole-img">
        <img :src="item.sPicUrl" alt="">
      </div>
      <span>{{ item.name }}</span>
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
      all: []
    })
    // 获取所有独家作品
    const getSoles = async () => {
      const soles = await request('/personalized/privatecontent/list')
      state.all = markRaw(soles.result)
    }
    onMounted(() => {
      getSoles()
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
}
</style>
