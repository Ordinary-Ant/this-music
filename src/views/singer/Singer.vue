<template>
  <div class="singer-container">
    <div class="singer-class">
      <div class="local">
        <span>地区</span>
        <ul @click="handleSetArea">
          <li><a data-area="-1">全部</a></li>
          <li><a data-area="7">华语</a></li>
          <li><a data-area="96">欧美</a></li>
          <li><a data-area="8">日本</a></li>
          <li><a data-area="16">韩国</a></li>
          <li><a data-area="0">其他</a></li>
        </ul>
      </div>
      <div class="gender">
        <span>类别</span>
        <ul @click="handleSetType">
          <li><a data-type="-1">全部</a></li>
          <li><a data-type="1">男歌手</a></li>
          <li><a data-type="2">女歌手</a></li>
          <li><a data-type="3">乐队组合</a></li>
        </ul>
      </div>
      <div class="initial">
        <span>筛选</span>
        <ul @click="handleSetInitial">
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
    <div class="page-container">
      <div class="prev-text" @click="handlePrev"><i class="iconfont icon-angle-double-left"></i></div>
      <div class="next-text" @click="handleNext"><i class="iconfont icon-angle-double-right"></i></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/runtime-core'
import SingerList from '@/components/singer/SingerList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'Singer',
  setup () {
    const state = reactive({
      singers: [],
      initial: '',
      type: -1,
      area: -1,
      offset: 0,
      more: true
    })

    // 获取所有歌手信息
    const getSingers = async (offset = 0) => {
      let all
      if (state.initial !== '') {
        all = await request('/artist/list', { type: state.type, area: state.area, initial: state.initial, limit: 35, offset })
      } else {
        all = await request('/artist/list', { type: state.type, area: state.area, limit: 35, offset })
      }
      state.more = all.more
      state.singers = all.artists
    }

    // 当前页数修改
    const handleNext = () => {
      if (state.more) {
        state.offset += 35
        getSingers(state.offset)
      }
    }
    // 当前页数修改
    const handlePrev = () => {
      if (state.offset <= 0) return
      state.offset -= 35
      getSingers(state.offset)
    }

    // 根据类型搜索歌手
    const handleSetType = (e) => {
      state.type = e.target.dataset.type
      getSingers()
    }
    // 根据地区搜索歌手
    const handleSetArea = (e) => {
      state.area = e.target.dataset.area
      getSingers()
    }
    // 根据首字母搜索歌手
    const handleSetInitial = (e) => {
      state.initial = e.target.textContent.toLowerCase()
      getSingers()
    }

    onMounted(() => {
      getSingers()
    })
    return {
      ...toRefs(state),
      handleSetType,
      handleSetArea,
      handleSetInitial,
      handlePrev,
      handleNext
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
  .page-container{
    height: 50px;
    // margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .prev-text,.next-text{
      cursor: pointer;
      i{
        font-size: 40px;
        color: #fff;
        text-shadow: 0 0 10px rgba(255,255,255,.5);
      }
    }
  }
}
</style>
