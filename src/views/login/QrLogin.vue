<template>
  <div class="qrlogin-container-wrap">
    <el-image :src="src">
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
    <div class="qr-cover" v-if="messageType !== ''">
      <div class="cover-message">
        <div class="qr-loading" v-if="messageType === 'loading'">
          <el-icon class="is-loading">
            <loading />
          </el-icon>
          扫码成功,请稍等
        </div>
        <div class="qr-success" v-if="messageType !== 'success'">
          <el-icon>
            <check />
          </el-icon>
          登录成功,跳转中
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from '@vue/runtime-core'
import { Picture as IconPicture, Loading, Check } from '@element-plus/icons-vue'
import request from '@/api/request'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'QrLogin',
  setup () {
    const $router = useRouter()
    const state = reactive({
      src: '',
      key: '',
      timer: null,
      messageType: ''
    })

    // 获取二维码
    const getQr = async () => {
      // 获取key
      const key = await request('/login/qr/key?time=' + Date.now())
      state.key = key.data.unikey
      // 生成二维码
      const qr = await request('/login/qr/create', { key: key.data.unikey, qrimg: 1, time: Date.now() })
      state.src = qr.data.qrimg
      // 轮询检测登录状态
      loopCheckLoginStatus()
    }

    // 轮询检测登录状态
    const loopCheckLoginStatus = async () => {
      if (state.key === '') return
      clearTimeout(state.timer)
      state.timer = null
      const status = await request('/login/qr/check', { key: state.key, timer: Date.now() })
      switch (status.code) {
        case 800:
          clearTimeout(state.timer)
          state.timer = null
          getQr()
          return
        case 802:
          state.messageType = 'loading'
          break
        case 803:
          state.messageType = 'success'
          window.localStorage.setItem('LOGIN_COOKIE', JSON.stringify(status.cookie))
          state.key = ''
          $router.push('/')
          break
      }
      if (state.key !== '') state.timer = setTimeout(loopCheckLoginStatus, 1000)
    }

    onMounted(() => {
      getQr()
    })

    onUnmounted(() => {
      console.log(111)
      clearTimeout(state.timer)
      state.timer = null
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    IconPicture,
    Loading,
    Check
  }
})
</script>
<style lang="less" scoped>
.el-form-item /deep/ .el-form-item__content{
  margin-left: 0 !important;
}
.el-form-item /deep/ .el-button{
  width: 100%;
  letter-spacing: 3px;
}
.qrlogin-container-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrlogin-container-wrap .el-image {
  padding: 0 5px;
  max-width: 200px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}
.qrlogin-container-wrap .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.qrlogin-container-wrap .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
.qrlogin-container-wrap .image-slot .el-icon {
  font-size: 30px;
}
.qr-cover{
  width: 60%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  transform: translate(-50%, -50%);
  .cover-message{
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, .8);
    padding: 5px;
    font-size: 14px;
    i{
      vertical-align: bottom;
    }
  }
}
</style>
