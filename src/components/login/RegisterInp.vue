<template>
  <h1>账号注册</h1>
  <el-form
    ref="ruleForm"
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
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" round @click="handleRegister">注册</el-button>
      <el-button type="default" plain round @click="$router.push('/')">游客登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'RegisterInp',
  setup () {
    const ruleForm = {
      cell: '',
      password: '',
      capture: ''
    }
    const rules = {
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
    }

    const handleRegister = () => {
      console.log(111)
    }
    return {
      handleRegister,
      ruleForm,
      rules
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
  margin-left: 0 !important;
}
.el-form-item /deep/ .el-button{
  margin-left: 0;
  margin-bottom: 10px;
  width: 100%;
  letter-spacing: 3px;
}
</style>
