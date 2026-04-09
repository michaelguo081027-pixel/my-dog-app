<template>
<div class="splash fade-in">
  <img src="@/assets/dog-main.png" class="main-img" />
</div>
</template>

<script>

export default {
  name: "SplashView",
  mounted() {
    // 2秒后跳转首页
    setTimeout(() => {
      localStorage.setItem('hasSeenSplash', 'true')
      this.$router.replace('/')
    }, 2000)
  }
};

</script>

<style scoped>
.fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.splash {
  height: 100vh;
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-img {
  width: 100%;
  height: 90vh;   /* 屏幕高度的45% */
  object-fit: contain;
}


.subtitle {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
