<template>
  <div class="login-container-wrap">
    <LoginCard />
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
import LoginCard from '@/components/login/Card.vue'
export default defineComponent({
  name: 'Login',
  setup () {
    return {
    }
  },
  components: {
    LoginCard
  }
})
</script>
<style lang="less">
.login-container-wrap{
  width: 100%;
  height: 100%;
  background: url(../../assets/bg.gif);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  align-items: center;
  display: grid;
  place-items: center;
}
</style>
