<template>
  <div class="sheet-sing">
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/runtime-core'
// import request from '@/api/request'
export default defineComponent({
  name: 'SheetSing',
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
.sheet-sing{
}
</style>
