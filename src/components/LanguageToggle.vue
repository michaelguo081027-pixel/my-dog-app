<template>
  <button
    type="button"
    class="lang-toggle"
    :aria-label="copy.common.languageAriaLabel"
    @click="toggle"
  >
    {{ copy.common.languageButton }}
  </button>
</template>

<script>
import { i18nState, langData, toggleLang } from '@/i18n'

export default {
  name: 'LanguageToggle',

  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    }
  },

  methods: {
    toggle() {
      toggleLang()
    }
  }
}
</script>

<style scoped>
.lang-toggle {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 1000;
  min-width: 44px;
  height: 34px;
  border: 1px solid rgba(22, 163, 74, 0.22);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  color: #166534;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
}

.lang-toggle:active {
  transform: scale(0.96);
}
</style>
