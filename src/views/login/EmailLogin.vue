<template>
  <div class="emaillogin-container-wrap">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" round @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/api/request'
import { defineComponent, reactive, toRefs, ref } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'PhoneLogin',
  setup () {
    const $router = useRouter()
    const ruleFormRef = ref()
    // 自定义邮箱验证规则
    const validateEmail = (rule, value, callback) => {
      const validate = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@163.[a-zA-Z]{2,6}$/
      console.log(value)
      if (value === '') {
        callback(new Error('邮箱不可为空'))
      } else if (!validate.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }

    const state = reactive({
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [
          {
            required: true,
            message: '密码不可为空',
            trigger: 'blur'
          },
          {
            min: 8,
            message: '密码最少为8位',
            trigger: 'blur'
          }
        ]
      }
    })

    // 验证表单并发起登录请求
    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate(async (valid) => {
        if (valid) {
          let flag = false
          let message = ''
          const loginStatus = await request('/login', { email: state.ruleForm.email, password: state.ruleForm.password })
          console.log(loginStatus)
          // flag = true
          // message = '登录成功!!!'
          // window.localStorage.setItem('LOGIN_COOKIE', JSON.stringify(loginStatus.cookie))
          // $router.push('/')
          ElMessage({
            message,
            type: flag ? 'success' : 'warning'
          })
        }
      })
    }

    return {
      ...toRefs(state),
      ruleFormRef,
      submitForm
    }
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
</style>
