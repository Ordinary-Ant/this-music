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
import { defineComponent, reactive, toRefs, ref } from '@vue/runtime-core'
export default defineComponent({
  name: 'PhoneLogin',
  setup () {
    const ruleFormRef = ref()
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
            message: '验证码不可为空',
            trigger: 'blur'
          }
        ]
      }
    })

    // 自定义邮箱验证规则
    const validateEmail = (rule, value, callback) => {
      const validate = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/
      if (value === '') {
        callback(new Error('邮箱不可为空'))
      } else if (!validate.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }

    // 验证表单并发起登录请求
    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        console.log(fields)
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
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
