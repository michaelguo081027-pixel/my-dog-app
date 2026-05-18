<template>
  <div class="home">
    <!-- 弹幕 -->
    <BulletScreen />
    <LanguageToggle />

    <p class="status">
      {{ copy.home.status }} {{ days }} {{ copy.common.days }}
      ｜ {{ copy.common.mood }}：{{ moodText }}
    </p>
    <p class="streak">
      🔥 {{ copy.home.streak }} {{ streak }} {{ copy.common.days }}
    </p>
    <p class="main-text">
      <span>{{ copy.home.mainText[0] }}</span>
      <br>
      <span>{{ copy.home.mainText[1] }}</span>
    </p>


    <div class="card" @click="goTest">
      <img :src="require('@/assets/home/decide.png')" />
      <p>{{ copy.home.cards[0] }}</p>
    </div>

    <div class="card" @click="goChoose">
      <img :src="require('@/assets/home/choose.png')" />
      <p>{{ copy.home.cards[1] }}</p>
    </div>

    <div class="card" @click="goGuide">
      <img :src="require('@/assets/home/raise.png')" />
      <p>{{ copy.home.cards[2] }}</p>
    </div>
    <button class="share-btn" @click="showShare = true">
      {{ copy.home.share }}
    </button>
    <div v-if="showShare" class="share-card">
      <p>{{ format(copy.home.shareCard.days, { days }) }}</p>
      <p>{{ format(copy.home.shareCard.streak, { streak }) }}</p>
      <p>{{ format(copy.home.shareCard.mood, { mood: moodText }) }}</p>

      <button @click="showShare = false">{{ copy.home.shareCard.close }}</button>

    </div>
  </div>
</template>



<script>
import { formatMessage, i18nState, langData } from '@/i18n'
import BulletScreen from '@/components/BulletScreen.vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

export default {
  name: 'HomePage',

  components: {
    BulletScreen,
    LanguageToggle
  },

  data() {
    return {
      days: 0,
      todayFed: false,
      streak: 0,
      dog: null,
      daysTogether: null,
      showShare: false
    }
  },

  created() {
    const savedDog = localStorage.getItem('myDog')
    const startDate = localStorage.getItem('startDate')

    if (savedDog && startDate) {
      this.dog = JSON.parse(savedDog)

      const start = new Date(startDate)
      const now = new Date()
      const diffTime = now - start
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      this.daysTogether = diffDays + 1
    }
  },

  methods: {
    goTest() {
      this.$router.push('/dog-test')
    },
    goChoose() {
      this.$router.push('/choose-dog')
    },
    goGuide() {
      this.$router.push('/rules')
    },
    getDaysDiff(dateStr) {
      const last = new Date(dateStr)
      const now = new Date()
      return Math.floor((now - last) / (1000 * 60 * 60 * 24))
    },
    format(template, values) {
      return formatMessage(template, values)
    }
  },

  mounted() {
    // 📅 计算陪伴天数
    let start = localStorage.getItem('startDate')

    if (!start) {
      start = new Date()
      localStorage.setItem('startDate', start)
    }

    const days = Math.floor(
      (Date.now() - new Date(start)) / (1000 * 60 * 60 * 24)
    )

    this.days = days + 1

    // 🐶 判断今天是否完成照顾
    const today = new Date().toDateString()
    const last = localStorage.getItem('lastFedDate')

    this.todayFed = (today === last)
    this.streak = parseInt(localStorage.getItem('streak')) || 0
  },

  computed: { 
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    },
    moodText() {
      const last = localStorage.getItem('lastFedDate')
      if (!last) return this.copy.common.moods.sad

      const diff = this.getDaysDiff(last)

      if (diff === 0) return this.copy.common.moods.happy
      if (diff === 1) return this.copy.common.moods.bored
      return this.copy.common.moods.sad
    }
  }
}
</script>



<style scoped>
.summary {
  margin: 24px;
  font-size: 18px;
  font-weight: bold;
  color: #42b983;
}

.home {
  padding: 15px;
}

.main-text {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.5;
}

.card {
  background: #fff;
  border-radius: 14px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}

.card:active {
  transform: scale(0.97); /* 👈 点击有反馈（很重要） */
}

.card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.card p {
  padding: 12px;
  font-size: 15px;
}

.status {
  text-align: center;
  font-size: 17px;
  margin: 10px 0 15px;
  color: #ff6b6b;
  font-weight: 500;
}

.streak {
  text-align: center;
  font-size: 15px;
  color: #ffa502;
  margin-bottom: 10px;
}

.share-btn {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);

  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.3);

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px); /* 🔥 关键 */
  -webkit-backdrop-filter: blur(10px);

  color: #ff6b6b;
  font-size: 14px;
  font-weight: 500;

  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}

.share-btn:active {
  transform: translateX(-50%) scale(0.95);
  box-shadow: 0 3px 10px rgba(255, 107, 107, 0.3);
}

@keyframes float {
  0% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -3px); }
  100% { transform: translate(-50%, 0); }
}

.share-btn {
  animation: float 2.5s ease-in-out infinite;
}

.share-card {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  z-index: 999;
}

</style>
