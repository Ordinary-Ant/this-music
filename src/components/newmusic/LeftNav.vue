<template>
  <nav class="left">
    <div class="nav-top">
      <a href="">新歌速递</a>
      <a href="">新碟到来</a>
    </div>
    <div class="nav-list">
      <ul>
        <li v-for="item in classList" :key="item.index" @click="emitItem(item.index)">
          <img :src="item.img" alt="">
          <div class="item-info">
            <h4>{{ item.name }}</h4>
            <span>今日更新</span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'LeftNav',
  setup (_, { emit }) {
    const classList = [
      { name: '全部', index: 0, img: 'https://img1.baidu.com/it/u=413660145,1508230903&fm=15&fmt=auto' },
      { name: '华语', index: 7, img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0ee116b3f7bcc4594525c12d14921ef586e52499173d1e-wgClwB_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637895847&t=1e93ef18d67783179ad4064790caa2a2' },
      { name: '欧美', index: 96, img: 'https://img2.baidu.com/it/u=3362864179,1401353653&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=261' },
      { name: '日本', index: 8, img: 'https://img1.baidu.com/it/u=3735849922,1486298950&fm=26&fmt=auto' },
      { name: '韩国', index: 16, img: 'https://img1.baidu.com/it/u=405119537,3127537927&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500' }
    ]

    // 触发自定义函数
    const emitItem = (index) => {
      emit('getIndex', index)
    }
    return {
      classList,
      emitItem
    }
  }
})
</script>
<style lang="less" scoped>
.left{
  width: 26%;
  height: 100%;
  background: #fff;
  margin-right: 1%;
  box-shadow: 0 3px 5px rgba(32,160,255,.5);
  border-radius: 10px;
  .nav-top{
    width: 80%;
    margin: 10px auto;
    padding: 20px 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    a{
      text-decoration: none;
      width: 50%;
      text-align: center;
      color: #666;
      letter-spacing: 3px;
    }
  }
  .nav-list{
    ul{
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      margin: 0;
      li{
        padding: 10px 30px;
        display: flex;
        height: 80px;
        transition: all .6s ease-in-out;
        cursor: pointer;
        img{
          width: 34%;
          margin-right: 10%;
        }
        .item-info{
          h4{
            margin-top: 12px;
          }
          span{
            font-size: 14px;
            color: #666;
          }
        }
        &:hover{
          background: #ccc;
        }
      }
    }
  }
}
</style>
