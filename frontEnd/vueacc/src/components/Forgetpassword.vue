<template>
  <div class="forgetpassword-box">
    <div class="forgetpassword">
      <el-steps
        :active="data.active"
        direction="vertical"
        finish-status="success"
        class="step-box"
        align-center=true
      >
        <el-step title="输入用户名、邮箱"></el-step>
        <!-- <el-step title="邮箱验证"></el-step> -->
        <el-step title="设置新密码"></el-step>
      </el-steps>
      <div class="right-forgetpassword">
        <h1 class="forgetpassword-header">修改密码</h1>
        <div v-if="data.active === 0" class="forgetpassword-step">
          <el-form label-width="90px" ref="usernamecheck" :model="data" :rules="rules">
            <el-form-item label="用户名:" size="large" prop="username">
              <el-input v-model="data.username" size="large" :validate-event="false" />
            </el-form-item>
            <el-form-item label="邮箱:" size="large">
              <el-input v-model="data.email" size="large" />
            </el-form-item>
          </el-form>
          <el-button size="large" type="parmary" @click="next1"
            >下一步</el-button
          >
        </div>
        <!-- <div v-if="data.active===1" class="forgetpassword-step">
          <el-form :model="data" :rules="rules" ref="checkwordcheck">
            <el-form-item size="large" label="验证码:" prop="checkword"> 
              <el-input class="checkword" v-model="data.checkword" size="large"/>
              <el-button
              size="large"
              type="parmary"
              @click="send"
              class="btn-check"
              >发送验证码</el-button>
            </el-form-item>
          </el-form>
          <el-button
          size="large"
          type="parmary"
          @click="next2"
          >下一步</el-button>
        </div> -->
        <div v-if="data.active === 1" class="forgetpassword-step">
          <el-form :model="data" :rules="rules" ref="passwordcheck" label-width="100px">
            <el-form-item label="新密码:" prop="newpassword">
              <el-input v-model="data.newpassword" />
            </el-form-item>
            <el-form-item label="确认新密码:" prop="ensure_newpassword">
              <el-input v-model="data.ensure_newpassword" />
            </el-form-item>
          </el-form>
          <el-button size="large" type="parmary" @click="next2">确定</el-button>
        </div>
      </div>
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
      email: "",
      newpassword: "",
      ensure_newpassword: "",
      active: 0,
      // checkword:"",
    });
    const checkusername=(rule,value,callback)=>{
       axios.get("http://localhost:3000/users/checkBeforeRegister",{
        params:{
              id:value,
            }
       }).then(function(response){
         if(response.data.code===201){
           console.log(response);
           callback();
         }
         else
         {
           callback(new Error("账号错误"));
         }
       });
    };
    const checkpassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        if (value !== data.newpassword) {
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
    const rules=reactive({
     username:{
       validator: checkusername,
     },
     newpassword:{
       validator: checkpassword,
       trigger: "blur",
     },
     ensure_newpassword:{
       validator: checkpassword2,
       trigger: "blur",
     },
    });
    return {data,rules};
  },
  methods: {
    next1() {
      //验证用户名是否存在
      this.$refs["usernamecheck"].validate((valid) => {
        //开启校验
        if (valid) {
          // 如果校验通过，请求接口
          this.data.active++;
        } else {
          //校验不通过
          return false;
        }
      });
    },
    // next2(){
    //       this.data.active++;
    // },
    next2(){
        this.$refs["passwordcheck"].validate((valid) => {
        //开启校验
        console.log("chenggong");
        if (valid){
          // 如果校验通过，请求接口，允许提交表单
          console.log("成功");
          axios.post("http://localhost:3000/users/changePassword",{
            id: this.data.username,
            password: md5(this.data.newpassword),
          }).then(response=>{
            console.log(response);
            if(response.data.code===200){
              alert("修改密码成功");
              this.$router.push({path:"/"});
            }
            else
            {
              alert("修改密码失败,请重试");
            }
          }).catch(function(error){
            console.log(error);
          });
        return ;
        } 
        else {
          //校验不通过
          console.log("fail");
          return false;
        }
      });
    }
  },
};
</script>
<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.forgetpassword-box {
  height: 100%;
  position: relative;
  background-image:  url(../assets/city.jpg);  
  background-size: cover;
}
.step-box {
  box-sizing: border-box;
  width: 200px;
  background-color: rgba(18, 93, 185, 0.72);
  padding:10px;
  border-radius:20px 0 0 20px;
  padding-top:100px;
}
.forgetpassword {
  width: 800px;
  height: 500px;
  position: absolute;
  left: 50%;
  margin-left: -400px;
  top: 50%;
  margin-top: -250px;
  display: flex;
  justify-content: space-around;
}
.right-forgetpassword {
  width: 600px;  
  border-radius:0 20px 20px 0;
  box-sizing: border-box;
  padding:0 20px;
  border-top:1px solid black;
  border-bottom:1px solid black;
  border-right:1px solid black;
  background-color: white;
}
.forgetpassword-step {
  padding-top: 100px;
}
.forgetpassword-header{
    margin-top:20px;
}
.checkword{
    width:150px;
    position: relative;
}
.btn-check{
    position: absolute;
    left:120px;
}
</style>
