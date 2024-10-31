<template>
  <div class="StatisticalCard2">
    <div style="display:flex; flex: 1; justify-content: center; align-items: center; flex-direction: column">
      <el-statistic style="font-size: 18px" title="本月提交数" :value="outputValue1"/>
      <div class="statistic-footer">
        <div class="footer-item">
          <span>相比于上月</span>
          <span class="red">
              12%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
        </div>
      </div>
    </div>
    <div style="display:flex; flex: 1; justify-content: center; align-items: center; flex-direction: column">
      <el-statistic title="本月PR数" :value="outputValue2"></el-statistic>
      <div class="statistic-footer">
        <div class="footer-item">
          <span>相比于上月</span>
          <span class="red">
              12%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
        </div>
      </div>
    </div>
    <div style="display:flex; flex: 1; justify-content: center; align-items: center; flex-direction: column">
      <el-statistic title="本月代码量" :value="outputValue3"/>
      <div class="statistic-footer">
        <div class="footer-item">
          <span>相比于上月</span>
          <span class="red">
              12%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useTransition} from '@vueuse/core'
import {CaretBottom, ChatLineRound, Male} from '@element-plus/icons-vue'

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