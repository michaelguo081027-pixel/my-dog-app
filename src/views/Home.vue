<template>
  <div class="home">
    <!-- 弹幕 -->
    <BulletScreen />

    <!-- 三个入口模块 -->
    <div class="entry-grid">
      <div class="entry-card" @click="goEntry(1)">
        <img src="https://via.placeholder.com/300x180?text=Dog+Test" />
        <h3>🐾 我适合养狗吗？</h3>
      </div>

      <div class="entry-card" @click="goEntry(2)">
        <img src="https://via.placeholder.com/300x180?text=Choose+Dog" />
        <h3>🐶 这么多狗，我该选哪一种？</h3>
      </div>

      <div class="entry-card" @click="goEntry(3)">
        <img src="https://via.placeholder.com/300x180?text=Dog+Guide" />
        <h3>📘 养狗难不难？要注意什么？</h3>
      </div>
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
    goEntry(type) {
      if (type === 1) {
        this.$router.push('/dog-test')
      } else if (type === 2) {
        this.$router.push('/choose-dog')
      } else if (type === 3) {
        this.$router.push('/dog-guide')
      }
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
.entry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px;
}

.entry-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.entry-card:hover {
  transform: translateY(-4px);
}

.entry-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.entry-card h3 {
  margin: 12px;
  font-size: 16px;
}

</style>
