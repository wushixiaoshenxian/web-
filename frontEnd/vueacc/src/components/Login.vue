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
        <el-form
          :model="state"
          :rules="rules"
          label-width="80px"
          class="login-form"
          ref="ruleForm"
        >
          <el-form-item label="账号" size="large" prop="username">
            <el-input size="large" v-model="state.username" :validate-event="false"/>
          </el-form-item>
        </el-form>
        <el-form
          :model="state"
          label-width="80px"
          class="login-form"
          :rules="rules"
        >
          <el-form-item label="密码" size="large" prop="password">
            <el-input size="large" type="password" v-model="state.password" :validate-event="false"/>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="large"
          auto-insert-space="true"
          class="btn-login"
          @click="submitForm"
          >登录</el-button
        >
        <div>
          <el-link type="primary" class="register-link" @click="toRegistered"
            >注册</el-link
          >
          <el-link
            type="primary"
            class="findPassword-link"
            @click="toForgetpassword"
            >忘记密码</el-link
          >
        </div>
      </span>
    </div>
    <el-switch size="large" class="switch" v-model="state.value1" />
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "hello",
  setup() {
    const state = reactive({
      username: "",
      password: "",
      value1: true,
    });
    const checkusername=(rule,value,callback)=>{
      if(value===""){
        callback(new Error("用户名不能为空"));
      }
      else{
        axios.post("",{
          username:state.username,
          password:state.password
        }).then(function(response){
        if(response)
           callback();
        else{
           callback(new Error("用户名或密码错误"));
        }
      }).catch(function(error){
        console.log(error);
      });
      }
    }
    const rules = reactive({
      username: [{
        validator: checkusername,
      },
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",        
      }
      ],
      password: {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
    });
    return {
      state,
      rules,
    };
  },
  methods: {
    toRegistered() {
      this.$router.push({ path: "/registered" });
    },
    toForgetpassword() {
      this.$router.push({ path: "/forgetpassword" });
    },
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        //开启校验
        if (valid) {
          // 如果校验通过，请求接口，允许跳转
          if(this.state.value1===true)
          {
            //正常跳转
          }
          else
          {
            //逝世状态跳转
          }
        } else {
          //校验不通过
          return false;
        }
      });
    },
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
}

.login-box-left {
  flex: 1;
  background-color: rgba(18, 93, 185, 0.72);
  border-radius: 20px;
}

.login-box-right {
  flex: 1;
}

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

.switch {
  position: absolute;
  right: 90px;
  bottom: 30px;
}
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
</style>
