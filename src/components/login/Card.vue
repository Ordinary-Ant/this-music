<template>
  <div class="card-container right-panel-active" ref="container">
    <!-- 账号登录 -->
    <div class="form-wrap formIn" v-if="isLogin">
      <LoginInp />
    </div>
    <!-- 账号注册 -->
    <div class="form-wrap formUp" v-else>
      <RegisterInp />
    </div>
    <!-- 按钮组 -->
    <div class="card-overlay">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <el-button type="danger" round icon="el-icon-arrow-left" @click="handleClick('in')">已有账号</el-button>
        </div>
        <div class="overlay-panel overlay-right">
          <el-button type="success" round icon="el-icon-arrow-right" @click="handleClick('up')">前去注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/runtime-core'
import LoginInp from './LoginInp.vue'
import RegisterInp from './RegisterInp.vue'
export default defineComponent({
  name: 'LoginCard',
  props: {
  },
  setup () {
    const isLogin = ref(false)
    const container = ref(null)

    const handleClick = (type) => {
      if (type === 'in') {
        container.value.classList.remove('right-panel-active')
        isLogin.value = true
      } else {
        container.value.classList.add('right-panel-active')
        isLogin.value = false
      }
    }

    return {
      handleClick,
      container,
      isLogin
    }
  },
  components: {
    LoginInp,
    RegisterInp
  }
})
</script>

<style lang="less" scoped>
@max-width: 758px;
@max-height: 420px;

.card-container{
  max-width: @max-width;
  height: @max-height;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 0 15px 2px rgba(0,0,0,.5);
  overflow: hidden;
  width: 100%;
  z-index: 2;
  .form-wrap{
    height: 100%;
    box-sizing: border-box;
    top: 0;
    position: absolute;
    transition: all .6s ease-in-out;
    padding: 20px 20px 20px;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  .card-overlay{
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
    .overlay{
      background: url(../../assets/bg.gif);
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      left: -100%;
      position: relative;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 200%;
      .overlay-panel{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: absolute;
        top: 0;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        .btn{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          box-shadow: 0 0 10px rgba(0, 0, 0, .4);
          cursor: pointer;
          transition: transform .8s ease-in;
        }
      }
      .overlay-left{
        transform: translateX(-20%);
      }
      .overlay-right{
        right: 0;
        transform: translateX(0);
      }
    }
  }
  .formIn{
    left: 0;
    width: 50%;
    z-index: 2;
  }
  .formUp{
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
  }
}
.card-container.right-panel-active{
  .card-overlay{
    transform: translateX(-100%);
    .overlay{
      transform: translateX(50%);
      .overlay-left{
        transform: translateX(0);
      }
      .overlay-right{
        transform: translateX(20%);
      }
    }
  }
  .formIn{
    transform: translateX(100%);
  }
  .formUp{
    animation: show 0.6s;
    opacity: 1;
    z-index: 5;
    transform: translateX(100%);
  }
}
@keyframes show {
  0%,
  49%{
    opacity: 0;
    z-index: 1;
  }
  50%,
  100%{
    opacity: 1;
    z-index: 5;
  }
}
</style>
