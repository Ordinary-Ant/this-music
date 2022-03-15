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
import { defineComponent, reactive, toRefs, ref } from '@vue/runtime-core'
export default defineComponent({
  name: 'PhoneLogin',
  setup () {
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
      console.log(111)
    }

    // 验证表单并提交登录请求
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
  .capture {
    margin-left: 5px;
    width: 40%;
  }
}
.el-form-item /deep/ .el-button{
  width: 100%;
  letter-spacing: 3px;
}
</style>
