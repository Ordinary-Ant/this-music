<template>
  <!-- <div class="header"> -->
    <header>
      <section class="top-nav-container">
        <section class="top-nav">
          <div class="logo" @click="$router.push('/')">
            <img src="@/assets/logo.png" alt="logo">
          </div>
          <div class="nav-list">
            <ul>
              <li @click="$router.push('/')" :class="{ 'active': state === '/' }">主页</li>
              <li @click="$router.push('/video')" :class="{ 'active': state === '/video' }">视频</li>
              <li @click="$router.push('/station')" :class="{ 'active': state === '/station' }">电台</li>
              <li @click="$router.push('/friends')" :class="{ 'active': state === '/friends' }">动态</li>
              <li @click="$router.push('/privatefm')" :class="{ 'active': state === '/privatefm' }">私人</li>
            </ul>
          </div>
          <div class="search">
            <label for="search-inp" class="search-lab">
              <i class="iconfont icon-search"></i>
            </label>
            <input type="text" id="search-inp" placeholder="请输入要搜索的内容">
          </div>
          <div class="awator-container">
            <a class="photo">
              <img src="@/assets/awator.webp" alt="awator">
            </a>
            <div class="loginDool" @click="$router.push('/login')">
              <span>登录</span>
              <span>/</span>
              <span>注册</span>
            </div>
          </div>
        </section>
      </section>
    </header>
  <!-- </div> -->
</template>

<script>
import { defineComponent, onMounted, ref, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'TopNav',
  setup () {
    const state = ref('/')
    const $route = useRoute()
    onMounted(() => {
      state.value = $route.path
    })
    // 监视路由变化
    watch(() => $route.path, (newVal) => {
      state.value = newVal
    })
    return {
      state
    }
  }
})
</script>

<style lang="less" scoped>
header{
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  .top-nav-container{
    height: 100%;
    .top-nav{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .nav-list{
        width: 45%;
        height: 60px;
        ul{
          list-style: none;
          display: flex;
          align-items: center;
          height: 100%;
          margin: 0;
          padding: 0;
          li{
            width: 20%;
            height: 100%;
            line-height: 60px;
            text-align: center;
            margin: 0 10px;
            border-radius: 10px;
            font-size: 16px;
            letter-spacing: 2px;
            color: #fff;
            transition: all .6s ease-in-out;
            cursor: pointer;
            &:hover{
              background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
              box-shadow: 0 0 10px 2px rgba(255, 255, 255, .5),
                          0 0 20px 5px rgba(255, 255, 255, .8);
              color: #666;
            }
          }
          .active{
            background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, .5);
            color: #666;
          }
        }
      }
      .awator-container{
        display: flex;
        align-items: center;
        a{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid transparent;
          transition: border 0.6s ease-in-out;
          img{
            width: 100%;
          }
          &:hover{
            border: 2px solid rgba(255, 255, 255, .7);
          }
        }
        .loginDool{
          font-size: 14px;
          color: #fff;
          letter-spacing: 3px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .logo{
        box-sizing: border-box;
        width: 160px;
        height: 80%;
        border-radius: 60px;
        position: relative;
        cursor: pointer;
        transition: box-shadow 0.8s ease-in-out;
        img{
          width: 160px;
          position: absolute;
          top: -22%;
        }
        &:hover{
          box-shadow: 0 0 10px rgba(225, 255, 255, .6);
        }
      }
      .search{
        height: 40px;
        width: 240px;
        background: #fff;
        border-radius: 30px;
        overflow: hidden;
        display: flex;
        .search-lab{
          line-height: 40px;
          width: 40px;
          text-align: center;
          color: #666;
        }
        input{
          width: 200px;
          height: 100%;
          border: none;
          outline: none;
          padding: 0;
          margin: 0;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}

</style>
