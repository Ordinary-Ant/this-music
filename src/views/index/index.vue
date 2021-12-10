<template>
  <div class="content-container">
    <div class="content">
      <TopNav />
      <router-view v-slot="{ Component }">
        <!-- <transition> -->
          <keep-alive exclude="Player">
            <component :is="Component" />
          </keep-alive>
        <!-- </transition> -->
      </router-view>
      <!-- <router-view /> -->
    </div>
    <FooterInfo />
    <PlayList />
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
import TopNav from '@/components/common/Topnav.vue'
import FooterInfo from '@/components/common/FooterInfo.vue'
import PlayList from '@/components/common/PlayList.vue'
export default defineComponent({
  name: 'Index',
  setup () {
    return {
    }
  },
  components: {
    TopNav,
    FooterInfo,
    PlayList
  }
})
</script>
<style lang="less" scoped>
.content-container{
  // height: 100%;
  overflow: hidden;
  background: url(../../assets/index.gif);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  .content{
    padding: 0 150px;
    min-width: 1200px;
    max-width: 1450px;
    margin: 0 auto;
  }
}
</style>
