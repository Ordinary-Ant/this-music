<template>
  <div class="phonelogin-container-wrap">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item prop="cell">
        <el-input v-model="ruleForm.cell" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="capture">
        <el-input v-model="ruleForm.capture" placeholder="请输入验证码"></el-input>
        <el-button type="primary" style="width: 40%; margin-left: 5px;" round @click="handleGetCapture(ruleFormRef)">获取验证码</el-button>
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
    const state = reactive({
      ruleForm: {
        cell: '',
        capture: ''
      },
      rules: {
        cell: [
          {
            required: true,
            message: '手机号不可为空',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '格式错误',
            trigger: 'blur'
          }
        ],
        capture: [
          {
            required: true,
            message: '验证码不可为空',
            trigger: 'blur'
          }
        ]
      }
    })

    // 发送验证码
    const handleGetCapture = async () => {
      let flag = false
      let message = ''
      if (state.ruleForm.cell !== '' && state.ruleForm.cell.length === 11) {
        const sendStatus = await request('/captcha/sent', { phone: state.ruleForm.cell })
        if (sendStatus.code == '200') {
          message = '验证码发送成功'
          flag = true
        } else {
          message = sendStatus.msg
        }
      }
      if (state.ruleForm.cell === '') {
        message = '手机号不可为空'
      } else if (state.ruleForm.cell.length !== 11) {
        message = '手机号格式错误'
      }
      ElMessage({
        message,
        type: flag ? 'success' : 'warning'
      })
    }

    // 验证表单并提交登录请求
    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate(async (valid) => {
        if (valid) {
          let flag = false
          let message = ''
          try {
            const validCapture = await request('/captcha/verify', { phone: state.ruleForm.cell, captcha: state.ruleForm.capture })
            if (!validCapture.data) {
              message = validCapture.message
            } else {
              const loginStatus = await request('/login/cellphone', { phone: state.ruleForm.cell, captcha: state.ruleForm.capture })
              console.log(loginStatus)
              // flag = true
              // message = '登录成功!!!'
              // window.localStorage.setItem('LOGIN_COOKIE', JSON.stringify(loginStatus.cookie))
              // $router.push('/')
            }
          } catch (error) {
            if (error.message.indexOf('503') !== -1) {
              message = '验证码已失效，请重新获取'
            }
          }
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
      handleGetCapture,
      submitForm
    }
  }
})
</script>
<style lang="less" scoped>
.el-form-item /deep/ .el-form-item__content{
  display: flex;
  justify-content: space-between;
  margin-left: 0 !important;
}
.el-form-item /deep/ .el-button{
  width: 100%;
  letter-spacing: 3px;
}
</style>
