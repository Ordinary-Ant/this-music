<template>
  <div class="sheet-container">
    <Elite :recommSheet="recommSheet"/>
    <div class="sheet-class">
      <div class="classes" v-for="(items, index) in Category" :key="index">
        <span>{{ CategoryName[index] }}</span>
        <ul>
          <li v-for="(item, index) in items" :key="index" :class="cat === item.name ? 'show' : ''"><a @click="handleSetCat(item.name)">{{ item.name }}</a></li>
        </ul>
      </div>
    </div>
    <SheetList :allSheet="allSheet"/>
    <div class="page-container">
      <el-pagination background layout="pager" :total="total" :page-size="30" @current-change="handleUpdatePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent, markRaw, onMounted, reactive, toRefs } from '@vue/runtime-core'
import Elite from '@/components/singsheet/Elite.vue'
import SheetList from '@/components/singsheet/SheetList.vue'
import request from '@/api/request'
export default defineComponent({
  name: 'SingSheet',
  setup () {
    const state = reactive({
      Category: [
        [], [], [], [], []
      ],
      recommSheet: [],
      allSheet: [],
      CategoryName: ['语言', '风格', '场景', '情感', '主题'],
      cat: '',
      total: 0
    })
    // 获取所有歌单和精品歌单
    const getSheetsState = async () => {
      const allCategory = await request('/playlist/catlist')
      const sheetList = await request('/top/playlist/highquality', { limit: 4 })
      getSheets()
      state.recommSheet = markRaw(sheetList.playlists)
      allCategory.sub.forEach(c => {
        state.Category[c.category].push(c)
      })
    }
    // 获取歌单
    const getSheets = async (offset = 0) => {
      let allSheet = []
      if (state.cat !== '') {
        allSheet = await request('/top/playlist', { cat: state.cat, limit: 30, offset })
      } else {
        allSheet = await request('/top/playlist', { limit: 30, offset })
      }
      state.allSheet = allSheet.playlists
      state.total = allSheet.total
    }
    // 根据类型获取歌单
    const handleSetCat = (name) => {
      state.cat = name
      getSheets()
    }

    // 当前页数修改
    const handleUpdatePage = (page) => {
      const offset = (page - 1) * 30
      getSheets(offset)
    }

    onMounted(() => {
      getSheetsState()
    })
    return {
      ...toRefs(state),
      handleSetCat,
      handleUpdatePage
    }
  },
  components: {
    Elite,
    SheetList
  }
})
</script>
<style lang="less" scoped>
.sheet-container{
  margin-top: 20px;
  .sheet-class{
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 20px;
    .classes{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;
      span{
        line-height: 40px;
        height: 40px;
        color: #fff;
        width: 80px;
        letter-spacing: 3px;
        font-size: 18px;
        text-align: center;
        border-radius: 30px;
        background-image: linear-gradient(to right, #acb6e5 , #86fde8 );
        box-shadow: 0 3px 5px rgba(32,160,255,.5);
      }
      ul{
        flex: 1;
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        margin: 0;
        li{
          margin: 3px 10px;
          color: #ccc;
          font-size: 14px;
          cursor: pointer;
          padding: 5px 5px;
          border-radius: 10px;
          transition: all .5s ease-in-out;
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
.show{
  background-image: linear-gradient(to right, #acb6e5 , #86fde8);
  a{
    color: #fff;
  }
}
</style>
