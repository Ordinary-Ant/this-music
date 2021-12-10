<template>
  <nav class="right">
    <div class="right-top">
      <h1>新歌来袭</h1>
      <span>更新时间：2021-10-13</span>
    </div>
    <div class="right-list">
      <ul class="list-title">
        <li>序号</li>
        <li>歌曲</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>时长</li>
      </ul>
      <ul class="item">
        <li v-for="(sing, index) in singList" :key="sing.id">
          <b>{{ index + 1 }}</b>
          <div class="info">
            <img :src="sing.album.picUrl + '?param=80y80'" alt="">
            <span>{{ sing.name }}</span>
          </div>
          <span class="ator">{{ sing.artists.reduce((ans, a) => '/' + a.name, '').replace('/','') }}</span>
          <span class="album">{{ sing.album.name }}</span>
          <span class="time">04:28</span>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'RightList',
  props: {
    singList: {
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
.right{
  width: 73%;
  padding: 0 10px;
  box-sizing: border-box;
//   background: #fff;
  .right-top{
      margin-bottom: 20px;
    h1{
      color: #fff;
      letter-spacing: 3px;
    }
    span{
      color: #ccc;
    }
  }
  .right-list{
    border-radius: 10px;
    overflow: hidden;
    ul{
      display: flex;
      padding: 0;
      margin: 0;
      align-items: center;
      list-style: none;
    }
    .list-title{
      height: 40px;
      background: #F1F6F9;
      li{
        font-size: 14px;
        color: #666;
        text-align: center;
        &:nth-child(1){
          width: 5%;
        }
        &:nth-child(2){
          width: 38%;
        }
        &:nth-child(3){
          width: 22%;
        }
        &:nth-child(4){
          width: 29%;
        }
        &:nth-child(5){
          width: 6%;
        }
      }
    }
    .item{
      flex-direction: column;
      li{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        background: #fff;
        transition: all .5s;
        b,.info,.ator,.album,.time{
          text-align: center;
          // line-height: 80px;
          color: #132743;
          font-size: 14px;
        }
        b{
          width: 5%;
        }
        .info{
          width: 38%;
          display: flex;
          padding: 5px;
          align-items: center;
          font-size: 14px;
          img{
            width: 20%;
            margin: 0 10%;
            box-sizing: border-box;
            padding: 5px;
            border-radius: 10px;
          }
          span{
            text-align: left;
          }
        }
        .ator{
          width: 22%;
        }
        .album{
          width: 29%;
        }
        .time{
          width: 6%;
        }
        &:nth-child(even){
          background: #F1F6F9;
        }
        &:hover{
          background: #F1F6F9;
        }
      }
    }
  }
}
</style>
