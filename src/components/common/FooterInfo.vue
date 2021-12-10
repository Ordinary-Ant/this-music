<template>
  <footer>
    <div class="footer-wrap">
      <div class="footer-left">
        <p class="link">
          <i class="link-item">服务条款</i><span class="line">|</span>
          <i class="link-item">隐私政策</i><span class="line">|</span>
          <i class="link-item">儿童隐私政策</i><span class="line">|</span>
          <i class="link-item">版权投诉指引</i><span class="line">|</span>
          <i class="link-item">意见反馈</i><span class="line">|</span>
          <i class="link-item">广告合作</i>
        </p>
        <p class="info">此页面仅供学习参考使用，无版权限制</p>
        <p class="info">应用版号: 0.0.0.1 | 开发者: 子舟 | 联系电话: 13670030868 | 联系邮箱: 2379701042@qq.com</p>
      </div>
      <div class="split"></div>
      <div class="footer-right">
        <h5>一起学习:</h5>
        <div class="info-img">
          <img src="@/assets/wechat.png" alt="wechat">
          <img src="@/assets/qq.png" alt="qq">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'FooterInfo',
  setup () {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
footer{
  margin-top: 40px;
  background: #000;
  .footer-wrap{
    width: 100%;
    margin: 0 auto;
    padding: 30px 150px;
    min-width: 1200px;
    max-width: 1450px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer-left{
      font-size: 14px;
      letter-spacing: 2px;
      .link{
        color: #666;
        .link-item{
          font-weight: normal;
          font-style: normal;
          padding: 0 10px;
          cursor: pointer;
        }
      }
      .info{
        color: #ccc;
        padding: 0 10px;
      }
    }
    .split{
      height: 200px;
      width: 1px;
      background: #fff;
      margin: 0 20px;
    }
    .footer-right{
      display: flex;
      flex-direction: column;
      color: #ccc;
      font-weight: normal;
      letter-spacing: 2px;
      .info-img{
        img{
          width: 150px;
          height: 150px;
          margin-right: 40px;
        }
      }
    }
  }
}

</style>
