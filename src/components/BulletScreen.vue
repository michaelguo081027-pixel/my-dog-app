<template>
  <div class="bullet-wrapper">
    <div class="bullet bullet1">
      我很喜欢狗狗，但我真的适合养狗吗？
    </div>
    <div class="bullet bullet2">
      狗狗那么多，我应该养哪一种？
    </div>
    <div class="bullet bullet3">
      狗狗好养吗？养好一只狗需要注意什么？
    </div>
  </div>
</template>

<script>
export default {
  name: "BulletScreen"
};
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
