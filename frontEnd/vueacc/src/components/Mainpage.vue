<template>
    <div class="mainpage">
        <div class="navigation">
            <span>"“×××”人情世故"</span>
            <el-menu mode="horizontal" :default-active="data.active" class="navigation-select">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">设置回复</el-menu-item>
                <el-menu-item index="3">
                </el-menu-item>
            </el-menu>
        </div>
        <div class="search-left"></div>
        <div class="friendlist-list"></div>  
    </div>
</template>
<script>
import { reactive } from "vue";
export default {
    setup() {
        const data=reactive({
            active:"1",
        });
        return {data};
    },
}
</script>
<style scoped lang="less" >
*{
    padding:0;
    margin:0;
}

</style>