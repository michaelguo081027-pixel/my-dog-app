<template>
  <nav class="nav">
    <router-link to="/">首页</router-link>
    <router-link to="/choose-dog">选狗</router-link>
    <router-link to="/raise-dog">养狗</router-link>
    <router-link to="/rules">规则</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
</style>
