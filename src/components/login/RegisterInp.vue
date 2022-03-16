<template>
  <h1>账号注册</h1>
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
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" style="margin: 0 5px;" round @click="submitForm(ruleFormRef)">注册</el-button>
      <el-button type="default" plain round @click="$router.push('/')">游客登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '@/api/request'
import { defineComponent, reactive, ref } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'RegisterInp',
  setup () {
    const ruleFormRef = ref(null)
    const ruleForm = reactive({
      cell: '',
      password: '',
      capture: ''
    })
    const rules = reactive({
      cell: [
        {
          required: true,
          message: '账号不可为空',
          trigger: 'blur'
        },
        {
          min: 11,
          max: 11,
          message: '格式错误',
          trigger: 'blur'
        }
      ],
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
      ],
      capture: [
        {
          required: true,
          message: '验证码不可为空',
          trigger: 'blur'
        },
        {
          min: 4,
          max: 4,
          message: '验证码为4位',
          trigger: 'blur'
        }
      ]
    })

    // 发送验证码
    const handleGetCapture = async () => {
      let flag = false
      let message = ''
      if (ruleForm.cell !== '' && ruleForm.cell.length === 11) {
        const sendStatus = await request('/captcha/sent', { phone: ruleForm.cell })
        if (sendStatus.code == '200') {
          message = '验证码发送成功'
          flag = true
        } else {
          message = sendStatus.msg
        }
      }
      if (ruleForm.cell === '') {
        message = '手机号不可为空'
      } else if (ruleForm.cell.length !== 11) {
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
            const validCapture = await request('/captcha/verify', { phone: ruleForm.cell, captcha: ruleForm.capture })
            if (!validCapture.data) {
              message = validCapture.message
            } else {
              const isRegister = await request('/cellphone/existence/check', { phone: ruleForm.cell })
              if (isRegister.exist) {
                message = '账号已存在，请前往登录'
              } else {
                const registerStatus = await request('/register/cellphone', { phone: ruleForm.cell, captcha: ruleForm.capture, password: ruleForm.password, nickname: '' })
                console.log(registerStatus)
                // flag = true
                // message = '登录成功!!!'
                // window.localStorage.setItem('LOGIN_COOKIE', JSON.stringify(loginStatus.cookie))
                // $router.push('/')
              }
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
      ruleForm,
      rules,
      ruleFormRef,
      submitForm,
      handleGetCapture
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
.userInp{
  .sendCap{
    box-sizing: border-box;
    position: absolute;
    right: 0;
    height: 32px;
    border: none;
    border-left: 1px solid #fff;
    margin-top: 1px;
    background: transparent;
    color: #666;
    font-size: 14px;
  }
}
.el-form-item /deep/ .el-form-item__content{
  display: flex;
  justify-content: space-between;
  margin-left: 0 !important;
}
.el-form-item /deep/ .el-button{
  margin-left: 0;
  width: 100%;
  letter-spacing: 3px;
}
</style>
