<template>
  <div class="page">
    <h2>📖 养狗规则</h2>

    <div class="rule-item">
      <h3>🐶 责任养狗</h3>
      <p>养狗是一段长期责任，请在现实中慎重决定是否饲养宠物。</p>
    </div>

    <div class="rule-item">
      <h3>💔 减少弃养</h3>
      <p>每一只被抛弃的狗，都在等待它的主人。本应用希望减少现实中的弃养行为。</p>
    </div>

    <div class="rule-item">
      <h3>❤️ 每日陪伴</h3>
      <p>每天完成喂食、喝水、玩耍任务，狗狗会更依赖你。</p>
    </div>

    <div class="rule-item">
      <h3>🔥 连续陪伴</h3>
      <p>连续打卡天数越多，你们的关系越深。</p>
    </div>

    <div class="rule-item">
      <h3>💉 健康与安全</h3>
      <p>定期为狗狗接种疫苗，是对它和他人负责的重要行为。</p>
    </div>

    <div class="rule-item">
      <h3>🏡 领养代替购买</h3>
      <p>优先考虑领养流浪动物，帮助减少流浪狗数量。</p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'RulesPage'
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