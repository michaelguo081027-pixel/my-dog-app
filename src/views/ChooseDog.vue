<template>
  <div class="page">
    <LanguageToggle />

    <!-- ⭐ 推荐提示文案 -->
    <p v-if="recommendLevel === 'low'" class="recommend-tip">
      {{ copy.chooseDog.recommendTips.low }}
    </p>
    <p v-if="recommendLevel === 'mid'" class="recommend-tip">
      {{ copy.chooseDog.recommendTips.mid }}
    </p>
    <p v-if="recommendLevel === 'high'" class="recommend-tip">
      {{ copy.chooseDog.recommendTips.high }}
    </p>

    <!-- 推荐 / 不推荐说明 -->
    <div class="reason-box" v-if="currentDog">
      <h3>{{ currentDog.level === recommendLevel ? copy.chooseDog.whyRecommended : copy.chooseDog.whyNotRecommended }}</h3>
      <p>{{ currentDog.reason }}</p>
    </div>


    <!-- 🐶 狗狗列表 -->
    <section class="grid">
      <div
        v-for="dog in translatedDogs"
        :key="dog.id"
        class="dog-card"
        :class="{
          recommended: dog.level === recommendLevel,
          selected: selectedDogId === dog.id
        }"
        @click="selectDog(dog)"
      >
        <img :src="dog.img" />
        <span v-if="dog.level === recommendLevel" class="recommended-badge">
          {{ copy.chooseDog.recommendedBadge }}
        </span>
        <p>{{ dog.name }}</p>
      </div>
    </section>

    <!-- ✅ 确认按钮 -->
    <div class="footer">
      <button
        :disabled="!selectedDogId"
        @click="confirmDog"
      >
        {{ copy.chooseDog.confirm }}
      </button>
    </div>

  </div>
</template>


<script>
import { i18nState, langData } from '@/i18n'
import LanguageToggle from '@/components/LanguageToggle.vue'

export default {
  name: 'ChooseDog',

  components: {
    LanguageToggle
  },

  data() {
    return {
      recommendLevel: '',
      recommendText: '',
      selectedDogId: null,
      currentDog: null,
      dogs: [
        { id: 1, img: require('@/assets/dogs/dog01.jpg'), level: 'mid' },
        { id: 2, img: require('@/assets/dogs/dog02.jpg'), level: 'mid' },
        { id: 3, img: require('@/assets/dogs/dog03.jpg'), level: 'high' },
        { id: 4, img: require('@/assets/dogs/dog04.jpg'), level: 'high' },
        { id: 5, img: require('@/assets/dogs/dog05.jpg'), level: 'high' },
        { id: 6, img: require('@/assets/dogs/dog06.jpg'), level: 'high' },
        { id: 7, img: require('@/assets/dogs/dog07.jpg'), level: 'mid' },
        { id: 8, img: require('@/assets/dogs/dog08.jpg'), level: 'mid' },
        { id: 9, img: require('@/assets/dogs/dog09.jpg'), level: 'low' },
        { id: 10, img: require('@/assets/dogs/dog10.jpg'), level: 'low' },
        { id: 11, img: require('@/assets/dogs/dog11.jpg'), level: 'low' },
        { id: 12, img: require('@/assets/dogs/dog12.jpg'), level: 'low' },
        { id: 13, img: require('@/assets/dogs/dog13.jpg'), level: 'mid' },
        { id: 14, img: require('@/assets/dogs/dog14.jpg'), level: 'low' },
        { id: 15, img: require('@/assets/dogs/dog15.jpg'), level: 'high' },
        { id: 16, img: require('@/assets/dogs/dog16.jpg'), level: 'high' },
        { id: 17, img: require('@/assets/dogs/dog17.jpg'), level: 'high' },
        { id: 18, img: require('@/assets/dogs/dog18.jpg'), level: 'mid' }
      ]
    }
  },

  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    },
    translatedDogs() {
      return this.dogs.map(dog => ({
        ...dog,
        ...this.copy.chooseDog.dogs[dog.id]
      }))
    }
  },

  created() {
    const level = localStorage.getItem('dogTestLevel')
    if (level) {
      this.recommendLevel = level
      this.dogs = [
      ...this.dogs.filter(d => d.level === level),
      ...this.dogs.filter(d => d.level !== level)
      ]
      this.dogs.sort((a, b) => {
        if (a.level === level && b.level !== level) return -1
        if (a.level !== level && b.level === level) return 1
      return 0
     })
     if (level === 'high') {
      this.recommendText = this.copy.chooseDog.recommendTips.high
     } else if (level === 'mid') {
      this.recommendText = this.copy.chooseDog.recommendTips.mid
     } else {
      this.recommendText = this.copy.chooseDog.recommendTips.low
     }
    }
  },

  methods: {
    selectDog(dog) {
      this.selectedDogId = dog.id
      this.currentDog = {
        ...dog,
        reason: dog.reason.good
      }
      localStorage.setItem('tempDog', JSON.stringify(dog))
      this.$router.push('/dog-detail')
      
    },
    confirmDog() {
      const dog = this.translatedDogs.find(d => d.id === this.selectedDogId)
      localStorage.setItem('myDog', JSON.stringify(dog))

      // ⭐ 新增：记录开始日期
      localStorage.setItem('startDate', new Date().toISOString())

      this.$router.push('/my-dog')
    }
  }
}
</script>

<style scoped>
.page {
  padding-bottom: calc(150px + env(safe-area-inset-bottom));
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px;
}

.dog-card {
  cursor: pointer;
}

.dog-card img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 8px;
}

.dog-card p {
  text-align: center;
  margin-top: 6px;
}

.selected {
  outline: 3px solid #42b983;
  border-radius: 8px;
}

.footer {
  position: fixed;
  bottom: calc(var(--tab-bar-height, 60px) + env(safe-area-inset-bottom));
  left: 0;
  right: 0;
  z-index: 700;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 12px;
  box-sizing: border-box;
}

.footer button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 8px;
}

.footer button:disabled {
  background: #ccc;
}

.recommended {
  border: 3px solid #4caf50;
  position: relative;
}

.recommended-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #4caf50;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

</style>
