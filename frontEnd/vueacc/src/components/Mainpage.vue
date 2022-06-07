<template>
  <div class="mainpage">
    <div class="navigation">
      <span class="title">“×××”人情世故</span>
      <div class="navigation-select">
        <el-menu
          mode="horizontal"
          :default-active="data.active1"
          background-color="#e7f2ef"
        >
          <el-menu-item index="1" @click="data.active1 = 1">首页</el-menu-item>
          <el-menu-item index="2" @click="data.active1 = 2"
            >设置回复</el-menu-item
          >
        </el-menu>
      </div>
      <div class="navigation-right">
        <el-avatar
          :size="size"
          :src="data.pictureuurl"
          class="userpicture"
        ></el-avatar>
        <span class="name">{{ data.username }}</span>
        <span class="quit" @click="quit">退出登录</span>
      </div>
    </div>
    <div class="search-left">
      <input class="search" placeholder="搜索" />
    </div>
    <div class="friendlist-list">
      <!-- <ul>
                <li v-for="myfriend in data.friend" :key="myfriend.id">{{myfriend}}</li>
            </ul> -->
      <el-menu :default-active="data.active2" background-color="#e7f2ef">
        <el-menu-item
          v-for="myfriend in data.friend"
          :key="myfriend.id"
          class="friend"
          @click="getmessage(myfriend)"
          >{{ myfriend.friend}}</el-menu-item
        >
        <el-menu-item class="addfriend" @click="toaddfriend"
          >添加新朋友</el-menu-item
        >
      </el-menu>
    </div>
    <div v-if="data.addfriend === true" class="add-friend">
      <h1 style="background-color: rgba(132, 201, 219)">添加新朋友</h1>
      <el-form class="addfriend-form">
        <el-form-item label="设置好友名称：">
          <el-input v-model="data.newfriendname" />
        </el-form-item>
      </el-form>
      <el-button size="large" type="parmary" @click="addfriend">添加</el-button>
    </div>
    <div v-if="data.write === true && data.active1 === 1" class="write-message">
      <h1 style="background-color: rgba(132, 201, 219)">记事</h1>
      <el-form class="writemessage-form" label-width="150px">
        <el-form-item label="事件类型：">
          <el-radio v-model="data.writemessage.type" label="愉快的事" />
          <el-radio v-model="data.writemessage.type" label="难过的事" />
        </el-form-item>
        <el-form-item label="想说的话：">
          <el-input
            type="textarea"
            v-model="data.writemessage.message"
          ></el-input>
        </el-form-item>
        <el-form-item label="权值：">
          <el-input
            v-model="data.writemessage.value"
            style="width: 100px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button size="large" type="parmary" @click="writeevent"
        >提交</el-button
      >
    </div>
    <div
      v-if="
        data.active1 === 1 && data.addfriend === false && data.write === false
      "
      class="show-message"
    >
      <header>
        <h1 style="background-color: rgba(132, 201, 219)">人情记事本</h1>
      </header>
      <div class="middle">
        <div class="happything">
          <h2>愉快的事</h2>
        </div>
        <div class="sadthing">
          <h2>难过的事</h2>
        </div>
      </div>
      <footer>
        <h1 style="background-color: rgba(132, 201, 219)">
          合计：<el-button class="btn-write" @click="towrite">记事</el-button>
        </h1>
      </footer>
    </div>
    <div v-if="data.active1 === 2" class="setcallback">
      <h1 style="background-color: rgba(132, 201, 219)">设置邮件回复</h1>
      <el-form class="setback-form" label-width="100px">
        <el-form-item label="邮件：">
          <el-input
            v-model="data.setback.email"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="想说的话：">
          <el-input v-model="data.setback.message" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="large" type="parmary" @click="setcallbackevent"
        >提交</el-button
      >
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const data = reactive({
      active1: 1,
      active2: 1,
      pictureuurl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      username: "",
      userid: localStorage.getItem("userid"),
      friend: [],
      current: "",
      addfriend: false,
      write: false,
      newfriendname: "",
      happything: [],
      sadthing: [],
      nowfriend: "",
      writemessage: {
        type: "愉快的事",
        message: "",
        value: "",
      },
      setback: {
        email: "",
        message: "",
      },
    });
    axios.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken && accessToken !== "") {
          config.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }
        // 设置token end
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    onMounted(()=>{
        axios.get("http://localhost:3000/event/getFriend", {
        params: {
          id: data.userid,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          console.log(res.data);
          data.friend=res.data.data;
        //   for(var i in res.data.data)
        //   data.friend.push(i.friend);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    })
    
    return { data };
  },
  methods: {
    quit() {
      localStorage.removeItem("userid");
      this.$router.push({ path: "/" });
    },
    writeevent() {
      axios
        .post("", {
          id: this.data.userid,
          friend: this.data.nowfriend,
          event: this.data.writemessage.message,
          value: +this.data.writemessage.value,
        })
        .then((res) => {
          if (res.data.code === 200) {
            if (this.data.writemessage.type === "愉快的事")
              this.data.happything.push({
                message: this.data.writemessage.message,
                value: +this.data.writemessage.value,
              });
            this.data.write = false;
          }
        });
    },
    setcallbackevent() {
      axios
        .post("", {})
        .then((res) => {
          if (res.data.code === 200) {
            this.data.setback.email = "";
            this.data.setback.message = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getmessage(event) {
      this.data.addfriend = false;
      this.data.write = false;
      this.data.nowfriend = event;
      this.data.happything.length = 0;
      this.data.sadthing.length = 0;
      axios
        .get("", {
          params: {
            id: this.data.userid,
            friend: event,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            for (var i in res.data.data) {
              if (i.value > 0) {
                this.data.happything.push({
                  message: i.event,
                  value: i.value,
                });
              } else {
                this.data.sadthing.push({
                  message: i.event,
                  value: i.value,
                });
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    towrite() {
      this.data.write = true;
      this.data.writemessage.type = "愉快的事";
      this.data.writemessage.message = "";
      this.data.writemessage.value = "";
    },
    toaddfriend() {
      this.data.addfriend = true;
      this.data.active1 = 1;
    },
    addfriend() {
      axios
        .post("http://localhost:3000/event/addFriend", {
          id: this.data.userid,
          friend: this.data.newfriendname,
        })
        .then((res) => {
          if (res.data.code === 200) {
            // this.friend.push({"friend":this.data.newfriendname});
            location.reload();
            this.data.addfriend = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(231, 242, 239);
}
.title {
  font-size: 25px;
  margin-left: 30px;
}
.navigation-select {
  width: 300px;
}
.navigation-right {
}
.quit {
  margin-left: 50px;
  margin-right: 10px;
  cursor: pointer;
}
.search-left {
  width: 250px;
  height: 60px;
  line-height: 60px;
  position: relative;
}
.search {
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 15px;
  width: 200px;
  height: 30px;
  padding-left: 30px;
}
.search-left::before {
  content: "";
  display: block;
  position: absolute;
  left: 30px;
  top: 20px;
  width: 20px;
  height: 20px;
  background-image: url(../assets/搜索.png);
  background-size: cover;
}
.friendlist-list {
  width: 250px;
  box-sizing: border-box;
}

.friend,
.addfriend {
  box-sizing: border-box;
  border: 1px solid black;
  margin-top: 1px;
  height: 60px;
  background-color: rgba(231, 242, 239);
  cursor: pointer;
}
.friend:hover,
:focus {
  background-color: rgba(178, 225, 212);
}
.addfriend::before {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  background-image: url(../assets/添加.png);
  background-size: cover;
}
.show-message,
.add-friend,
.write-message,
.setcallback {
  position: absolute;
  left: 250px;
  top: 60px;
  width: 1300px;
}
.addfriend-form {
  width: 500px;
  margin: 40px auto;
}
.middle {
  height: 200px;
  display: flex;
}
.happything,
.sadthing {
  width: 50%;
}
.btn-write {
  position: absolute;
  right: 30px;
  bottom: 5px;
}
.writemessage-form,
.setback-form {
  margin: 30px 50px;
}
</style>
