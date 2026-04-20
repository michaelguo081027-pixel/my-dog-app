<template>
  <div class="home">
    <!-- 弹幕 -->
    <BulletScreen />
    <p class="status">
      🐶 已陪伴 {{ days }} 天 ｜ 当前状态：{{ mood }}
    </p>
    <p class="streak">
      🔥 已连续照顾 {{ streak }} 天
    </p>
    <p class="main-text">
      每一只被遗弃的狗，
      都曾经相信过人类。
    </p>


    <div class="card" @click="goTest">
      <img :src="require('@/assets/home/decide.png')" />
      <p>我适合养狗吗？（⬆这里有答案）</p>
    </div>

    <div class="card" @click="goChoose">
      <img :src="require('@/assets/home/choose.png')" />
      <p>这么多狗，我该选哪一种？（⬆在这里选最适合养的狗）</p>
    </div>

    <div class="card" @click="goGuide">
      <img :src="require('@/assets/home/raise.png')" />
      <p>养狗难不难？要注意什么？（⬆点击查看注意事项）</p>
    </div>
  </div>
</template>



<script>
import BulletScreen from '@/components/BulletScreen.vue'

export default {
  name: 'HomePage',

  components: {
    BulletScreen
  },

  data() {
    return {
      days: 0,
      todayFed: false,
      streak: 0,
      dog: null,
      daysTogether: null
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
    mood() {
      return this.todayFed ? '开心 😊' : '孤单 😢'
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
</style>