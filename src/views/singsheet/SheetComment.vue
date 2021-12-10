<template>
  <div class="sheet-comment">
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/runtime-core'
// import request from '@/api/request'
export default defineComponent({
  name: 'SheetComment',
  setup () {
    const state = reactive({
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
  }
})
</script>
<style lang="less" scoped>
.sheet-comment{
}
</style>
