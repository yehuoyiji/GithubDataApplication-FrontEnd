<template>
  <div id="personalPage">
    <div class="container">
      <div style="display: flex; flex: 1; justify-content: center;">
        <a-input-search :loading="isSearchTrue"  @search="search" v-model="inputText"  size="large" :style="{width:'450px', borderRadius: '30px', maxHeight:'35px'}" placeholder="请输入github用户名" search-button>
          <template #button-icon>
            <icon-search/>
          </template>
          <template #button-default>
            查找
          </template>
        </a-input-search>
      </div>
      <div style="display: flex; flex: 8;">
        <div style="width: 100%; height: 100%; background-color: #f2f2f2; margin: 0 3vw; border-radius: 20px;">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {IconSearch} from "@arco-design/web-vue/es/icon";
import {ref} from "vue";
const inputText = ref('')
const isSearchTrue = ref(false)

const search = () => {
  isSearchTrue.value = true

  setTimeout(() => {
    inputText.value = ''
    isSearchTrue.value = false
  }, 1000);

}
</script>

<style scoped>
#personalPage {
  width: 100%;
  height: 100%;
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex: 9;
  flex-direction: column;
}
</style>