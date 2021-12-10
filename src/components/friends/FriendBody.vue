<template>
  <div class="friend-body">
    <div class="body-title">
      <h2>动态</h2>
      <button><i class="iconfont icon-jia"></i>写动态</button>
    </div>
    <div class="body-list">
      <div class="body-item" v-for="index in 5" :key="index">
        <img class="awator" src="@/assets/awator.webp" alt="">
        <div class="ator-info">
          <p>某某人 <em>发布动态</em></p>
          <span>昨天 14:41</span>
        </div>
        <div class="text">酷我音乐-无损音质正版在线试听网站,酷我音乐为您提供高品质音乐,无损音乐下载,拥有各类音乐榜单,快捷的新歌速递,完善的主题电台,个性化的歌曲推荐,高品质音乐在线听,好音质,用酷我。</div>
        <div class="sing">
          <img src="@/assets/awator.webp" alt="">
          <div class="sing-info">
            <p>从《Easy On Me》 听|心语推荐墙</p>
            <span>by 云音乐</span>
          </div>
        </div>
        <div class="photograph">
          <img src="@/assets/awator.webp" alt="">
          <img src="@/assets/awator.webp" alt="">
        </div>
        <div class="menu">
          <span>👌(1082)</span>
          <span>|</span>
          <span>->(122)</span>
          <span>|</span>
          <span>[](34)</span>
          <span>|</span>
          <span>...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'FriendBody',
  setup () {
    return {
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.friend-body{
  flex: 1;
  margin-right: 1%;
  padding: 20px;
  .body-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{
      letter-spacing: 2px;
      color: #fff;
    }
    button{
      height: 40px;
      border-radius: 20px;
      font-size: 14px;
      letter-spacing: 2px;
      outline: none;
      border: none;
      padding: 0 10px;
    }
  }
  .body-list{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .body-item{
      position: relative;
      padding: 10px 10px 10px 100px;
      border-bottom: 1px solid #ccc;
      margin-top: 10px;
      .awator{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .ator-info{
        font-size: 14px;
        letter-spacing: 1px;
        color: #ccc;
        p{
          color: skyblue;
          font-size: 16px;
          em{
            font-size: 14px;
            color: #ccc;
          }
        }
      }
      .text{
        font-size: 16px;
        margin-top: 20px;
        color: #fff;
        letter-spacing: 1px;
        line-height: 25px;
      }
      .sing{
        margin-top: 10px;
        padding: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        border-radius: 10px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 5px;
          margin-right: 20px;
        }
        .sing-info{
          p{
            margin: 0;
            color: #000;
            margin-bottom: 5px;
            letter-spacing: 1px;
          }
          span{
            color: #ccc;
            font-size: 14px;
          }
        }
      }
      .photograph{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        img{
          width: 120px;
          height: 120px;
          margin: 0 10px 10px 0;
          border-radius: 10px;
        }
      }
      .menu{
        margin-top: 10px;
        display: flex;
        justify-content:flex-end;
        color: #ccc;
        span{
          margin: 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
