<template>
  <div class="recommend-wrap" v-if="recommend.length">
    <div class="recommend-name">{{ recommend[0].category }}</div>
    <div class="recommend-list">
      <div
        class="recommend-item"
        :style="{width: recommend.length >= 4 ? '25%' : recommend.length >= 1 && recommend.length < 3 ? '50%' : '33%'}"
        v-for="item in recommend"
        :key="item.id"
      >
        <img :src="item.picUrl + '?param=144y144'" alt="">
        <div class="item-info">
          <span class="name">{{ item.name }}</span>
          <span class="ln">{{ item.lastProgramName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'RecommendDJList',
  props: {
    recommend: {
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
.recommend-wrap{
  margin-top: 80px;
  display: flex;
  .recommend-name{
    width: 8%;
    color: #fff;
    letter-spacing: 2px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, #ec008c , #fc6767 );
    border-radius: 20px;
  }
  .recommend-list{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 2%;
    .recommend-item{
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 10px;
      img{
        width: 30%;
        border-radius: 20px;
      }
      .item-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        margin-left: 10px;
        color: #fff;
        letter-spacing: 1px;
        font-size: 14px;
        .ln{
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>
