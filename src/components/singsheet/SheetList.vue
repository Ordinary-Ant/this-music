<template>
  <div class="sheetlist-container">
    <div class="sheetlist-item" v-for="sheet in allSheet" :key="sheet.id">
      <div class="sheetlist-img" @click="$router.push(`/singlesheet/${sheet.id}`)">
        <img :src="sheet.coverImgUrl + '?param=210y210'" alt="">
      </div>
      <span><i class="iconfont icon-bofangliang"></i>{{ sheet.playCount }}</span>
      <p>{{ sheet.name }}</p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'SheetList',
  props: {
    allSheet: {
      type: Array,
      require: true
    }
  },
  setup () {
    return {
    }
  }
})
</script>
<style lang="less" scoped>
.sheetlist-container{
  display: flex;
  flex-wrap: wrap;
  // margin-top: 20px;
  .sheetlist-item{
    width: 16.6%;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 15px;
    .sheetlist-img{
      cursor: pointer;
      img{
        border-radius: 20px;
        width: 100%;
      }
    }
    span{
      position: absolute;
      right: 20px;
      top: 10px;
      color: #fff;
    }
    p{
      width: 80%;
      text-align: center;
      position: absolute;
      left: 50%;
      font-size: 14px;
      transform: translateX(-50%);
      bottom: 0px;
      letter-spacing: 1px;
      color: #fff;
    }
  }
}
</style>
