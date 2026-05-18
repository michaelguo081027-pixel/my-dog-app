<template>
  <nav class="nav">
    <router-link to="/home">{{ copy.nav.home }}</router-link>
    <router-link to="/choose-dog">{{ copy.nav.chooseDog }}</router-link>
    <router-link to="/raise-dog">{{ copy.nav.raiseDog }}</router-link>
    <router-link to="/rules">{{ copy.nav.rules }}</router-link>
  </nav>
</template>

<script>
import { i18nState, langData } from '@/i18n'

export default {
  name: 'NavBar',

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
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 76px 16px 16px;
  border-bottom: 1px solid #eee;
}
</style>
