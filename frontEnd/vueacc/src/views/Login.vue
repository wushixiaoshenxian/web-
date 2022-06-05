<template>
  <div class="login">
    <!-- <image src="../assets/background.jpg"></image> -->
    <div class="login-box">
      <span class="login-box-left">
        <h1 style="margin-left: -150px">
          <img
            src="../assets/开关.png"
            width="40"
            height="40"
            style="vertical-align: middle"
          />人情事故
        </h1>
        <p>
          你要相信黎明会穿透黑暗，<br />
          带来井然有序的明天和无尽美好的未来
        </p>
        <p>
          没有谁的生活会一直完美，<br />
          但无论什么时候，<br />
          都要一直看向前方，满怀希望就会所想披靡
        </p>
      </span>
      <span class="login-box-right"
        ><h1>登录</h1>
        <el-form label-width="80px" class="login-form">
          <el-form-item label="账号" size="large">
            <el-input size="large" />
          </el-form-item>
        </el-form>
        <el-form label-width="80px" class="login-form">
          <el-form-item label="密码" type="password" size="large">
            <el-input size="large" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="large"
          auto-insert-space="true"
          class="btn-login"
          >登录</el-button
        >
        <div>
          <el-link type="primary" class="register-link" @click="onRegester"
            >注册</el-link
          >
          <el-link type="primary" class="findPassword-link">忘记密码</el-link>
        </div>
      </span>
    </div>
    <el-switch size="large" class="switch" v-model="value1" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      value1: true,
    });

    const onRegester = () => {};

    // const onSubmit = async (values) => {
    //   login
    //   const { data } = await login({
    //     loginName: values.username,
    //     passwordMd5: md5(values.password),
    //   });
    //   setLocal('token', data)
    //   window.location.href = '/'
    // };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="less">
.btn-login {
  min-width: 200px;
}
.login {
  height: 100%;
  position: relative;
  background-image: url(../assets/city.jpg);
  background-size: cover;
}

.login-box {
  box-sizing: border-box;
  width: 800px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  display: flex;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -200px;
  border-radius: 20px;
  opacity: 90%;
  .login-box-left {
    flex: 1;
    background-color: rgba(18, 93, 185, 0.72);
    border-radius: 20px;

    p {
      color: rgba(255, 233, 111, 0.718);
      letter-spacing: 0.5px;
      font-family: "STXingkai";
      font-weight: border;
      font-size: 24px;
      margin-top: 30px;
      margin-left: 30px;
      margin-right: 30px;
      line-height: 1.5em;
      text-align: left;
    }
  }
  .login-box-right {
    flex: 1;
    border-radius: 20px;
    animation-name: mymove;
    animation-duration: 2s;

    .login-form {
      margin-top: 40px;
      width: 90%;
    }
    .register-link {
      margin-top: 40px;
      right: 50px;
    }

    .findPassword-link {
      margin-top: 40px;
      left: 50px;
    }
  }
  @keyframes mymove /* 对应animation-name，里面为执行的动画*/ {
    from {
      left: 200px;
    } /*执行动画的初始位置*/
    to {
      left: 0px;
    } /*动画结束位置*/
    0% {
      opacity: 0.1; /*初始状态 透明度为10%*/
    }
    50% {
      opacity: 0.5; /*中间状态 透明度为50%*/
    }
    100% {
      opacity: 1; /*结尾状态 不透明*/
    }
  }
}

.switch {
  position: absolute;
  right: 90px;
  bottom: 30px;
}
</style>
