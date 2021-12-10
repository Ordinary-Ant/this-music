<template>
  <h1>账号登录</h1>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item prop="cell">
      <el-input v-model="ruleForm.cell" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <!-- <el-form-item prop="capture">
      <el-input v-model="ruleForm.capture"></el-input>
    </el-form-item> -->
    <el-form-item>
      <el-button type="success" round @click="submitForm('ruleForm')">登录</el-button>
    </el-form-item>
    <section class="btn-Group">
      <el-button type="warning" icon="el-icon-phone" circle></el-button>
      <el-button type="danger" icon="el-icon-full-screen" circle></el-button>
      <el-button type="primary" icon="el-icon-message" circle></el-button>
    </section>
  </el-form>
  <section class="verify">登录即已同意<span>《用户协议》《隐私政策》《中国移动认证服务协议》</span></section>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'LoginInp',
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
      ]
    }

    return {
      ruleForm,
      rules
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
  font-size: 14px;
  color: #666;
  text-align: center;
  span{
    color: #f6f6f6;
  }
}
.el-form-item /deep/ .el-form-item__content{
  margin-left: 0 !important;
}
.el-form-item /deep/ .el-button{
  width: 100%;
  letter-spacing: 3px;
}
.btn-Group{
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
