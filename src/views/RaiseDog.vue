<template>
  <div class="raise-page">
    <p class="tip">
      🐶 每一次陪伴，都是在学习如何不放弃一只狗
    </p>
    <p v-if="returnTip" class="return-tip">
      {{ returnTip }}
    </p>
    <p v-if="missedTip" class="missed-tip">
      {{ missedTip }}
    </p>
    <p class="dog-welcome">
      🐶 {{ welcomeText }}
    </p>
    <p class="daily-event">
      {{ dailyEvent }}
    </p>
    <!-- 🐶 我的狗 -->
    <div class="dog-header" v-if="dog">
      <img :src="dog.img" class="dog-avatar" />
      <h2>{{ dog.name }}</h2>
      <p class="days">我们已经在一起第 {{ daysTogether }} 天</p>
    </div>

    <!-- 🔔 今日养狗提醒 -->
    <div class="card">
      <h3>🐾 今日养狗提醒</h3>
      <ul>
        <li>🍖 今天记得按时喂食</li>
        <li>🚶 至少一次户外活动</li>
        <li>🧼 观察是否需要清洁</li>
        <li>🩺 留意精神和食欲状态</li>
      </ul>
    </div>

    <!-- ✅ 今日打卡 -->
    <div class="card">
      <h3>✅ 今日打卡</h3>

      <div class="check-item" @click="toggleCare('feed')">
        <span>{{ careStatus.feed ? '☑' : '☐' }}</span>
        <span>🍖 今天喂食了</span>
      </div>

      <div class="check-item" @click="toggleCare('walk')">
        <span>{{ careStatus.walk ? '☑' : '☐' }}</span>
        <span>🚶 今天运动了</span>
      </div>

      <div class="check-item" @click="toggleCare('play')">
        <span>{{ careStatus.play ? '☑' : '☐' }}</span>
        <span>🎾 今天陪伴互动</span>
      </div>
    </div>

    <!-- 🎉 打卡完成反馈 -->
    <p
      v-if="isAllDone"
      class="done-text"
    >
      🐶 你今天把狗照顾得很好！
    </p>

    <!-- 🏆 连续照顾天数 -->
    <p v-if="streakDays > 0" class="streak-text">
      🏆 你已经连续照顾狗狗 {{ streakDays }} 天了
    </p>

    <!-- 🏆 里程碑专属反馈（优先） -->
    <p v-if="milestoneTip" class="milestone-tip">
      {{ milestoneTip }}
    </p>

    <!-- 🌱 普通阶段鼓励 -->
    <p v-else-if="streakTip" class="streak-tip">
      {{ streakTip }}
    </p>

    <!-- 💡 养狗小建议 -->
    <div class="card">
      <h3>📘 养狗小建议</h3>
      <p>{{ careTip }}</p>
    </div>

    <!-- 🐾 成长记录 -->
    <div class="growth-box">
      <h3 class="growth-title">🐾 成长记录</h3>

      <ul class="growth-list">
        <li
          v-for="item in growthRecords"
          :key="item.day"
          class="growth-item"
        >
          <div class="record-main">
            <span class="day">第 {{ item.day }} 天</span>
            <span class="text">{{ item.text }}</span>
          </div>

          <div
            class="dog-say"
            :class="{ highlight: item.highlight }"
          >
            {{ item.dogSay }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaiseDog',
  data() {
    return {
      dog: null,
      daysTogether: 0,
      careStatus: {
        feed: false,
        walk: false,
        play: false
      },
      streakDays: 0,
      lastDoneDate: '',
      returnTip: ''
    }
  },
  computed: {
    careTip() {
      if (!this.dog) return ''

      if (this.dog.level === 'low') {
        return '这类狗狗对新手非常友好，保持规律作息就好。'
      }
      if (this.dog.level === 'mid') {
        return '建议每天安排固定的陪伴和互动时间。'
      }
      if (this.dog.level === 'high') {
        return '精力充沛，记得多运动、多互动，避免无聊。'
      }
      return ''
    },

    isAllDone() {
      return (
        this.careStatus.feed &&
        this.careStatus.walk &&
        this.careStatus.play
      )
    },

    streakTip() {
      if (this.streakDays === 0) return ''

      if (this.streakDays === 1) {
        return '很好！你已经迈出了照顾狗狗的第一步 🐾'
      }
      if (this.streakDays === 3) {
        return '你已经开始建立稳定的照顾习惯了 😊'
      }
      if (this.streakDays === 7) {
        return '太棒了！你已经坚持整整一周 🎉'
      }
      if (this.streakDays === 30) {
        return '你已经是真正的养狗达人了 🏆'
      }

      if (this.streakDays > 1 && this.streakDays < 7) {
        return `你已经连续照顾狗狗 ${this.streakDays} 天了，加油！`
      }

      if (this.streakDays > 7 && this.streakDays < 30) {
        return `坚持了 ${this.streakDays} 天，你真的很用心 🐶`
      }

      if (this.streakDays > 30) {
        return '狗狗已经把你当成最重要的人了 💛'
      }

      return ''
    },

    welcomeText() {
      const hour = new Date().getHours()

      // 第一次来（还没开始）
      if (!this.streakDays) {
        return this.getRandom([
          '你今天会来看我吗？',
          '我一直在这里等你…',
          '你会不会忘了我呀？'
        ])
      }

      // ❗还没完成今天任务
      if (!this.isAllDone) {
        if (hour < 12) {
          return this.getRandom([
            '早上好，我在等你带我开始一天 🐾',
            '你醒了吗？我已经在等你了',
            '今天可以早点陪我吗？'
          ])
        }

        if (hour < 18) {
          return this.getRandom([
            '下午有点无聊…要不要陪我一下？',
            '你今天好像还没怎么陪我',
            '我一直在等你回来…'
          ])
        }

        return this.getRandom([
          '已经晚上了，我还在等你…',
          '今天还没结束，你会来吗？',
          '我有点想你了…'
        ])
      }

      // ✅ 已完成今天任务
      if (hour < 12) {
        return this.getRandom([
          '今天一早就见到你，真好 ☀️',
          '有你陪我开始一天，好安心',
          '今天一定会是开心的一天！'
        ])
      }

      if (hour < 18) {
        return this.getRandom([
          '下午和你在一起，很安心 😊',
          '有你陪着，我一点都不无聊',
          '今天的时光好舒服啊'
        ])
      }

      return this.getRandom([
        '今天能陪你到晚上，好幸福 🌙',
        '和你在一起的一天结束了，好满足',
        '明天也要见到你，好吗？'
      ])
    },

    milestoneTip() {
      if (this.streakDays === 7) {
        return '🎉 连续 7 天！你已经建立起照顾狗狗的稳定习惯了'
      }

      if (this.streakDays === 30) {
        return '🏆 连续 30 天！你已经是真正意义上的养狗人了'
      }

      return ''
    },

    missedTip() {
      const last = localStorage.getItem('lastVisitDate')
      const today = new Date().toISOString().slice(0, 10)

      if (!last) return ''

      const diff =
        (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24)

      if (diff >= 1) {
        return '🐶 昨天你没来，我等了你很久…'
      }

      return ''
    },

    dailyEvent() {
      const today = new Date().toISOString().slice(0, 10)
      const key = 'event_' + today

      let event = localStorage.getItem(key)

      if (!event) {
        const events = [
          '🐶 今天它特别粘你，一直跟着你',
          '🐶 它今天看起来心情很好，一直摇尾巴',
          '🐶 它刚刚偷偷看了你好久',
          '🐶 今天它有点安静，好像在想事情',
          '🐶 它刚刚对你歪头了，好可爱'
        ]

        event = events[Math.floor(Math.random() * events.length)]
        localStorage.setItem(key, event)
      }

      return event
    },

    growthRecords() {
      const records = []

      if (this.startDate) {
        records.push({
          day: 1,
          text: '🐾 今天，你决定开始养狗',
          dogSay: '💬 我有点紧张，但我会努力相信你。',
          highlight: this.isFirstTime(1)
        })
      }

      if (this.streakDays >= 7) {
        records.push({
          day: 7,
          text: '🎉 连续 7 天，你已经建立起稳定的照顾习惯',
          dogSay: '💬 我开始记住你的味道了。',
          highlight: this.isFirstTime(7)
        })
      }

      if (this.streakDays >= 30) {
        records.push({
          day: 30,
          text: '🏆 连续 30 天，你和狗狗已经形成真正的陪伴关系',
          dogSay: '💬 原来，这就是家。',
          highlight: this.isFirstTime(30)
        })
      }

      return records
    }
  },
  created() {
    const savedDog = localStorage.getItem('myDog')
    const startDate = localStorage.getItem('startDate')

    if (savedDog) {
      this.dog = JSON.parse(savedDog)
    }

    if (startDate) {
      const start = new Date(startDate)
      const now = new Date()
      const diffTime = now - start
      this.daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
    }

    this.loadCareStatus()

    this.streakDays = Number(localStorage.getItem('streakDays')) || 0
    this.lastDoneDate = localStorage.getItem('lastDoneDate') || ''

    const today = new Date().toISOString().slice(0, 10)
    localStorage.setItem('lastVisitDate', today)

    const lastExit = localStorage.getItem('lastExitTime')
    const now = Date.now()

    if (lastExit) {
      const diffHours = (now - lastExit) / (1000 * 60 * 60)

      if (!localStorage.getItem('return_seen')) {
        if (diffHours >= 6) {
          this.returnTip = '🐶 你终于回来了，我等了你好久…'
        } else {
          this.returnTip = '🐶 你回来啦，我刚刚还在想你'
        }
        localStorage.setItem('return_seen', 'true')
      }
    }
  },

  mounted() {
    if (!window._exitListenerAdded) {
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('lastExitTime', Date.now())
      })
      window._exitListenerAdded = true
    }
  },

  methods: {
    toggleCare(type) {
      this.careStatus[type] = !this.careStatus[type]
      this.saveCareStatus()
      this.checkStreak()
    },

    checkStreak() {
      if (!this.isAllDone) return

      const today = new Date().toISOString().slice(0, 10)

      if (!this.lastDoneDate) {
        this.streakDays = 1
      } else {
        const last = new Date(this.lastDoneDate)
        const now = new Date(today)
        const diffDays = (now - last) / (1000 * 60 * 60 * 24)

        if (diffDays === 1) {
          this.streakDays += 1
        } else if (diffDays > 1) {
          this.streakDays = 1
        }
      }

      this.lastDoneDate = today
      localStorage.setItem('streakDays', this.streakDays)
      localStorage.setItem('lastDoneDate', this.lastDoneDate)
    },

    saveCareStatus() {
      const today = new Date().toISOString().slice(0, 10)
      localStorage.setItem(
        'care_' + today,
        JSON.stringify(this.careStatus)
      )
    },

    loadCareStatus() {
      const today = new Date().toISOString().slice(0, 10)
      const saved = localStorage.getItem('care_' + today)
      if (saved) {
        this.careStatus = JSON.parse(saved)
      }
    },

    isFirstTime(day) {
      const key = 'seen_' + day
      const seen = localStorage.getItem(key)

      if (!seen) {
        localStorage.setItem(key, 'true')
        return true
      }

      return false
    },

    getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
  }
}
</script>

<style scoped>
.raise-page {
  padding: 16px;
}

.dog-header {
  text-align: center;
  margin-bottom: 20px;
}

.dog-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.days {
  color: #666;
  font-size: 14px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.card h3 {
  margin-bottom: 8px;
}

.card ul {
  padding-left: 16px;
}

.card li {
  margin-bottom: 6px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  padding: 8px 0;
  cursor: pointer;
}

.done-text {
  text-align: center;
  margin-top: 12px;
  color: #42b983;
  font-weight: bold;
}

.streak-text {
  text-align: center;
  margin-top: 6px;
  color: #f59e0b;
  font-weight: bold;
}

.streak-tip {
  text-align: center;
  margin-top: 4px;
  color: #6b7280;
  font-size: 14px;
}

.milestone-tip {
  text-align: center;
  margin-top: 6px;
  font-size: 15px;
  font-weight: 600;
  color: #16a34a;
}

.growth-box {
  margin-top: 20px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.growth-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.growth-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.growth-item {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
}

.day {
  color: #64748b;
  white-space: nowrap;
}

.text {
  color: #334155;
}

.record-main {
  display: flex;
  gap: 8px;
}

.dog-say {
  margin-left: 36px;
  margin-top: 4px;
  font-size: 12px;
  color: #64748b;
  font-style: italic;
}

.dog-say.highlight {
  color: #16a34a;
  font-weight: 600;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dog-welcome {
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #334155;
}

.missed-tip {
  text-align: center;
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 6px;
}

.daily-event {
  text-align: center;
  font-size: 13px;
  color: #6366f1;
  margin-bottom: 8px;
}

.return-tip {
  text-align: center;
  font-size: 13px;
  color: #0ea5e9;
  margin-bottom: 6px;
}

.tip {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>