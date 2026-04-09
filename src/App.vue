<template>
  <div id="app">
    <!-- 只有非启动页才显示 NavBar -->
    <NavBar v-if="$route.path !== '/'" />
    <router-view />
    <div class="tab-bar">
      <div
        @click="$router.push('/raise-dog')"
        class="tab"
        :class="{ active: $route.path === '/raise-dog' }"
      >
        🐶 养狗
      </div>

      <div
        @click="$router.push('/choose-dog')"
        class="tab"
        :class="{ active: $route.path === '/choose-dog' }"
      >
        🐕 选狗
      </div>

      <div
        @click="$router.push('/rules')"
        class="tab"
        :class="{ active: $route.path === '/rules' }"
      >
        📖 规则
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  display: flex;
  border-top: 1px solid #eee;
}

.tab {
  flex: 1;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
}

.tab {
  flex: 1;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
  color: #666;
}

.tab.active {
  color: #16a34a;
  font-weight: 600;
}
</style>