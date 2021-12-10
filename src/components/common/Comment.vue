<template>
  <div class="comment-container" v-if="comment">
    <div class="comment-send">
      <h2>评论<span>(已有{{ comment.total }}条评论)</span></h2>
      <textarea class="send">
      </textarea>
      <i class="iconfont icon-edit"></i>
    </div>
    <div class="comment-list">
      <div class="comment-item">
        <h2>热门评论</h2>
        <div class="comment" v-for="com in comment.hotcom" :key="com.commentId">
          <div class="ator-img">
            <img :src="com.user ? com.user.avatarUrl : ''" alt="">
          </div>
          <div class="ator-info">
            <div><span class="ator">{{ com.user ? com.user.nickname : '' }}</span>：{{ com.content }}</div>
            <p>{{ dayjs(com.time).format('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
          <div class="comment-menu">
            <a><i class="iconfont icon-dianzan"></i><span>{{ com.likedCount }}</span></a>
            <a><i class="iconfont icon-zhuanfa"></i><span></span></a>
            <a><i class="iconfont icon-comment"></i><span></span></a>
          </div>
        </div>
      </div>
      <div class="comment-item">
        <h2>最新评论</h2>
        <div class="comment" v-for="com in comment.comments" :key="com.commentId">
          <div class="ator-img">
            <img :src="com.user.avatarUrl" alt="">
          </div>
          <div class="ator-info">
            <div><span class="ator">{{ com.user.nickname }}</span>：{{ com.content }}</div>
            <p>{{ dayjs(com.time).format('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
          <div class="comment-menu">
            <a><i class="iconfont icon-dianzan"></i><span>{{ com.likedCount }}</span></a>
            <a><i class="iconfont icon-zhuanfa"></i><span></span></a>
            <a><i class="iconfont icon-comment"></i><span></span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'Comment',
  props: {
    comment: Object
  },
  setup () {
    return {
      dayjs
    }
  }
})
</script>
<style lang="less" scoped>
.comment-container{
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;
  h2{
    color: #fff;
  }
  .comment-send{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    h2{
      span{
        font-size: 14px;
        color: #ccc;
        margin-left: 5px;
      }
    }
    .send{
      width: 100%;
      height: 100px;
      border-radius: 10px;
      border: 1px solid #fff;
      outline: none;
      overflow: hidden;
      padding: 10px;
    }
    i{
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #000;
      font-size: 20px;
    }
  }
  .comment-list{
    width: 100%;
    .comment-item{
      width: 100%;
      display: flex;
      flex-direction: column;
      .comment{
        display: flex;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #666;
        position: relative;
        .ator-img{
          width: 80px;
          height: 80px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .ator-info{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 3%;
          padding: 5px 0;
          font-size: 12px;
          letter-spacing: 1px;
          color: #fff;
          .ator{
            color: skyblue;
            font-weight: bold;
          }
          div{
            padding-right: 30px;
            line-height: 20px;
          }
          p{
            color: #ccc;
            font-size: 12px;
            margin: 0;
            margin-top: 5px;
          }
        }
        .comment-menu{
          display: flex;
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          color: #fff;
          a{
            margin: 0 15px;
          }
        }
      }
    }
  }
}
</style>
