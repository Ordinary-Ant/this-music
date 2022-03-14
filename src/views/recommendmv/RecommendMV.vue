<template>
  <div class="mv-container">
    <MVRank :rankList="rankList"/>
    <h2>
      全部MV
    </h2>
    <div class="mv-class">
      <div class="local">
        <span>地区</span>
        <ul @click="handleSetArea">
          <li :class="area === '全部' ? 'show' : ''">全部</li>
          <li :class="area === '内地' ? 'show' : ''">内地</li>
          <li :class="area === '欧美' ? 'show' : ''">欧美</li>
          <li :class="area === '日本' ? 'show' : ''">日本</li>
          <li :class="area === '韩国' ? 'show' : ''">韩国</li>
          <li :class="area === '港台' ? 'show' : ''">港台</li>
        </ul>
      </div>
      <div class="gender">
        <span>类别</span>
        <ul @click="handleSetType">
          <li :class="type === '全部' ? 'show' : ''">全部</li>
          <li :class="type === '官方版' ? 'show' : ''">官方版</li>
          <!-- <li :class="type === '原生' ? 'show' : ''">原生</li> -->
          <li :class="type === '现场版' ? 'show' : ''">现场版</li>
          <li :class="type === '网易出品' ? 'show' : ''">网易出品</li>
        </ul>
      </div>
      <div class="sort">
        <span>排序</span>
        <ul @click="handleSetOrder">
          <li :class="order === '上升最快' ? 'show' : ''">上升最快</li>
          <li :class="order === '最热' ? 'show' : ''">最热</li>
          <li :class="order === '最新' ? 'show' : ''">最新</li>
        </ul>
      </div>
    </div>
    <VideoList :video="allMv"/>
    <div class="page-container">
      <el-pagination background layout="pager" :total="total" :page-size="28" @current-change="handleUpdatePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import MVRank from '@/components/mv/MVRank.vue'
import VideoList from '@/components/mv/videoList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'RecommendMv',
  setup () {
    const state = reactive({
      rankList: [],
      allMv: [],
      type: '全部',
      area: '全部',
      order: '上升最快',
      total: 0
    })

    // 获取所有MV数据
    const getAllMV = async () => {
      getMV()
      const rank = await request('/top/mv', { limit: 10 })
      state.rankList = markRaw(rank.data)
    }

    // 获取MV数据
    const getMV = async (offset = 0) => {
      // console.log(state.order, state.type)
      const mv = await request('/mv/all', { type: state.type, area: state.area, order: state.order, offset, limit: 28 })
      state.allMv = markRaw(mv.data)
      state.total = mv.count
    }

    // 当前页数修改
    const handleUpdatePage = (page) => {
      const offset = (page - 1) * 28
      getMV(offset)
    }

    // 根据地区获取MV数据
    const handleSetArea = (e) => {
      if (e.target.tagName === 'UL') return
      state.area = e.target.textContent
      getMV()
    }
    // 根据类型获取MV数据
    const handleSetType = (e) => {
      if (e.target.tagName === 'UL') return
      state.type = e.target.textContent
      getMV()
    }
    // 根据排序获取MV数据
    const handleSetOrder = (e) => {
      if (e.target.tagName === 'UL') return
      state.order = e.target.textContent
      getMV()
    }

    onMounted(() => {
      getAllMV()
    })

    return {
      ...toRefs(state),
      handleSetArea,
      handleSetType,
      handleSetOrder,
      handleUpdatePage
    }
  },
  components: {
    MVRank,
    VideoList
  }
})
</script>
<style lang="less" scoped>
.mv-container{
  h2{
    color: #fff;
    letter-spacing: 2px;
    font-size: 26px;
    margin: 40px 0 0;
  }
  .mv-class{
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 10px;
    .local,.gender,.sort{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      span{
        line-height: 40px;
        color: #fff;
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
          margin: 0 5px;
          color: #ccc;
          font-size: 14px;
          cursor: pointer;
          padding: 10px;
          border-radius: 5px;
        }
        .show{
          background-image: linear-gradient(to right, #acb6e5 , #86fde8 );
          color: #fff;
        }
      }
    }
  }
  .page-container{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-pagination.is-background /deep/ .el-pager li{
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
    .el-pagination /deep/ .btn-prev,.el-pagination /deep/ .btn-next {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
