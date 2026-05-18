<template>
  <div class="page" v-if="dog">
    <img :src="dog.img" class="dog-img" />

    <h2>{{ dogName }}</h2>

    <p class="level">
      {{ copy.dogDetail.levelLabel }}
      <strong>
        {{ copy.dogDetail.levels[dog.level] }}
      </strong>
    </p>

    <div class="reason-box">
      <h3>
        {{ dog.level === recommendLevel ? copy.dogDetail.whyRecommended : copy.dogDetail.whyNotRecommended }}
      </h3>
      <p>{{ reasonText }}</p>
    </div>

    <button class="confirm" @click="confirmDog">
      {{ copy.dogDetail.confirm }}
    </button>
  </div>
</template>

<script>
import { i18nState, langData } from '@/i18n'

export default {
  name: 'DogDetail',
  data() {
    return {
      dog: null,
      recommendLevel: ''
    }
  },
  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    },
    dogName() {
      return this.copy.chooseDog.dogs[this.dog.id]?.name || this.dog.name
    },
    reasonText() {
      const reason = this.copy.chooseDog.dogs[this.dog.id]?.reason
      if (!reason) return this.dog.reason
      return this.dog.level === this.recommendLevel ? reason.good : reason.bad
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
      localStorage.setItem('myDog', JSON.stringify({
        ...this.dog,
        name: this.dogName,
        reason: this.reasonText
      }))
      localStorage.setItem('startDate', new Date().toISOString())
      this.$router.push('/my-dog')
    }
  }
}
</script>
