<template>
  <div class="otitle">
    <span>热门榜</span>
  </div>
  <section class="official-List">
    <div class="Olist-item" v-for="Official in OfficialList" :key="Official.id">
      <div class="item-img" @click="$router.push(`/singlesheet/${Official.id}`)">
        <img :src="Official.coverImgUrl + '?param=334y334'" alt="">
        <i class="iconfont icon-xiangxiazhanhang"></i>
      </div>
      <div class="item-sings">
        <div class="sings" v-if="Official.tracks">
          <a class="sing" v-for="(song, index) in Official.tracks.slice(0, 8)" :key="song.id">
            <b>{{ index + 1 }}</b>
            <em>-</em>
            <span class="sing-name">{{ song.name }}</span>
            <span class="sing-ator">{{ song.ar.map(a => a.name).join('/') }}</span>
          </a>
          <a class="more" @click="$router.push(`/singlesheet/${Official.id}`)">查看全部<i class="iconfont "></i></a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'Official',
  props: {
    OfficialList: {
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
.otitle{
  margin: 30px 0 40px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  letter-spacing: 3px;
  border-bottom: 2px solid #fff;
  span{
    display: inline-block;
    width: 200px;
    text-align: center;
    background: #fff;
    color: #666;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.official-List{
  display: flex;
  justify-content: space-between;
  // align-items: center;
  .Olist-item{
    display: flex;
    flex-direction: column;
    width: 23%;
    overflow: hidden;
    .item-img{
      overflow: hidden;
      position: relative;
      border-radius: 18px;
      img{
        width: 100%;
        transform: scale(1);
        transition: transform 0.6s ease-in-out;
        border-radius: 18px;
        &:hover{
          transform: scale(1.1);
        }
      }
      i{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        font-size: 30px;
        color: #fff;
        opacity: 1;
        transition: all 0.6s ease-in-out;
      }
    }
    &:hover{
      .item-sings{
        height: 400px;
        opacity: 1;
      }
      i{
        opacity: 0;
      }
    }
    .item-sings{
      height: 0px;
      // background: #fff;
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.6s ease-in-out;
      opacity: 0;
      .sings{
        display: flex;
        flex-direction: column;
        .sing{
          padding: 0 10px;
          height: 40px;
          margin-top: 5px;
          line-height: 40px;
          font-weight: normal;
          display: flex;
          justify-content: space-between;
          border-radius: 10px;
          &:nth-child(odd){
            background: #ccc;
          }
          &:nth-child(even){
            background: #fff;
          }
          b{
            width: 8%
          }
          .sing-name{
            flex: 1;
            font-size: 14px;
          }
          .sing-ator{
            width: 20%;
            overflow: hidden;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          em{
            width: 12%;
            font-size: 10px;
          }
          &:hover{
            background: #666;
          }
        }
        .more{
          padding: 10px 10px;
          background: #fff;
          margin-top: 5px;
          border-radius: 10px;
          font-size: 14px;
          line-height: 10px;
        }
      }
    }
  }
}
</style>
