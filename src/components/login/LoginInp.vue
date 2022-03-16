<template>
  <h1>账号登录</h1>
  <router-view />
  <section class="btn-Group">
    <el-button @click="typeLogin('Phone')" type="warning" icon="el-icon-phone" v-if="type !== 'Phone'" circle></el-button>
    <el-button @click="typeLogin('Qr')" type="danger" icon="el-icon-full-screen" v-if="type !== 'Qr'"  circle></el-button>
    <el-button @click="typeLogin('Email')" type="primary" icon="el-icon-message" v-if="type !== 'Email'"  circle></el-button>
  </section>
  <section class="verify">登录即已同意<span>《用户协议》《隐私政策》</span></section>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LoginInp',
  setup () {
    const $router = useRouter()
    const state = reactive({
      type: 'Qr'
    })

    const typeLogin = (type) => {
      state.type = type
      $router.push({ name: type + 'Login' })
    }

    onMounted(() => {
      $router.push({ name: state.type + 'Login' })
    })

    return {
      ...toRefs(state),
      typeLogin
    }
  }
})
</script>

<style lang="less" scoped>
h1{
  color: #a37eba;
  margin-bottom: 30px;
  font-weight: normal;
  letter-spacing: 2px;
}
.verify{
  bottom: 10px;
  width: 340px;
  position: absolute;
  font-size: 12px;
  color: #666;
  text-align: center;
  span{
    color: #f6f6f6;
  }
}

.btn-Group{
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  button {
    margin: 0 10px;
  }
}
</style>
