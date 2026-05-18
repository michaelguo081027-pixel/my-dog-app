<template>
  <div class="page">
    <LanguageToggle />
    <h2>{{ copy.rules.title }}</h2>

    <div
      v-for="item in copy.rules.items"
      :key="item.title"
      class="rule-item"
    >
      <h3>{{ item.title }}</h3>
      <p>{{ item.text }}</p>
    </div>
    
  </div>
</template>

<script>
import { i18nState, langData } from '@/i18n'
import LanguageToggle from '@/components/LanguageToggle.vue'

export default {
  name: 'RulesPage',

  components: {
    LanguageToggle
  },

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
