<template>
  <div class="gtitle">
    <span>全球榜</span>
  </div>
  <section class="global-list">
    <div class="glist-item" v-for="Global in GlobalList" :key="Global.id" @click="$router.push(`/singlesheet/${Global.id}`)">
      <img :src="Global.coverImgUrl + '?param=218y218'" alt="">
      <p>{{ Global.name }}</p>
      <b><i class="iconfont icon-24gl-play"></i>{{ Math.floor(Global.playCount / 10000) }}万</b>
    </div>
  </section>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'Global',
  props: {
    GlobalList: {
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
.gtitle{
  margin: 50px 0 40px;
  text-align: center;
  font-size: 30px;
  color: #666;
  letter-spacing: 3px;
  border-bottom: 2px solid #fff;
  span{
    display: inline-block;
    width: 200px;
    background: #fff;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.global-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .glist-item{
    width: 15%;
    margin-bottom: 50px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out;
    cursor: pointer;
    img{
      width: 100%;
      border-radius: 10px;
    }
    p{
      margin: 5px 0 0 0;
      text-align: center;
      color: #fff;
    }
    b{
      position: absolute;
      color: #fff;
      font-size: 14px;
      right: 10px;
      top: 10px;
      font-weight: bold;
    }
    &:hover{
      transform: translateY(-5%);
    }
  }
}
</style>
