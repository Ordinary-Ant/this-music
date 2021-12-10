<template>
  <div class="singer-list">
    <div class="singer-item" v-for="singer in singers" :key="singer.id">
      <div class="singer-img">
        <img :src="singer.img1v1Url + '?param=200y200'" alt="" @click="$router.push(`/singerdetail/${singer.id}`)">
      </div>
      <span>{{ singer.name }}</span>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'SingerList',
  props: {
    singers: {
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
.singer-list{
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  .singer-item{
    width: 14.28%;
    margin-bottom: 20px;
    padding: 0 15px;
    box-sizing: border-box;
    cursor: pointer;
    .singer-img{
      width: 100%;
      img{
        border-radius: 50%;
        width: 100%;
      }
    }
    span{
      display: block;
      color: #fff;
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
