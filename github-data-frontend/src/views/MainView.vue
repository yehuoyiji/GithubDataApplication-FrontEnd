<template>
  <div id="main-view">
    <div class="container">
      <div class="container-header">
        <div style="display: flex; align-items: center; justify-content: center; flex: 1">
          <a-radio-group size="large" v-model="type" type="button" :style="{width: '200px', height: '40px'}">
            <a-radio :style="{width: '50%', textAlign: 'center', lineHeight: '35px'}" value="个人">个人</a-radio>
            <a-radio :style="{width: '50%', textAlign: 'center', lineHeight: '35px'}" value="局域">局域</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="container-body">
        <PersonalPage></PersonalPage>
      </div>
      <div class="container-footer">
        <div style="display: flex; flex: 1; justify-content: center; align-items: center">
          个人博客:https://yehuo.icu
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import PersonalPage from "@/components/PersonalPage.vue";
import {ref} from "vue";
const type = ref('个人')

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
  background-color: #f2f2f2;
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

input {
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
}

</style>
<style>
.arco-input-search  {
  border-radius: 40px !important;
}
.arco-input-outer > :first-child {
  //border-top-left-radius: var(--border-radius-small);
  //border-bottom-left-radius: var(--border-radius-small);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

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