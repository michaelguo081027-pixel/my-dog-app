<template>
  <div class="my-dog">
    <h2>我的狗狗</h2>

    <div v-if="dog">
      <img :src="dog.img" />
      <p class="name">{{ dog.name }}</p>

      <p class="story">
        我和 {{ dog.name }} 的第一天
      </p>

      <p class="days">
        你和 {{ dog.name }} 已经第 {{ daysTogether }} 天了
      </p>


      <textarea
        v-model="firstDayNote"
        placeholder="记录一下你们的第一天吧…"
      ></textarea>

      <button @click="saveFirstDay">
        保存记录
      </button>

    </div>

    <div v-else>
      <p>还没有选择狗狗</p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MyDog',

  data() {
    return {
      dog: null,
      firstDayNote: '',
      daysTogether: 1
    }
  },

  methods: {
    startDay() {
      alert('第一天已经开始了 🐾')
    },

    saveFirstDay() {
      localStorage.setItem('firstDayNote', this.firstDayNote)
      alert('已保存 🐾')
    }
  },

  created() {
    const savedDog = localStorage.getItem('myDog')
    if (savedDog) {
      this.dog = JSON.parse(savedDog)
    }

    const savedNote = localStorage.getItem('firstDayNote')
    if (savedNote) {
      this.firstDayNote = savedNote
    }

    const startDate = localStorage.getItem('startDate')
    if (startDate) {
      const start = new Date(startDate)
      const now = new Date()
      const diffTime = now - start
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      this.daysTogether = diffDays + 1
    }
  }
}
</script>



<style scoped>
.my-dog {
  padding: 24px;
  text-align: center;
}

.my-dog img {
  width: 300px;
  max-width: 100%;
  border-radius: 12px;
  margin: 16px 0;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

.story {
  margin: 12px 0;
  color: #555;
}

button {
  padding: 10px 16px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
}

.days {
  margin: 8px 0;
  color: #42b983;
  font-weight: bold;
}

</style>
