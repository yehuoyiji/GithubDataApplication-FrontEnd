<template>
  <div class="StatisticalCard2">
    <div style="display:flex; flex: 1; justify-content: center; align-items: center; flex-direction: column">
      <el-statistic style="font-size: 18px" title="公开仓库数" :value="user_data?.repositoryCount || '暂无数据'"/>

    </div>
    <div style="display:flex; flex: 1; justify-content: center; align-items: center; flex-direction: column">
      <el-statistic title="总粉丝数" :value="user_data?.followerCount || '暂无数据'"></el-statistic>
    </div>
    <div style="display:flex; flex: 1; justify-content: center; align-items: center; flex-direction: column">
      <el-statistic title="总关注数" :value="user_data?.followingCount || '暂无数据'"/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {useTransition} from '@vueuse/core'
import {CaretBottom, ChatLineRound, Male} from '@element-plus/icons-vue'
import Bus from "@/utils/Bus";

const source1 = ref(0)
const source2 = ref(0)
const source3 = ref(0)
const outputValue3 = useTransition(source3, {
  duration: 1500,
})
const outputValue2 = useTransition(source2, {
  duration: 1500,
})
const outputValue1 = useTransition(source1, {
  duration: 1500,
})
const user_data = ref()
onMounted(() => {
  Bus.on("UserData", (data) => {
    user_data.value = data
  })
})

onBeforeUnmount(() => {
  Bus.off("UserData")
})
source1.value = 268500
source2.value = 138
source3.value = 172000
</script>

<style scoped>
.el-col {
  text-align: center;
}
.StatisticalCard2 {
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 10px;

}

</style>
<style>

.el-statistic__head {
  font-size: calc(100vw * 16 / 1920);
}
.el-statistic__content {
  font-size: calc(100vw * 24 / 1920)
}
.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: calc(100vw * 12 / 1920);;
  color: var(--el-text-color-regular);
  margin-top: calc(100vw * 16 / 1920);;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: calc(100vw * 4 / 1920);;
}
</style>