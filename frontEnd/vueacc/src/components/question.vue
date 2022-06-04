<template>
  <div class="die-box">
    <div class="die">
      <h1>一些问题</h1>
      <ul>
        <li v-for="question in data.Question" :key="question.id">
          <p>{{ question }}</p>
          <el-input />
        </li>
      </ul>
      <el-button size="large" type="parmary">提交问题</el-button>
    </div>
  </div>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'
import { reactive } from "vue";
export default {
  setup() {
    const data = reactive({
      Question: [],
      Answer: [],
    });
    return { data };
  },
};
</script>
