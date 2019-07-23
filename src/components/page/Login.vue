<template>
  <div class="login-wrap">
    <!--轮播-->
   <el-carousel :interval="3000" height="100%" arrow="never">
    <el-carousel-item v-for="item in 4" :key="item">
    </el-carousel-item>
  </el-carousel>

    <div class="ms-login">
      <div class="ms-title">沃橙C2媒资注入平台登录</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名" clearable size="large">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
            clearable
            size="large"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')" size="large">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
        <p class="login-tips">Tips : 请正确填写用户名和密码</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/request";
export default {
  data: function() {
    return {
      ruleForm: {
        // username: 'admin',
        // password: '123123'
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //elementui表单验证
      this.$refs[formName].validate(valid => {
        //用户名和密码校验
        if (valid) {
          localStorage.setItem("username", this.ruleForm.username);
          axios
            .post("http://rap2api.taobao.org/app/mock/225049/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(res => {
              console.log("测试访问数据成功", res);
              sessionStorage.setItem("token", res.token);
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              //跳转到主页
              this.$router.push("/");
            })
            .catch(err => {
              console.log("测试失败", err);
            });
        } else {
          this.$message.error("用户名和密码不能为空！");
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  /* width:350px; */
  width: 380px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  z-index: 100;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}

 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    // background-color: #99a9bf;
    background-image: url(../../assets/img/c2.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    // background-color: #d3dce6;
     background-image: url(../../assets/img/c1.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .el-carousel--horizontal{
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

</style>