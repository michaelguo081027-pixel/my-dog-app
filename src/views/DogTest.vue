<template>
  <div class="page">
    <h2>🐾 我适合养狗吗？</h2>

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
      <h3>测试结果</h3>
      <p>{{ resultText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DogTest',

  data() {
    return {
      step: 0,
      score: 0,
      resultText: '',
      questions: [
        {
          title: '你每天能陪狗多长时间？',
          options: [
            { text: '少于 1 小时', score: 1 },
            { text: '1–3 小时', score: 2 },
            { text: '3 小时以上', score: 3 }
          ]
        },
        {
          title: '你是否愿意每天带狗外出？',
          options: [
            { text: '不太愿意', score: 1 },
            { text: '可以接受', score: 2 },
            { text: '非常愿意', score: 3 }
          ]
        },
        {
          title: '你对掉毛和打理的接受度？',
          options: [
            { text: '比较介意', score: 1 },
            { text: '还可以', score: 2 },
            { text: '完全不介意', score: 3 }
          ]
        }
      ]
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
            this.resultText =
            '你目前更适合饲养安静、运动量较小、好打理的狗狗。'
            level = 'low'
        } else if (this.score <= 7) {
            this.resultText =
            '你适合大多数家庭犬，可以根据性格偏好进行选择。'
            level = 'mid'
        } else {
            this.resultText =
            '你非常适合养狗，可以考虑精力旺盛、互动性强的犬种。'
            level = 'high'
        }

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
