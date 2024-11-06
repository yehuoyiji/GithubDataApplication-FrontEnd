<template>
  <div id="GlobalPage">
    <div class="container">
      <div class="searchBox">
        <div style="display: flex; flex: 1; align-items: center; justify-content: flex-end">
          <el-select
              placeholder="Please select"
              size="large"
              style="width: 240px"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />

          </el-select>
        </div>
        <div style="display: flex; flex: 0.01"> </div>
        <div style="display: flex; flex: 1; align-items: center; justify-content: flex-start">
          <el-select
              v-model="country"
              :options="options"
              placeholder="Please select"
              size="large"
              style="width: 240px"
          />
        </div>

      </div>

      <el-scrollbar v-loading="loading" ref="scroll2"  @scroll="handleScroll" height="calc(100vw * 800 / 1920)" always="true">
        <div v-for="(user, index) in userList" :key="user.id" class="scrollbar-demo-item userItem">
          <div class="userAvatar">
            <img :src="user.avatar_url" alt="" style="width: 50px; height: 50px; border-radius: 50%;">
          </div>
          <div class="userInfo">
            <div class="userNameAndLogin">
              <span class="userName">{{user.name}}</span>
              <span class="login">{{user.login}}</span>
            </div>
            <div v-if="user.bio" class="userDesc">
              <div>{{user.bio}}</div>
            </div>
            <div class="userLocation">

                <el-icon style="font-size: 18px; font-weight: bold; color: #000000; margin-right: 5px">
                  <Location/>
                </el-icon>
                <div> {{user.location}}</div>

            </div>
          </div>
          <div class="userAction">
            <el-button color="#ffd100" @click="toPersonalPage(user.login)" type="success">
              查看主页<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </el-scrollbar>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import {getUserListByCondition} from "@/api/serach";
import {ArrowRight, Location} from "@element-plus/icons-vue";


import Bus from "@/utils/Bus";
import store from "@/store";

let scroll2 = ref();

const isLoading = ref(false); // 标记是否正在加载数据
const loading = ref(false); // 标记是否正在加载数据
const country = ref()

const options = [
  {
    label: "中国",
    value: "China",
  }
]
const handleScroll = () => {
  if (isLoading.value) {
    return;
  }
  nextTick(() => {
    let scroll = scroll2.value.wrapRef ;
    console.log(scroll)
    if (scroll && !isLoading.value) {

      const isBottom = scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 50;
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

const userLogin = ref()
const personalPageRefresh = ref<string>("");

const flag = ref("个人")

const toPersonalPage = (login: string) => {
  userLogin.value = login
  Bus.emit("userLogin", userLogin.value)
  store.commit("changeUserLogin", userLogin.value)
  Bus.emit("personalPageRefresh", flag.value)

}
const count = ref(0)
const load = () => {
  count.value += 2
}
const userList = ref<any[]>([

]);

const condition = ref({
  country: "中国",
  language: "Java",
  pageSize: 50,
  pageNum: 1
})

const getUserList = async () => {
  loading.value = true;
  const res = await getUserListByCondition(condition.value)
  if (res.data.code === 200) {
    for (const user of res.data.data) {
      userList.value.push(user as any)
    }

    if (userList.value.length < 10) {
      condition.value.pageNum += 1
      await getUserList()
    }
  }
  loading.value = false;
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
  display: flex;
  min-height: calc(100vw * 60 / 1920);
}
.userNameAndLogin {
  display: flex;
  flex: 1;
  align-items: center;

}
.userAction {
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: flex-end;
}
.userName {
  display: flex;
  align-items: center;
  font-size: 16px;
  //font-weight: bold;
  margin-right: 10px;
  color: var(--text-color)
}

.userDesc {
  display: flex;
  flex: 1;
  align-items: center;
  color: #666;
}
.userLocation {
  display: flex;
  flex: 1;
  align-items: center;
  color: #666;
}
.userItem {
  display: flex;
  border-bottom: 1px solid #d5d4d4;
  height: 100px;
  margin: 0 20px;
}
.login {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
  margin-left: 5px;
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