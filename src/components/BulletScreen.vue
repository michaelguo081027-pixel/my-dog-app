<template>
  <div class="bullet-wrapper">
    <div class="bullet bullet1">
      {{ copy.home.bullets[0] }}
    </div>
    <div class="bullet bullet2">
      {{ copy.home.bullets[1] }}
    </div>
    <div class="bullet bullet3">
      {{ copy.home.bullets[2] }}
    </div>
  </div>
</template>

<script>
import { i18nState, langData } from '@/i18n'

export default {
  name: "BulletScreen",

  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    }
  }
}
</script>

<style scoped>
.bullet-wrapper {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: #ffffff;
}

/* 公共弹幕样式 */
.bullet {
  position: absolute;
  left: 100%;
  white-space: nowrap;
  font-size: 15px;
  color: #333;
  background: #f5f5f5;
  padding: 6px 14px;
  border-radius: 20px;
}

/* 三条弹幕分别控制 */
.bullet1 {
  top: 20px;
  animation: move1 20s linear infinite;
}

.bullet2 {
  top: 60px;
  animation: move2 24s linear infinite;
}

.bullet3 {
  top: 100px;
  animation: move3 28s linear infinite;
}

/* 三个独立动画，绝不冲突 */
@keyframes move1 {
  from { left: 100%; }
  to { left: -120%; }
}

@keyframes move2 {
  from { left: 100%; }
  to { left: -120%; }
}

@keyframes move3 {
  from { left: 100%; }
  to { left: -120%; }
}
</style>
