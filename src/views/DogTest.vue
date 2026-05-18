<template>
  <div class="page">
    <LanguageToggle />
    <h2>{{ copy.dogTest.title }}</h2>

    <div v-if="step < questions.length">
      <p class="question">{{ questions[step].title }}</p>

      <div class="options">
        <button
          v-for="(opt, index) in questions[step].options"
          :key="index"
          @click="choose(opt.score)"
        >
          {{ opt.text }}
        </button>
      </div>
    </div>

    <div v-else class="result">
      <h3>{{ copy.dogTest.resultTitle }}</h3>
      <p>{{ resultText }}</p>
    </div>
  </div>
</template>

<script>
import { i18nState, langData } from '@/i18n'
import LanguageToggle from '@/components/LanguageToggle.vue'

export default {
  name: 'DogTest',

  components: {
    LanguageToggle
  },

  data() {
    return {
      step: 0,
      score: 0,
      resultLevel: ''
    }
  },

  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    },
    questions() {
      return this.copy.dogTest.questions
    },
    resultText() {
      return this.resultLevel ? this.copy.dogTest.results[this.resultLevel] : ''
    }
  },

  methods: {
    choose(s) {
      this.score += s
      this.step++

      if (this.step === this.questions.length) {
        this.calcResult()
      }
    },

    calcResult() {
        let level = ''

        if (this.score <= 4) {
            level = 'low'
        } else if (this.score <= 7) {
            level = 'mid'
        } else {
            level = 'high'
        }

        this.resultLevel = level

        // ✅ 关键：保存测试结果等级
        localStorage.setItem('dogTestLevel', level)

        // ✅ 延迟跳转到选狗页（给用户1秒看结果）
        setTimeout(() => {
            this.$router.push('/choose-dog')
        }, 1000)
      }

  }
}
</script>

<style scoped>
.page {
  padding: 24px;
}

.question {
  font-size: 16px;
  margin: 20px 0;
}

.options button {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  font-size: 16px;
}

.result {
  margin-top: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #42b983;
}
</style>
