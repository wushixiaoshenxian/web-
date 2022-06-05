<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <span
          ><el-icon :size="40" style="vertical-align: middle"
            ><AlarmClock /></el-icon
          >person</span
        >
      </el-header>
      <el-container>
        <el-aside width="200px">List</el-aside>
        <el-main id="main">
          <el-button
            type="primary"
            size="large"
            auto-insert-space="true"
            @click="createNode"
            >添加新节点</el-button
          >
          <div class="draftDiv" v-for="item in list" :key="item.id" v-drag>{{ item }}</div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs, Vue } from "vue";

export default {
  setup() {
    const state = reactive({
      list: ["message1", "message2", "message3", "message4"],
      index: "",
    });

    //const onRegester = () => {};
    const createNode = () => {
      var oDiv = document.createElement("div");
      oDiv.setAttribute("class", "draftDiv");
      oDiv.setAttribute("id", "mount-point");
      var app2 = document.querySelector("#main");
      app2.appendChild(oDiv);

      var Profile = Vue.extend({
        template: "<div v-drag>new</div>",
      });
      // 创建 Profile 实例，并挂载到一个元素上。
      new Profile().$mount("#mount-point");
    };

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
      createNode,
    };
  },
};
</script>

<style lang="less">
.common-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.7838681004628414) 0%,
      rgba(0, 0, 0, 0.6466131985020571) 51%,
      rgba(0, 0, 0, 0.274064178894214) 100%
    );
    height: 80px;
  }

  .el-aside {
    background-color: rgba(187, 219, 249, 1);
  }

  .el-main {
    display: flex;
    background: -webkit-linear-gradient(top, transparent 30px, #f6931e 30.5px),
      -webkit-linear-gradient(left, transparent 30px, #f6931e 30.5px);
    background-size: 30.5px 30.5px;

    .draftDiv {
      flex: 1;
      position: absolute;
      background-color: #ffc;
      width: 100px;
      height: 100px;
      box-shadow: 3px 3px 5px rgba(33, 33, 33, 0.7);
    }
  }
}
</style>
