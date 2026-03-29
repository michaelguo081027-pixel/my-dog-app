<template>
  <div class="splash">
    <div class="logo">我与狗</div>
    <div class="subtitle">科学认识 · 理性选择 · 用心陪伴</div>
  </div>
</template>

<script>

export default {
  name: "SplashView",
  mounted() {
    setTimeout(() => {
      this.$router.replace("/home");
    }, 1800);
  }
};

</script>

<style scoped>
.splash {
  height: 100vh;
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  color: #2e7d32;
}

.subtitle {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
