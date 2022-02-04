<template>
  <div class="sheet-comment">
    <Comment :comment="comment"/>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, markRaw, watch } from '@vue/runtime-core'
import request from '@/api/request'
import Comment from '@/components/common/Comment.vue'
export default defineComponent({
  name: 'SheetComment',
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const state = reactive({
      comment: {
        hotcom: [],
        comments: []
      }
    })

    // 获取歌单评论
    const getComment = async () => {
      const def = await request('/comment/playlist', { id: props.id, limit: 10 })
      state.comment.hotcom = markRaw(def.hotComments)
      state.comment.comments = markRaw(def.comments)
    }

    onMounted(() => {
      getComment()
    })

    watch(() => props.id, () => {
      getComment()
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    Comment
  }
})
</script>
