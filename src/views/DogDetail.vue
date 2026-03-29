<template>
  <div class="page" v-if="dog">
    <img :src="dog.img" class="dog-img" />

    <h2>{{ dog.name }}</h2>

    <p class="level">
      推荐等级：
      <strong>
        {{
          dog.level === 'low'
            ? '新手友好'
            : dog.level === 'mid'
            ? '需要一定经验'
            : '高挑战'
        }}
      </strong>
    </p>

    <div class="reason-box">
      <h3>
        {{
          dog.level === recommendLevel
            ? '为什么推荐你养它？'
            : '为什么不太推荐你养它？'
        }}
      </h3>
      <p>{{ dog.reason }}</p>
    </div>

    <button class="confirm" @click="confirmDog">
      选这只狗
    </button>
  </div>
</template>

<script>
export default {
  name: 'DogDetail',
  data() {
    return {
      dog: null,
      recommendLevel: ''
    }
  },
  created() {
    const dogStr = localStorage.getItem('tempDog')
    const level = localStorage.getItem('dogTestLevel')

    if (dogStr) {
      this.dog = JSON.parse(dogStr)
    }
    if (level) {
      this.recommendLevel = level
    }
  },
  methods: {
    confirmDog() {
      localStorage.setItem('myDog', JSON.stringify(this.dog))
      localStorage.setItem('startDate', new Date().toISOString())
      this.$router.push('/my-dog')
    }
  }
}
</script>
