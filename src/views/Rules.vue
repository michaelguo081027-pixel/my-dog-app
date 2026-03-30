<template>
  <div class="page">
    <h2>📖 养狗规则</h2>

    <div class="rule-item">
      <h3>🐶 每日陪伴</h3>
      <p>每天完成喂食、喝水、玩耍任务，狗狗会更开心。</p>
    </div>

    <div class="rule-item">
      <h3>🔥 连续天数</h3>
      <p>连续打卡天数越多，狗狗越依赖你。</p>
    </div>

    <div class="rule-item">
      <h3>💔 忘记陪伴</h3>
      <p>如果你长时间没来，狗狗会感到失落。</p>
    </div>

    <div class="rule-item">
      <h3>🎲 每日变化</h3>
      <p>每天狗狗的状态都会有一点不同。</p>
    </div>

    <div class="rule-item">
      <h3>❤️ 建立关系</h3>
      <p>陪伴越久，你们的关系会越来越深。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules'
}
</script>

<style scoped>
.page {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.rule-item {
  background: #f9fafb;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.rule-item h3 {
  margin-bottom: 6px;
}

.rule-item p {
  font-size: 14px;
  color: #555;
}
</style>
