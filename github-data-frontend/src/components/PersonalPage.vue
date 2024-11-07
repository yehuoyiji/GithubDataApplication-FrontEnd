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
              <el-skeleton :animated="true" :loading="loading">
                <template #template>
                  <div style="padding-right: 20px">
                    <el-skeleton style="padding: 20px -50px 0 40px;" :rows="12"></el-skeleton>
                  </div>
                </template>
                <template #default>
                  <div class="personDetail">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px; color: var(--text-color)">
                      {{ personalList.name }}
                    </div>
                    <div style="font-size: 1rem; color: #999; margin-bottom: 10px;">{{ personalList?.login }}</div>
                    <div style="font-size: 1rem; color: var(--text-color); margin-bottom: 10px"> {{
                        personalList?.bio
                      }}
                    </div>
                    <div style="margin-bottom: 5px; display: flex; align-items: center; color: var(--text-color)">
                      <a-space>
                        <el-icon color="var(--text-color)">
                          <Location/>
                        </el-icon>
                        <div v-if="personalList?.location !== null">
                          {{ personalList?.location }}
                        </div>
                        <div v-else>空地址</div>
                      </a-space>
                    </div>
                    <div v-if='personalList?.blog !== null' style="margin-bottom: 10px; display: flex; align-items: center;color: var(--text-color)">
                      <a-space>
                        <el-icon>
                          <Link/>
                        </el-icon>
                        <el-link type="primary" :href="personalList?.blog">{{ personalList?.blog }}</el-link>
                      </a-space>
                    </div>
                    <div class="TalentRank">

                    </div>
                  </div>
                </template>
              </el-skeleton>
            </div>
          </div>
          <div style="height: 100%; width: 1px; background-color: var(--border-color); margin: -30px 20px 20px 0"></div>
          <div style="display: flex; flex: 7.5; padding: 10px 10px 20px 20px; flex-direction: column">
            <div style="display: flex; flex: 2">

              <div
                  style="display:flex; padding: 15px; flex: 1; border-radius: 15px; margin-right: 10px;background: -webkit-linear-gradient(left top, #EC6C6C,#FFD479,#FFFC79,#73FA79); font-size: calc(100vw * 16 / 1920);">
                <div
                    style="display: flex; flex: 6; flex-direction: column; margin-right: 10px; font-weight: 700; margin-left: 10px">
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon>
                          <Star/>
                        </el-icon>
                        <span>获取星数（star）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center" v-if="card1?.totalStars">{{card1?.totalStars}}</div>
                    <div style="display: flex; align-items: center" v-else>暂无数据</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon>
                          <Coin/>
                        </el-icon>
                        <span>累计提交数（commit）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center" v-if="card1?.totalCommits">{{card1?.totalCommits}}</div>
                    <div style="display: flex; align-items: center" v-else>暂无数据</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon>
                          <Connection/>
                        </el-icon>
                        <span>拉取请求数（PR）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center" v-if="card1?.totalPRCount">{{card1?.totalPRCount}}</div>
                    <div style="display: flex; align-items: center" v-else>暂无数据</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon>
                          <Warning/>
                        </el-icon>
                        <span>指出问题数（issue）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center" v-if="card1?.totalIssues">{{card1?.totalIssues}}</div>
                    <div style="display: flex; align-items: center" v-else>暂无数据</div>
                  </div>
                  <div style="display: flex; flex: 1; justify-content: space-between">
                    <div style="display: flex; align-items: center">
                      <a-space>
                        <el-icon>
                          <Collection/>
                        </el-icon>
                        <span>贡献于（去年）:</span>
                      </a-space>
                    </div>
                    <div style="display: flex; align-items: center" v-if="card1?.totalCommitsLastYear">{{card1?.totalCommitsLastYear}}</div>
                    <div style="display: flex; align-items: center" v-else>暂无数据</div>
                  </div>
                </div>
                <div style="display: flex; flex: 4; justify-content: center; align-items: center;">
                  <el-progress stroke-width="7" :striped="true" :striped-flow="true" type="dashboard" :percentage="(score / 5).toFixed(0)"
                               color="#f56c6c">
                    <template #default="{ percentage }">
                      <span class="percentage-value" v-if="percentage >= 0 && percentage <= 20">
                        D
                      </span>
                      <span class="percentage-value" v-else-if="percentage > 20 && percentage <= 40">
                        C
                      </span>
                      <span class="percentage-value" v-if="percentage > 40 && percentage <= 60">
                        B
                      </span>
                      <span class="percentage-value" v-if="percentage > 60 && percentage <= 80">
                        A
                      </span>
                      <span class="percentage-value" v-if="percentage > 80 && percentage <= 100">
                        A+
                      </span>
                    </template>
                  </el-progress>
                </div>
              </div>
              <div
                  style="display:flex; flex: 1;border-radius: 15px; margin-left: 10px;background: -webkit-linear-gradient(left top, #73FA79,#73FDFF,#D783FF); padding: 15px; width: 100%">
                <StatisticalCard2></StatisticalCard2>
                </div>
            </div>
            <div style="display:flex; flex: 7; height: 100%; width: 100%; margin-top: 5px;  overflow-x: hidden;">
              <div style="width: 100%; height: 100%;   overflow-x: hidden;">
                <el-scrollbar style="height: calc(100vw * 560 / 1920);overflow-x: hidden; width: 100%; ">
                  <div v-for="item in RepositoryData" :key="item" class="scrollbar-demo-item">
                    <div style="width: 100%; height: 100%; padding: 0 20px; display: flex; flex-direction: column">
                      <div style="color: var(--repository-name-color); font-size: 18px; flex: 1;display: flex; align-items: center">{{ item.name }}</div>
                      <div style="color: var(--repository-description-color); flex: 1;display: flex; align-items: center">{{ item.description }}</div>
                      <div v-if="item?.topics.length > 0" style="flex: 1;display: flex; align-items: center">
                        <div style="display: inline-block; width: 100%; ">
                          <a-space>
                          <span v-for="(topic, index) in item?.topics">
                            <span  v-if="index < 10" style="background-color: var(--repository-topic-bg-color); font-weight: 500; border: 0; padding: 5px 10px; border-radius: 15px; color: var(--repository-topic-color)"> {{ topic }}</span>
                          </span>
                          </a-space>
                        </div>
                      </div>
                      <div
                          style="flex: 1; display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
                        <div style="display: flex; gap: 4px; align-items: center" v-if="item.language">
                          <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #f56c6c;">
                          </div>
                          <span style="color: #59636e">{{item?.language}}</span>
                        </div>
                        <span v-if="item.language">•</span>
                        <div style="display: flex; gap: 4px; align-items: center" >
                          <el-icon style="color: var(--text-color)"><Star /></el-icon>
                          <span style="color: #59636e">{{item?.stargazers_count}}</span>
                        </div>

                      </div>
                    </div>
                  </div>
                </el-scrollbar>
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
import {getGitHubMsgByName, getRepositoryByName} from "@/api/serach";
import {Message} from "@arco-design/web-vue";
import {Location, Link, Star, Coin, Connection, Warning, Collection} from "@element-plus/icons-vue";
import StatisticalCard2 from "@/components/StatisticalCard2.vue";

import {useStore} from "vuex";
import Bus from "@/utils/Bus";

import getUserStatistics1 from "@/utils/Graphql";
import inferLocationFromRelations from "@/utils/getLocationByRelationShip";

const userName = ref('')
const isSearchTrue = ref(false)
const loading = ref(true)
const personalList = ref()
const flag = ref(true)
const store = useStore()
const repositoryData = ref({
  repositoryCount: 0,
  followerCount: 0,
  followingCount: 0,
})

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
    if (personalList.value.location == null) {
      personalList.value.location = await inferLocationFromRelations(userName) as any
    }
    if (personalList.value.blog === null || personalList.value.blog === ""){
      personalList.value.blog = null;
    }
  } else {
    Message.error(ins.value.msg)
    isSearchTrue.value = false
  }
  const ress = await getUserStatistics1(userName)
  card1.value = JSON.parse(JSON.stringify(ress)) || {}
  repositoryData.value.repositoryCount = personalList.value.public_repos
  repositoryData.value.followerCount = personalList.value.followers
  repositoryData.value.followingCount = personalList.value.following
  Bus.emit("UserData", repositoryData.value)
  await getRepositoryData(userName)
  loading.value = false
}

const RepositoryData = ref([])
const allStarCount = ref(0)
const score = ref(0)
const getRepositoryData = async (userName: string) => {
  const res = await getRepositoryByName(userName);
  RepositoryData.value = res.data[0];
  score.value = res.data[1]

}
const userLogin = ref('')

onBeforeUnmount(() => {
  Bus.on("userLogin", (data) => {
    userLogin.value = data as any
    userName.value = userLogin.value
    search(userLogin.value)
    getRepositoryData(userName.value)
  })
})
Bus.on("userLogin", (data) => {
  userLogin.value = data as any
  userName.value = userLogin.value
  search(userLogin.value)
  getRepositoryData(userName.value)

})
const card1 = ref()
const location = ref('')
onMounted(async () => {
  if (userName.value == '') {
    userName.value = store.state.userLogin
    await search(userName.value)
    await getRepositoryData(userName.value)
  }
  store.commit("changeInitFlag", false)
  const res = await getUserStatistics1(userName.value)
  card1.value = JSON.parse(JSON.stringify(res || {}))

  // let stringPromise = inferLocationFromRelations("lhccong");
  if (personalList.value.location == null) {
    personalList.value.location = await inferLocationFromRelations(userName.value) as any
  }

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
  //margin: 10px 0 10px 0;
  //width: calc(100vw * 642 / 1920);
  width: 96.5%;
  border-radius: 10px;
  //background: #f6e1e1;
  border: 1px solid var(--border-color);
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