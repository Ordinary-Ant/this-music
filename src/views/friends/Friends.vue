<template>
  <div class="friend-container">
    <FriendBody />
    <MindInfo />
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
import MindInfo from '@/components/friends/MindInfo.vue'
import FriendBody from '@/components/friends/FriendBody.vue'
export default defineComponent({
  name: 'Friends',
  setup () {
    return {
    }
  },
  components: {
    FriendBody,
    MindInfo
  }
})
</script>
<style lang="less" scoped>
.friend-container{
  display: flex;
  justify-content: space-between;
}
</style>
