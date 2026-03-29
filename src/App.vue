<template>
  <div id="app">
    <!-- 只有非启动页才显示 NavBar -->
    <NavBar v-if="$route.path !== '/'" />
    <router-view />
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
