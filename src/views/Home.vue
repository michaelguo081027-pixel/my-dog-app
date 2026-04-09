<template>
  <div class="home">
    <!-- 弹幕 -->
    <BulletScreen />
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

</style>
