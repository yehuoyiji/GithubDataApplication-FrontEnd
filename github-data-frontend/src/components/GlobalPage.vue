<template>
  <div id="GlobalPage">
    <div class="container">
      <div class="searchBox">

      </div>

      <el-scrollbar ref="scroll2"  @scroll="handleScroll" height="calc(100vw * 800 / 1920)" always="true">
        <div v-for="user in userList" :key="user" class="scrollbar-demo-item userItem">
          <div class="userAvatar">
            <img :src="user.avatar_url" alt="" style="width: 50px; height: 50px; border-radius: 50%;">
          </div>
          <div class="userInfo">
            <div class="userNameAndLogin">
              <span class="userName">{{user.name}}</span>
              <span class="login">{{user.login}}</span>
            </div>
            <div class="userDesc">
              <div>{{user.bio}}</div>
            </div>
            <div class="userLocation">
              <div>{{user.location}}</div>
            </div>
          </div>
          <div class="userAction">

          </div>
        </div>
      </el-scrollbar>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import {getUserListByCondition} from "@/api/serach";
let scroll2 = ref();

const isLoading = ref(false); // 标记是否正在加载数据
const handleScroll = () => {
  if (isLoading.value) {
    return;
  }
  nextTick(() => {

    let scroll = scroll2.value.wrapRef ;
    console.log(scroll)
    if (scroll && !isLoading.value) {

      const isBottom = scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 100;
      if (isBottom) {
        handleScrollBottom();
      }
    }
  });
}
const handleScrollBottom = () => {
  if (isLoading.value) return; // 确保在加载数据时不重复触发

  isLoading.value = true; // 设置加载状态
  condition.value.pageNum += 1; // 增加页码
  getUserList().finally(() => {
    isLoading.value = false; // 无论加载成功与否，重置加载状态
  });
}

const count = ref(0)
const load = () => {
  count.value += 2
}
const userList = ref<any[]>([

]);

const condition = ref({
  country: "China",
  language: "Java",
  pageSize: 50,
  pageNum: 1
})

const getUserList = async () => {
  const res = await getUserListByCondition(condition.value)
  if (res.data.code === 200) {
    for (const user of res.data.data) {
      userList.value.push(user as any)
    }

    if (res.data.data.length < 10) {
      condition.value.pageNum += 1
      await getUserList()
    }
  }
}
onMounted(async () => {
  await getUserList()
})
</script>

<style scoped>
#GlobalPage {
  width: 100%;
  height: 100%;
}

.container {
  height: 100%;
  padding: 0 calc(100vw * 300 / 1920);;
}

.searchBox {
  min-height: calc(100vw * 60 / 1920);
}
.userNameAndLogin {
  display: flex;
  flex: 1;
  align-items: center;
}
.userDesc {
  display: flex;
  flex: 1;
  align-items: center;
}
.userLocation {
  display: flex;
  flex: 1;
  align-items: center;
}
.userItem {
  display: flex;
  border-bottom: 1px solid #d5d4d4;
  height: 80px;
  margin: 0 20px;
}

.userAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.userInfo {
  display: flex;
  flex: 7;
  flex-direction: column;
}

.userAvatar {
  display: flex;
  flex: 1;
}

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>