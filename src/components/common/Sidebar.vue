<template>
  <section>
    <nav>
      <a class="nav-item"><i class="iconfont icon-wxbzhuye"></i><span>111</span></a>
      <a class="nav-item"><i class="iconfont icon-wode"></i><span>111</span></a>
      <a class="nav-item" @click="$router.push('/newmusic')"><i class="iconfont icon-shouye"></i><span>111</span></a>
      <a class="nav-item" @click="$router.push('/friends')"><i class="iconfont icon-pengyou"></i><span>111</span></a>
      <a class="nav-item"><i class="iconfont icon-paihangbang"></i><span>111</span></a>
    </nav>
  </section>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'Sidebar',
  setup () {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
section{
  position: fixed;
  top: 200px;
  left: 20px;
  z-index: 9999;
  nav{
    width: 80px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #F1F6F9;
    border-radius: 10px;
    transition: all .6s ease-in-out;
    .nav-item{
      display: block;
      height: 20%;
      width: 90%;
      margin: 10px;
      border-radius: 5px;
      position: relative;
      transition: all .3s ease-in-out;
      color: rgba(0, 0, 0, .7);
      i{
        font-size: 40px;
        position: absolute;
        margin: 7px 0 0 15px;
      }
      span{
        position: relative;
        top: 17px;
        left: 80px;
        font: 500 20px '';
        opacity: 0;
        transition: .1s;
      }
      &:nth-child(1)::before{
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: rgba(0, 0, 0, .7);
        position: absolute;
        bottom: -10px;
      }
      &:hover{
        background-color: rgba(255, 255, 255, .8);
        color: #000;
      }
    }
    &:hover{
      width: 270px;
      span{
        opacity: 1;
      }
    }
  }
}
</style>
