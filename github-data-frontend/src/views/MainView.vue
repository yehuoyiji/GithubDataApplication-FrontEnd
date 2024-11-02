<template>
  <div id="main-view">
    <div class="container">
      <div class="container-header">
        <div  class="custom-style" style="display: flex; align-items: center; justify-content: center; flex: 1">
          <div style="display: flex; flex: 1"></div>
          <div style="display: flex; flex: 1; justify-content: center; align-items: center"><el-segmented v-model="value" :options="options" /></div>
          <div style="display: flex; flex: 1; justify-content: end; align-items: center; padding-right: 100px">
            <el-switch
                v-model="lightOrDark"
                class="mt-2"
                style="margin-left: 24px;--el-switch-on-color: #c0bcbc; --el-switch-off-color: #13ce66"
                inline-prompt
                :active-icon="Moon"
                :inactive-icon="Sunny"
                size="large"
                @change="changeTheme"

            />
          </div>

        </div>
      </div>
      <div class="container-body">
        <PersonalPage v-if="value === '个人'"></PersonalPage>
        <GlobalPage v-if="value === '全球'"></GlobalPage>
      </div>
      <div class="container-footer">
        <div style="display: flex; flex: 1; justify-content: center; align-items: center">
<!--          个人博客: <el-link href="https://yehuo.icu">https://yehuo.icu</el-link>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import PersonalPage from "@/components/PersonalPage.vue";
import {ref} from "vue";
import {Check, Close, Link, Moon, Sunny} from "@element-plus/icons-vue";
import GlobalPage from "@/components/GlobalPage.vue";
const value = ref('个人')
const options = ['个人', '全球']
const lightOrDark = ref<boolean>(true)
const changeTheme = () => {
  if (lightOrDark.value) {
    document.querySelectorAll('html')[0].setAttribute('theme', 'light')
  } else {
    document.querySelectorAll('html')[0].setAttribute('theme', 'dark')
  }
}

</script>

<style scoped>
#main-view {
  height: 100vh;
  width: 100%;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.container-header {
  display: flex;
  flex: 1;
}
.container-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 9;
  flex-direction: column;
}
.container-footer {
  display: flex;
  flex: 1;
}
.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  min-height: 50px;
  height: 5vh;
  width: 50vh;
  min-width: 500px;
  border: 1px solid #ffffff;
  padding: 0 20px;
  font-size: 1.2rem;
  background-color: #ffffff;
}

.input-box {
  display: flex;
  flex: 8;
  align-items: center;
  width: 100%;
}

.search-button {
  display: flex;
  flex: 2;
  min-width: 25%;
  justify-content: center;
  align-items: center;
}
.custom-style .el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
  --el-segmented-item-selected-disabled-bg-color: var(--bg-color)
}
input {
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
}

</style>
<style>
.el-segmented__group {
  width: 200px;
  height: 35px;
}
.arco-input-search  {
  border-radius: 40px !important;
}
.arco-input-outer > :first-child {
  //border-top-left-radius: var(--border-radius-small);
  //border-bottom-left-radius: var(--border-radius-small);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

}
.custom-style .el-segmented[data-v-17e69338] {
  --el-segmented-item-selected-color: var(--text-color)
}
.arco-input-search .arco-input-search-btn {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.arco-input-outer > :last-child {
  //border-top-right-radius: var(--border-radius-small);
  //border-bottom-right-radius: var(--border-radius-small);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.arco-radio-group-button {
  border-radius: 10px;
}
.arco-radio-button {
  border-radius: 10px;
}
</style>