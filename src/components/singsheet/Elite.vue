<template>
  <div class="elite">
    <div class="elite-title">
      <span class="title-left">精品歌单</span>
      <span class="title-right">更多</span>
    </div>
    <div class="elite-list">
      <div class="elite-item" v-for="sheet in recommSheet" :key="sheet.id">
        <div class="item-img">
          <img :src="sheet.coverImgUrl + '?param=325y325'" alt="" @click="$router.push(`/singlesheet/${sheet.id}`)">
        </div>
        <span class="left"><i class="iconfont icon-huangguan"></i></span>
        <span class="right"><i class="iconfont icon-bofangliang"></i>{{ sheet.playCount }}</span>
        <p>{{ sheet.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'Elite',
  props: {
    recommSheet: {
      type: Array,
      require: true
    }
  },
  setup () {
    return {
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.elite{
  padding: 20px 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(255,255,255,.8);
  margin-bottom: 20px;
  .elite-title{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .title-left{
      padding: 10px;
      border-radius: 20px;
      background-image: linear-gradient(to right, #ec008c , #fc6767 );
      color: #fff;
      font-size: 14px;
    }
    .title-right{
      color: #fff;
      line-height: 36px;
      border-bottom: 2px #f0a500 solid;
    }
  }
  .elite-list{
    display: flex;
    justify-content: space-between;
    .elite-item{
      width: 23%;
      position: relative;
      border-radius: 20px;
      box-shadow: 0 10px 40px -10px rgba(0,64,128,.2);
      img{
        width: 100%;
        border-radius: 20px;
      }
      span{
        position: absolute;
        top: 10px;
      }
      .left{
        left: 5px;
        color: gold;
      }
      .right{
        right: 5px;
        color: #fff;
      }
      p{
        position: absolute;
        margin: 0;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        color: #fff;
        font-size: 14px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
