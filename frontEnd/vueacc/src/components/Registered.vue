<template>
  <div class="registered-box">
    <div class="registered">
      <h1 class="registered-header">注册</h1>
      <el-form
        :model="data"
        :rules="rules"
        ref="ruleForm"
        class="registered-form"
        label-width="90px"
      >
        <el-form-item label="用户名:" size="large" prop="username">
          <el-input
            size="large"
            v-model="data.username"
          />
        </el-form-item>
        <el-form-item label="账号:" size="large" prop="userid" >
          <el-input
            size="large"
            v-model="data.userid"
            placeholder="最少3个字符"
          />
        </el-form-item>
        <el-form-item label="个人信息:" size="large">
          <el-input
            size="large"
            v-model="data.information"
          />
        </el-form-item>        
        <el-form-item label="密码:" size="large" prop="password">
          <el-input
            size="large"
            v-model="data.password"
            placeholder="最小长度为9"
          />
        </el-form-item>
        <el-form-item label="确认密码:" size="large" prop="ensure_password">
          <el-input size="large" v-model="data.ensure_password" />
        </el-form-item>
        <el-form-item label="邮箱:" size="large" prop="email">
          <el-input size="large" v-model="data.email" />
        </el-form-item>
        <el-button
          class="btn-registered"
          type="primary"
          size="large"
          @click="submitForm"
          >注册</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'
import { reactive } from "vue";
import axios from "axios";
import md5 from 'js-md5';
export default {
  setup() {
    const data = reactive({
      username: "",
      userid:"",
      information:"",
      password: "",
      ensure_password: "",
      email: "",
    });
    //校验规则
    const checkpassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        if (value !== data.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      }
    };
    const checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 9) {
          callback(new Error("密码的长度小于9"));
        } else callback();
      }
    };
    const checkid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (value.length < 3) {
          callback(new Error("账号的长度小于3"));
        } else {
          axios.get("http://localhost:3000/users/checkBeforeRegister",{
            params:{
              id:value,
            }
          }).then(res=>{
            if(res.data.code===200)
            callback();
            else
            callback(new Error("账号已存在"));
          })
        }
      }
    };
    const rules = reactive({
      userid: [
        {
          validator: checkid,
          trigger: "blur",
        },
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
      ],
      username:{
          required: true,
          message: "请输入用户名",
          trigger: "blur",
      },
      password: [
        {
          validator: checkpassword,
          trigger: "blur",
        },
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
      ensure_password: [
        {
          validator: checkpassword2,
          trigger: "blur",
        },
        {
          required: true,
          message: "请再次输入密码",
          trigger: "blur",
        },
      ],
      email: [
        {
          type: "email",
          message: "请输入正确的邮箱格式",
          trigger: "blur",
        },
        {
          required: true,
          message: "请输入邮箱地址",
          trigger: "blur",
        },
      ],
    });
    return { data, rules };
  },
  methods: {
    //提交表单
    getlist() {
      console.log("getlist");
      axios.post("http://localhost:3000/users/register",{
        name:this.data.username,
        id:this.data.userid,
        information:this.data.information,
        password:md5(this.data.password),
        address:this.data.email,
      }).then(function(response){
        if(response.data.code===200){
          alert("注册成功");
          this.$router.push({path:"/"});
        }
        else
          alert("注册失败，请重新注册");
      }).catch(function(error){
        console.log(error);
      });
    },
    //提交验证
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        //开启校验
        console.log("start");
        if (valid) {
          // 如果校验通过，请求接口，允许提交表单
        console.log("success"); 
         axios.post("http://localhost:3000/users/register",{
        name:this.data.username,
        id:this.data.userid,
        information:this.data.information,
        password:md5(this.data.password),
        address:this.data.email,
      }).then(response=>{
        if(response.data.code===200){
          alert("注册成功");
          this.$router.push({path:"/"});
        }
        else
          alert("注册失败，请重新注册");
      }).catch(function(error){
        console.log(error);
      });
      //   axios.post("http://localhost:3000/users/register",{
      //   name:this.data.username,
      //   id:this.data.userid,
      //   information:this.data.information,
      //   password:md5(this.data.password),
      //   address:this.data.email,
      // }).then(function(response){
      //   if(response.data.code===200){
      //     alert("注册成功");
      //     this.$router.push({path:"/"});
      //   }
      //   else
      //     alert("注册失败，请重新注册");
      // }).catch(function(error){
      //   console.log(error);
      // });
          return;
        } 
        else {
          //校验不通过
          console.log("error");
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.registered-box {
  height: 100%;
  background: url(../assets/city.jpg);
  background-size: cover;
  position: relative;
}
.registered {
  background-color: #fff;
  width: 400px;

  border-radius: 20px;
  box-sizing: border-box;
  opacity: 90%;
  padding: 20px 20px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 10%;
}
.registered-header {
  margin-bottom: 20px;
}
</style>
