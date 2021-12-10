<template>
  <div class="station-top" v-if="banners.length">
    <el-carousel indicator-position="none" height="320px">
      <el-carousel-item v-for="banner in banners" :key="banner.targetId">
        <div class="bg-container">
          <img :src="banner.pic + '?param=870y320'" alt="">
          <span class="typeTitle">{{ banner.typeTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="category-list" v-if="showCateList.length">
      <div class="category-item" v-for="cate in showCateList" :key="cate.id">
        <img :src="cate.pic56x56Url" alt="">
        <span>{{ cate.name }}</span>
      </div>
      <span v-if="showRight" class="toRight"><i class="iconfont icon-xiangyou1" @click="handleShowLocal"></i></span>
      <span v-if="showLeft" class="toLeft"><i class="iconfont icon-Left" @click="handleShowLocal"></i></span>
    </div>
  </div>
</template>
<script>
import { defineComponent, markRaw, reactive, toRefs, watch } from '@vue/runtime-core'
export default defineComponent({
  name: 'BannerAndClass',
  props: {
    banners: {
      type: Array,
      require: true
    },
    catelist: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      showCateList: [],
      showRight: true,
      showLeft: false
    })

    const handleShowLocal = () => {
      state.showCateList = state.showRight ? props.catelist.slice(10) : props.catelist.slice(0, 10)
      state.showRight = !state.showRight
      state.showLeft = !state.showLeft
    }

    watch(() => props.catelist, () => {
      state.showCateList = markRaw(props.catelist.slice(0, 10))
    })

    return {
      ...toRefs(state),
      handleShowLocal
    }
  }
})
</script>
<style lang="less" scoped>
.station-top{
  width: 100%;
  display: flex;
  align-items: center;
  height: 320px;
  .el-carousel{
    width: 60%;
  }
  .el-carousel__item .bg-container {
    position: relative;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
    .typeTitle{
      position: absolute;
      width: 50px;
      height: 25px;
      border-radius: 5px;
      color: #fff;
      background: red;
      bottom: 5px;
      right: 5px;
      text-align: center;
      line-height: 25px;
      font-size: 14px;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .category-list{
    width: 38%;
    margin-left: 2%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    position: relative;
    .category-item{
      width: 20%;
      display: flex;
      flex-direction: column;
      height: 160px;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      letter-spacing: 1px;
      color: #666;
    }
    .toRight{
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
    .toLeft{
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
    .toRight,.toLeft{
      i{
        font-size: 30px !important;
        color: #000;
      }
    }
  }
}

</style>
