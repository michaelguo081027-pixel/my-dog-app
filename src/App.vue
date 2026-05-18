<template>
  <div id="app">
    <!-- 只有非启动页才显示 NavBar -->
    <NavBar v-if="$route.path !== '/'" />
    <transition name="fade-slide" mode="out-in">
      <router-view />
    </transition>
    <div class="tab-bar">
      <div
        @click="$router.push('/raise-dog')"
        class="tab"
        :class="{ active: $route.path === '/raise-dog' }"
      >
        {{ copy.app.raiseDog }}
      </div>

      <div
        @click="$router.push('/choose-dog')"
        class="tab"
        :class="{ active: $route.path === '/choose-dog' }"
      >
        {{ copy.app.chooseDog }}
      </div>

      <div
        @click="$router.push('/rules')"
        class="tab"
        :class="{ active: $route.path === '/rules' }"
      >
        {{ copy.app.rules }}
      </div>
    </div>
  </div>
</template>

<script>
import { i18nState, langData } from '@/i18n'
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar
  },

  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    }
  }
};
</script>

<style scoped>
#app {
  --tab-bar-height: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: calc(var(--tab-bar-height) + 20px + env(safe-area-inset-bottom));
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 800;
  height: var(--tab-bar-height);
  padding-bottom: env(safe-area-inset-bottom);
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

.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
