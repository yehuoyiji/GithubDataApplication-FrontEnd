<template>
  <div id="personalPage">
    <div class="container">
      <div style="display: flex; flex: 1; justify-content: center;">
        <a-input-search :loading="isSearchTrue" @search="search" v-model="userName" size="large"
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
      <div style="display: flex; flex: 8;">
        <div class="MainContent"
             style="width: 100%; height: 100%; background-color: #f8f6f6; margin: 0 3vw; border-radius: 20px; padding: 20px 20px 0 20px; display: flex;">
          <div style="display: flex; flex: 2; flex-direction: column;">
            <!-- 头像加载动画 -->
            <div style="flex: 3; display: flex; text-align: center; align-items: center; justify-content: center;">
              <el-skeleton :animated="true" :loading="loading" style="--el-skeleton-circle-size: 200px">
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
              <el-skeleton :animated="true" :loading="loading">
                <template #template>
                  <div style="padding-right: 20px">
                    <el-skeleton style="padding: 20px -50px 0 40px;" :rows="12"></el-skeleton>
                  </div>
                </template>
                <template #default>
                  <div class="personDetail">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px">{{ personalList.name }}</div>
                    <div style="font-size: 1rem; color: #999; margin-bottom: 10px">{{ personalList?.login }}</div>
                    <div style="font-size: 1rem; color: #000; margin-bottom: 10px"> {{ personalList?.bio }}</div>
                    <div style="margin-bottom: 5px; display: flex; align-items: center">
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
                    <div style="margin-bottom: 10px; display: flex; align-items: center">
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
          <div style="height: 92%; width: 1px; background-color: #e7e4e4; margin: 20px 20px 20px 0"></div>
          <div style="display: flex; flex: 8; padding: 20px; flex-direction: column">
            <div style="display: flex; flex: 3">

              <div
                  style="display:flex; padding: 15px; flex: 1; border-radius: 15px; margin-right: 10px;background: -webkit-linear-gradient(left top, #EC6C6C,#FFD479,#FFFC79,#73FA79);">
                <div style="display: flex; flex: 6; flex-direction: column; margin-right: 10px; font-weight: 700">
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Star /></el-icon>
                        <span>获取星数（star）:</span>
                      </a-space>
                    </div>
                    <div>7</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Coin /></el-icon>
                        <span>累计提交数（commit）:</span>
                      </a-space>
                    </div>
                    <div>66</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Connection /></el-icon>
                        <span>拉取请求数（PR）:</span>
                      </a-space>
                    </div>
                    <div>2</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Warning /></el-icon>
                        <span>指出问题数（issue）:</span>
                      </a-space>
                    </div>
                    <div>7</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon><Collection /></el-icon>
                        <span>贡献于（去年）:</span>
                      </a-space>
                    </div>
                    <div>2</div>
                  </div>

                </div>
                <div style="display: flex; flex: 4">

                </div>
              </div>
              <div
                  style="display:flex; flex: 1;border-radius: 15px; margin-left: 10px;background: -webkit-linear-gradient(left top, #73FA79,#73FDFF,#D783FF);">

              </div>
            </div>
            <div style="display:flex; flex: 7">
              a
            </div>


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
import {Location, Link, Star, Coin, Connection, Warning, Collection} from "@element-plus/icons-vue";

const userName = ref('')
const isSearchTrue = ref(false)
const loading = ref(true)
const personalList = ref()

const search = async () => {
  if (userName.value == '') {
    Message.error('请输入github用户名')
    return
  }
  loading.value = true
  isSearchTrue.value = true
  const res = await getGitHubMsgByName(userName.value)
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
    // alert(personalList.value)
  } else {
    Message.error(ins.value.msg)
  }
  loading.value = false
  // alert(personalList.value.avatar_url)
}

onMounted(async () => {
  await initPersonalPage()
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

.MainContent {

}
</style>