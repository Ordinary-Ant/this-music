<template>
  <div class="singer-container">
    <div class="singer-class">
      <div class="local">
        <span>地区</span>
        <ul>
            <li><a>全部</a></li>
            <li><a>华语</a></li>
            <li><a>欧美</a></li>
            <li><a>日本</a></li>
            <li><a>韩国</a></li>
            <li><a>其他</a></li>
        </ul>
      </div>
      <div class="gender">
        <span>类别</span>
        <ul>
            <li><a>全部</a></li>
            <li><a>男歌手</a></li>
            <li><a>女歌手</a></li>
            <li><a>乐队组合</a></li>
        </ul>
      </div>
      <div class="initial">
        <span>筛选</span>
        <ul>
            <li><a>A</a></li>
            <li><a>B</a></li>
            <li><a>C</a></li>
            <li><a>D</a></li>
            <li><a>E</a></li>
            <li><a>F</a></li>
            <li><a>G</a></li>
            <li><a>H</a></li>
            <li><a>I</a></li>
            <li><a>J</a></li>
            <li><a>K</a></li>
            <li><a>L</a></li>
            <li><a>M</a></li>
            <li><a>N</a></li>
            <li><a>O</a></li>
            <li><a>P</a></li>
            <li><a>Q</a></li>
            <li><a>R</a></li>
            <li><a>S</a></li>
            <li><a>T</a></li>
            <li><a>U</a></li>
            <li><a>V</a></li>
            <li><a>W</a></li>
            <li><a>X</a></li>
            <li><a>Y</a></li>
            <li><a>Z</a></li>
            <li><a>#</a></li>
        </ul>
      </div>
    </div>
    <SingerList :singers="singers"/>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import SingerList from '@/components/singer/SingerList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'Singer',
  setup () {
    const state = reactive({
      singers: []
    })

    // 获取所有歌手信息
    const getSingers = async () => {
      const all = await request('/artist/list', { type: -1, area: -1, limit: 35 })
      state.singers = markRaw(all.artists)
    }
    onMounted(() => {
      getSingers()
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    SingerList
  }
})
</script>
<style lang="less" scoped>
.singer-container{
  margin-top: 20px;
  .singer-class{
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 40px;
    .local,.gender,.initial{
      display: flex;
      flex-direction: column;
      span{
        line-height: 40px;
        color: #fff;
        font-weight: bold;
        letter-spacing: 3px;
        font-size: 18px;
        width: 80px;
        text-align: center;
        border-radius: 30px;
        background-image: linear-gradient(to right, #acb6e5 , #86fde8 );
        box-shadow: 0 3px 5px rgba(32,160,255,.5);
        margin-bottom: 20px;
      }
      ul{
        display: flex;
        list-style: none;
        margin: 0;
        li{
          font-weight: bold;
          margin: 0 20px;
          color: #ccc;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .local,.gender{
      margin-bottom: 20px;
    }
  }
}
</style>
