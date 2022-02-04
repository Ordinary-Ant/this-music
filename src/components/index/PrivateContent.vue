<template>
  <div class="private-container">
    <div class="title">
      独家放送<i class="iconfont icon-xiangyou1" @click="$router.push('/sole')"></i>
    </div>
    <div class="private-list">
      <div class="list-item" v-for="sole in soleDoor" :key="sole.id">
        <div class="item-image">
          <i class="iconfont icon-24gl-play"></i>
          <img :src="sole.sPicUrl + '?param=465y260'" alt="">
          <div class="info">
            <span>{{ sole.name }}</span>
            <p>{{ sole.name.match(/\《(.*?)\》/i) ? sole.name.match(/\《(.*?)\》/i)[1] : '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'PrivateContent',
  props: {
    soleDoor: {
      type: Array,
      require: true
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.private-container{
  margin-top: 80px;
  .title{
    letter-spacing: 2px;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    i{
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .private-list{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .list-item{
      width: 32%;
      display: flex;
      height: auto;
      .item-image{
        width: 100%;
        height: auto;
        // box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        transition: all .6s ease-in-out;
        cursor: pointer;
        img{
          width: 100%;
          height: auto;
          opacity: 1;
          border-radius: 10px;
          transition: all 0.6s ease-in-out;
        }
        i{
          position: absolute;
          bottom: 40px;
          right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .8);
          text-align: center;
          line-height: 40px;
          color: #000;
          box-shadow: 0 0 10px rgba(0, 0, 0, .5);
          opacity: 0;
          transition: all 0.6s ease-in-out;
        }
        .info{
          position: absolute;
          top: 50%;
          left: 52%;
          transform: translateY(-50%);
          padding-right: 10px;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: all 0.6s ease-in-out;
          font-size: 14px;
          line-height: 20px;
          color: #fff;
          p{
            color: #ccc;
            font-size: 12px;
          }
        }
        &:hover{
          background: rgba(0, 0, 0, .5);
          img{
            transform: translateX(-50%);
            opacity: .8;
          }
          i,.info{
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
