<template>
<div class="question-box" >
  <div class="question">
    
  <div class="step1" v-if="data.active===0">
    <h1 class="header">遗产发送</h1>
    <el-form>
    <el-form-item label="账号：">
    <el-input v-model="data.userid" />
    </el-form-item>
    </el-form>
    <el-button
     size="large"
     type="parmary"
     class="btn-question"
     @click="next"
     >下一步</el-button>
  </div>
  <div class="step2" v-if="data.active===1">
      <h1>一些问题</h1>
      <ul>
        <li v-for="(item,index) in data.message" :key="index">
          <p>{{item.question}}</p>
          <el-input v-model="data.myanswer[index]" />
        </li>
      </ul>
      <el-button 
      size="large" 
      type="parmary"
      class="btn-question"
      @click="submit"
      >提交问题</el-button>
    </div>
  </div>
</div>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'
import { reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const data = reactive({
      userid:"",
      message:[],
      myanswer:[],
      active:0,
    });
    return { data };
  },
  
  methods:{
    submit(){
      console.log(this.data.message.length);
      for(var i=0;i<this.data.message.length;i++){
        console.log(this.data.message[i].answer);
        if(this.data.message[i].answer!==this.data.myanswer[i])
        {alert("问题错误");
        return false;}
      }
      axios.get(`http://101.43.85.170:8080/sendmail/${this.data.userid}`).then(res=>{
        if(res.data.code==="0")
        alert("邮件发送成功");
      }).catch(error=>{
        console.log(err);
      });

    },
    next(){
      axios.get("http://localhost:3000/users/anothorLogin",{
        params:{
          id:this.data.userid,
        }
      }).then(res=>{
        if(res.data.code===200){
        this.data.active++;
        // for(var i in res.data.data){
        //   this.data.Question.push(i.question);
        //   this.data.Answer.push(i.answer);
        // }
        this.data.message=res.data.data;
        }
        else
        alert("输入的账号有误");
      }).catch(function(err){
        console.log(err);
      })
    },
  }
};
</script>
<style scoped lang="less">
*{
  margin:0;
  padding:0;
}
.question-box{
  height:100%;
  position: relative;
  background-image: url(../assets/city.jpg);;
  background-size: cover;
}
.question{
  width:400px;
  background-color:white;
  border-radius: 15px;
  position: absolute;
  left:50%;
  margin-left:-200px;
  top:100px;
  padding:20px 20px;
}
.header{
  margin-top:10px;
  margin-bottom: 30px;
}
.btn-question{
  margin-top:30px;
}
li{
  list-style-type: none;
}
</style>