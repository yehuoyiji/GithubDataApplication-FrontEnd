<template>
  <div id="personalPage">
    <div class="container">
      <div style="display: flex; flex: 1; justify-content: center;">
        <a-input-search :loading="isSearchTrue"  @search="search" v-model="userName"  size="large" :style="{width:'450px', borderRadius: '30px', maxHeight:'35px'}" placeholder="请输入github用户名" search-button>
          <template #button-icon>
            <icon-search/>
          </template>
          <template #button-default>
            查找
          </template>
        </a-input-search>
      </div>
      <div style="display: flex; flex: 8;">
        <div style="width: 100%; height: 100%; background-color: #f8f6f6; margin: 0 3vw; border-radius: 20px; padding: 20px 20px 0 20px; display: flex">
          <div style="display: flex; flex: 2.5; flex-direction: column;">
            <!-- 头像加载动画 -->
            <div style="flex: 3; display: flex; text-align: center; align-items: center; justify-content: center;">
              <el-skeleton :throttle="1000" :loading="loading" style="--el-skeleton-circle-size: 200px">
                <template #template>
                  <el-skeleton-item  variant="circle" />
                </template>
                <template #default>
                  <img style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover;" :src="personalList?.avatar_url" alt="">
                </template>
              </el-skeleton>
            </div>
            <div style="display: flex; flex: 7">
              <el-skeleton :loading="loading">
                <template #template>
                  <el-skeleton :rows="12"></el-skeleton>
                </template>
                <template #default>
                  个人介绍
                </template>
              </el-skeleton>

            </div>
          </div>
          <div style="display: flex; flex: 7.5;">
            具体分析
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {IconSearch} from "@arco-design/web-vue/es/icon";
import {onMounted, ref} from "vue";
import {getGitHubMsgByName} from "@/api/serach";
import {Message} from "@arco-design/web-vue";
const userName = ref('')
const isSearchTrue = ref(false)
const loading = ref(true)
const personalList = ref()

const search = async () => {
  if (userName.value == '') {
    Message.error('请输入github用户名')
    return
  }
  isSearchTrue.value = true
  const res = await getGitHubMsgByName(userName.value)
  const ins = ref(JSON.parse(res.data));
  if (res.data.code == 200) {

    alert(ins.value.id)
    isSearchTrue.value = false
  }else {
    Message.error(ins.value.msg)
    isSearchTrue.value = false
  }
}

const initPersonalPage = async () => {
  loading.value = true
  const res = await getGitHubMsgByName("yehuoyiji")
  const ins = ref(res.data);
  // alert(ins.value.data)
  if (res.data.code == 200) {
    personalList.value = JSON.parse(ins.value.data)
    // alert(personalList.value)
  }else {
    Message.error(ins.value.msg)
  }
  loading.value = false
  // alert(personalList.value.avatar_url)
}

onMounted( async () => {
  await initPersonalPage()
})
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