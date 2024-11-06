<template>
  <div id="personalPage">
    <div class="container">
      <div style="display: flex; flex: 1; justify-content: center;">
        <a-input-search :loading="isSearchTrue" @search="search(userName)" v-model="userName" size="large"
                        :style="{width:'450px', borderRadius: '30px', maxHeight:'35px'}"
                        placeholder="请输入github用户名" search-button>
          <template #button-icon>
            <icon-search/>
          </template>
          <template #button-default>
            查找
          </template>
        </a-input-search>
      </div>
      <div style="display: flex; flex: 9;">
        <div class="MainContent"
             style="width: 100%; height: 100%; background-color: var(--bg-color); margin: 0 3vw; border-radius: 20px; padding: 20px 20px 0 20px; display: flex;">
          <div style="display: flex; flex: 2; flex-direction: column;">
            <!-- 头像加载动画 -->
            <div style="flex: 3; display: flex; text-align: center; align-items: center; justify-content: center;">
              <el-skeleton :animated="true" :loading="loading" style="--el-skeleton-circle-size: 200px;">
                <template #template>
                  <el-skeleton-item :animated="true" variant="circle"/>
                </template>
                <template #default>
                  <img style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover;"
                       :src="personalList?.avatar_url" alt="">
                </template>
              </el-skeleton>
            </div>
            <div style="display: flex; flex: 7">
              <el-skeleton :animated="true" :loading="loading" >
                <template #template>
                  <div style="padding-right: 20px">
                    <el-skeleton style="padding: 20px -50px 0 40px;" :rows="12"></el-skeleton>
                  </div>
                </template>
                <template #default>
                  <div class="personDetail">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px; color: var(--text-color)">{{ personalList.name }}</div>
                    <div style="font-size: 1rem; color: #999; margin-bottom: 10px;">{{ personalList?.login }}</div>
                    <div style="font-size: 1rem; color: var(--text-color); margin-bottom: 10px"> {{ personalList?.bio }}</div>
                    <div style="margin-bottom: 5px; display: flex; align-items: center; color: var(--text-color)">
                      <a-space>
                        <el-icon>
                          <Location/>
                        </el-icon>
                        <div v-if="personalList?.location !== null">
                          {{ personalList?.location }}
                        </div>
                        <div v-else>空地址</div>
                      </a-space>
                    </div>
                    <div style="margin-bottom: 10px; display: flex; align-items: center;color: var(--text-color)">
                      <a-space>
                        <el-icon>
                          <Link/>
                        </el-icon>
                        <el-link type="primary" :href="personalList?.blog">{{ personalList?.blog }}</el-link>
                      </a-space>
                    </div>
                    <div class="TalentRank">
                      <!--                      <div style="border-radius: 20px; width: 100%; height: 18vh; background-color: #e7dede; margin-bottom: 10px; padding: 10px ">-->
                      <!--                        <div style="color: #ffd100; font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;">TalentRank</div>-->
                      <!--                      </div>-->
                    </div>
                  </div>
                </template>
              </el-skeleton>
            </div>
          </div>
          <div style="height: 100%; width: 1px; background-color: #d1d9e0; margin: -30px 20px 20px 0"></div>
          <div style="display: flex; flex: 7.5; padding: 10px 10px 20px 20px; flex-direction: column">
            <div style="display: flex; flex: 2">

              <div
                  style="display:flex; padding: 15px; flex: 1; border-radius: 15px; margin-right: 10px;background: -webkit-linear-gradient(left top, #EC6C6C,#FFD479,#FFFC79,#73FA79); font-size: calc(100vw * 16 / 1920);">
                <div style="display: flex; flex: 6; flex-direction: column; margin-right: 10px; font-weight: 700; margin-left: 10px">
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Star /></el-icon>
                        <span>获取星数（star）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center">7</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Coin /></el-icon>
                        <span>累计提交数（commit）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center">66</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Connection /></el-icon>
                        <span>拉取请求数（PR）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center">2</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Warning /></el-icon>
                        <span>指出问题数（issue）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center">7</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Collection /></el-icon>
                        <span>贡献于（去年）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center">2</div>
                  </div>
                </div>
                <div style="display: flex; flex: 4; justify-content: center; align-items: center;">
                  <el-progress stroke-width="7" :striped="true" :striped-flow="true" type="dashboard" :percentage="80" color="#f56c6c">
                    <template #default="{ percentage }">
                      <span class="percentage-value" v-if="percentage >= 0 && percentage <= 30">
                        C
                      </span>
                      <span class="percentage-value" v-else-if="percentage > 30 && percentage <= 60">
                        B
                      </span>
                      <span class="percentage-value" v-if="percentage > 60 && percentage <= 100">
                        A
                      </span>
<!--                      <span class="percentage-label">Progressing</span>-->
                    </template>
                  </el-progress>
                </div>
              </div>
              <div
                  style="display:flex; flex: 1;border-radius: 15px; margin-left: 10px;background: -webkit-linear-gradient(left top, #73FA79,#73FDFF,#D783FF); padding: 15px; width: 100%">
                <StatisticalCard2></StatisticalCard2>
              </div>
            </div>
            <div style="display:flex; flex: 7; height: 100%; width: 100%; margin-top: 5px">
              <div style="width: 100%; height: 100%; ">
                <el-scrollbar  style="height: calc(100vw * 560 / 1920);overflow-x: hidden; width: 100%">
                  <div v-for="item in 100" :key="item" class="scrollbar-demo-item">
<!--                    <div style="width: 100%; height: 100%; display: flex;  flex-direction: column">-->
<!--                      <div style="display: flex; flex: 1; justify-content: space-between; align-items: center">-->
<!--                        <div>滴水表-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <div style="border: 1px solid #d1d9e0; padding: 2px; border-radius: 5px">-->
<!--                            public-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div style="display: flex; flex: 3">a</div>-->
<!--                      <div style="display: flex; flex: 1">a</div>-->
<!--                    </div>-->
                  </div>
                </el-scrollbar>
<!--                <TransparentBar3D></TransparentBar3D>-->
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {IconSearch} from "@arco-design/web-vue/es/icon";
import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {getGitHubMsgByName} from "@/api/serach";
import {Message} from "@arco-design/web-vue";
import {Location, Link, Star, Coin, Connection, Warning, Collection} from "@element-plus/icons-vue";
import StatisticalCard2 from "@/components/StatisticalCard2.vue";

import {useStore} from "vuex";
import Bus from "@/utils/Bus";

const userName = ref('')
const isSearchTrue = ref(false)
const loading = ref(true)
const personalList = ref()
const flag = ref(true)
const store = useStore()


const search = async (userName: string) => {
  if (userName == '') {
    Message.error('请输入github用户名')
    return
  }
  loading.value = true
  isSearchTrue.value = true
  const res = await getGitHubMsgByName(userName)
  const ins = ref(res.data);
  if (res.data.code == 200) {
    personalList.value = ins.value.data
    isSearchTrue.value = false
  } else {
    Message.error(ins.value.msg)
    isSearchTrue.value = false
  }
  loading.value = false
}


const initPersonalPage = async () => {

  loading.value = true
  const res = await getGitHubMsgByName("yehuoyiji")
  const ins = ref(res.data);
  // alert(ins.value.data)
  if (res.data.code == 200) {
    // personalList.value = JSON.parse(ins.value.data)
    personalList.value = {
      "login": "yehuoyiji",
      "id": 138753957,
      "node_id": "U_kgDOCEU3pQ",
      "avatar_url": "https://avatars.githubusercontent.com/u/138753957?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/yehuoyiji",
      "html_url": "https://github.com/yehuoyiji",
      "followers_url": "https://api.github.com/users/yehuoyiji/followers",
      "following_url": "https://api.github.com/users/yehuoyiji/following{/other_user}",
      "gists_url": "https://api.github.com/users/yehuoyiji/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/yehuoyiji/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/yehuoyiji/subscriptions",
      "organizations_url": "https://api.github.com/users/yehuoyiji/orgs",
      "repos_url": "https://api.github.com/users/yehuoyiji/repos",
      "events_url": "https://api.github.com/users/yehuoyiji/events{/privacy}",
      "received_events_url": "https://api.github.com/users/yehuoyiji/received_events",
      "type": "User",
      "user_view_type": "public",
      "site_admin": false,
      "name": "野火一季",
      "company": null,
      "blog": "https://yehuo.icu",
      "location": null,
      "email": null,
      "hireable": null,
      "bio": "一个疯狂的coder",
      "twitter_username": null,
      "public_repos": 8,
      "public_gists": 0,
      "followers": 6,
      "following": 7,
      "created_at": "2023-07-06T05:47:20Z",
      "updated_at": "2024-10-29T12:32:49Z"
    }

  } else {
    Message.error(ins.value.msg)
  }
  loading.value = false

}

const userLogin = ref('')
// const userLogin = inject<any>("userLogin")
onBeforeUnmount(() => {
  Bus.on("userLogin", (data) => {
    userLogin.value = data as any
    userName.value = userLogin.value
    search(userLogin.value)
  })

})
Bus.on("userLogin", (data) => {
  alert(data)
  userLogin.value = data as any
  userName.value = userLogin.value
  search(userLogin.value)
})
onMounted(async () => {
  if (userName.value == '') {
    userName.value = store.state.userLogin
    await search(userName.value)
  }
  store.commit("changeInitFlag", false)
})
onUnmounted(() => {
  Bus.off("userLogin")
})
</script>

<style scoped>
#personalPage {
  width: 100%;
  height: 100%;
}

.personDetail {
  width: 100%;
  height: 100%;
  padding: 20px 40px 20px 20px
}

.TalentRank {
  margin-left: -15px;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 9;
  flex-direction: column;
}
.percentage-value {
  display: block;
  //margin-top: 10px;
  font-size: calc(100vw * 36 / 1920);
}
.scrollbar-demo-item {
  display: inline-block;
  height: calc(100vw * 160 / 1920);
  margin: 10px;
  width: calc(100vw * 655 / 1920);
  border-radius: 10px;
  //background: #f6e1e1;
  border: 1px solid #d1d9e0;
  color: #000000;
}
.scrollbar-demo-item[data-v-4e773cc2] {
  margin: 10px 10px 10px 0;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: calc(100vw * 12 / 1920);
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.MainContent {

}

</style>
<style>
.el-skeleton__item {
  background: var(--skeleton-bg-color) !important; /* 浅灰色背景 */
}
</style>