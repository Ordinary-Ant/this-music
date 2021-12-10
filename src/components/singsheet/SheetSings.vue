<template>
  <div class="sheetsings-container">
    <ul class="sings-title">
      <li>操作</li>
      <li>歌曲</li>
      <li>歌手</li>
      <li>专辑</li>
      <li>时间</li>
    </ul>
    <ul class="sings-list">
      <li class="sings-item" v-for="(song, index) in songs" :key="song.id">
        <div class="item-menu">
          <b>{{ index + 1 }}</b>
          <i class="iconfont icon-shoucang1"></i>
          <i class="iconfont icon-xiazai"></i>
        </div>
        <span class="sing" @dblclick="handleAddSong(song)">{{ song.name }}</span>
        <span class="ator">{{ song.ar ? song.ar.map(a => a.name).join('/') : '' }}</span>
        <span class="album">{{ song.al ? song.al.name : '' }}</span>
        <span class="time">{{ dayjs(song.dt).format('mm:ss') }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import request from '@/api/request'
import { defineComponent } from '@vue/runtime-core'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'SheetSings',
  props: {
    songs: {
      type: Array
    }
  },
  setup () {
    const $store = useStore()
    const handleAddSong = async (song) => {
      const isCanListen = await request('/check/music', { id: song.id })
      if (isCanListen.success) {
        const obj = {
          id: song.id,
          url: song.mp3url,
          name: song.name,
          ator: song.ar.map(a => a.name).join('/'),
          al: song.al,
          alia: song.alia,
          publishTime: song.publishTime,
          mvid: song.mv,
          dt: song.dt
        }
        $store.commit('add_song', obj)
      } else {
        console.log(isCanListen.message)
      }
    }

    return {
      dayjs,
      handleAddSong
    }
  }
})
</script>
<style lang="less" scoped>
.sheetsings-container{
  margin-top: 40px;
  ul{
    display: flex;
    list-style: none;
    letter-spacing: 1px;
    padding-left: 10px;
  }
  .sings-title{
    color: #ccc;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
    li{
      &:nth-child(1){
        width: 12%;
        text-align: center;
      }
      &:nth-child(2){
        width: 35%;
      }
      &:nth-child(3){
        width: 23%;
      }
      &:nth-child(4){
        width: 23%;
      }
      &:nth-child(5){
        width: 7%;
        text-align: center;
      }
    }
  }
  .sings-list{
    flex-direction: column;
    color: #fff;
    .sings-item{
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      height: 40px;
      border-radius: 5px;
      background: transparent;
      transition: all 0.6 ease-in-out;
      cursor: auto;
      .item-menu{
        width: 12%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px 0 0;
        box-sizing: border-box;
        b,i{
          width: 30%;
          text-align: center;
        }
      }
      .sing,.ator,.album{
        font-size: 14px;
      }
      .sing{
        width: 35%;
      }
      .ator{
        width: 23%;
      }
      .album{
        width: 23%;
      }
      .time{
        width: 7%;
        text-align: center;
        color: #ccc;
        font-size: 14px;
      }
      &:hover{
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
