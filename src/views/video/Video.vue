<template>
  <div class="video-container">
    <div class="allNav">
      <span @click="handleClick">全部视频<i class="iconfont icon-xiangyou1"></i></span>
      <div class="navlist" v-if="isShow">
        <div class="nav-item" v-for="cate in category" :key="cate.id">
          {{ cate.name }}
        </div>
      </div>
    </div>
    <VideoList />
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import VideoList from '@/components/mv/videoList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'Video',
  setup () {
    const state = reactive({
      category: [],
      isShow: true
    })

    // 获取所有标签分类和数据
    const getAllState = async () => {
      const allGroup = await request('/video/group/list')
      state.category = markRaw(allGroup.data)
    }

    onMounted(() => {
      getAllState()
    })

    // 切换标签显示
    const handleClick = () => {
      state.isShow = !state.isShow
    }
    return {
      handleClick,
      ...toRefs(state)
    }
  },
  components: {
    VideoList
  }
})
</script>
<style lang="less" scoped>
.video-container{
  .allNav{
    display: flex;
    margin: 10px 0 40px 2%;
    position: relative;
    span{
      padding: 15px 20px;
      background: #fff;
      border-radius: 30px;
      letter-spacing: 2px;
      cursor: pointer;
    }
    .navlist{
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      padding: 20px 20px;
      border-radius: 20px;
      width: 800px;
      height: 500px;
      overflow: auto;
      z-index: 999;
      top: 110%;
      left: 0;
      transition: all .5s ease-in-out;
      .nav-item{
        width: 15%;
        margin: 10px 0.8% 5px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #fff;
        border-radius: 20px;
        background: #000;
      }
    }
  }
}
</style>
