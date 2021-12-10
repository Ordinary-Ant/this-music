<template>
  <div class="mind-info">
    <div class="info">
      <div class="info-img">
        <img src="@/assets/awator.webp" alt="">
        <div class="name">子舟</div>
      </div>
      <div class="info-list">
        <div>
          <b>1</b>
          <span>动态</span>
        </div>
        <span class="sep"></span>
        <div>
          <b>28</b>
          <span>关注</span>
        </div>
        <span class="sep"></span>
        <div>
          <b>1</b>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <div class="hot-talk">
      <div class="title"><b>热门话题</b><span>更多</span></div>
      <ul class="list">
        <li v-for="index in 5" :key="index" class="item">
          <img src="@/assets/awator.webp" alt="">
          <div class="hot-info">
            <p>#关于我的十件小事#</p>
            <span>2794人参与</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="awareness">
      <div class="title"><b>认识的人</b><span>更多</span></div>
    </div>
    <div class="follow">
      <div class="title">添加关注</div>
      <ul class="list">
        <li v-for="index in 4" :key="index" class="item">
          <img src="@/assets/awator.webp" alt="">
          <p>#关于我的十件小事#</p>
          <span>2794人<i class="iconfont icon-xiangyou1"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'MindInfo',
  setup () {
    return {
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.mind-info{
  width: 22%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  .info{
    width: 100%;
    height: 150px;
    background: #e7dec8;
    padding: 20px 20px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .info-img{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .name{
        margin-left: 10%;
        letter-spacing: 3px;
        color: #666;
      }
    }
    .info-list{
      display: flex;
      align-items: center;
      height: 45px;
      justify-content: space-around;
      div{
        display: flex;
        flex-direction: column;
        align-items: center;
        b{
          font-size: 20px;
          font-weight: normal;
          margin-bottom: 5px;
        }
        span{
          font-size: 14px;
          color: #666;
        }
      }
      .sep{
        border: 1px solid #666;
        height: 100%;
      }
    }
  }
  .hot-talk{
    width: 100%;
    padding: 20px 20px 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    .title{
      display: flex;
      justify-content: space-between;
      b{
        letter-spacing: 2px;
      }
      span{
        font-size: 14px;
        color: #666;
      }
    }
    .list{
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      .item{
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        img{
          width: 60px;
          height: 60px;
          border-radius: 10px;
          margin-right: 5%;
        }
        .hot-info{
          letter-spacing: 2px;
          p{
            margin: 0;
            color: #000;
          }
          span{
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
  .awareness{
    width: 100%;
    padding: 20px 20px 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    .title{
      display: flex;
      justify-content: space-between;
      b{
        letter-spacing: 2px;
      }
      span{
        font-size: 14px;
        color: #666;
      }
    }
  }
  .follow{
    width: 100%;
    padding: 20px 20px 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .title{
      letter-spacing: 2px;
      font-weight: bold;
    }
    .list{
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      .item{
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        p{
          margin: 0;
          font-size: 15px;
          color: #000;
        }
        span{
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
