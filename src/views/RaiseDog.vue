<template>
  <div class="raise-page">
    <LanguageToggle />
    <img :src="dogImage" class="dog-img" />
    <p class="dog-mood">{{ copy.raiseDog.moodLabel }}{{ dogMoodText }}</p>
    <p class="tip">
      {{ copy.raiseDog.tip }}
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
    <div v-if="showSuccess" class="success">
      {{ copy.raiseDog.success }}
    </div>
    <!-- 🐶 我的狗 -->
    <div class="dog-header" v-if="dog">
      <img :src="dog.img" class="dog-avatar" />
      <h2>{{ dogName }}</h2>
      <p class="days">{{ format(copy.raiseDog.daysTogether, { days: daysTogether }) }}</p>
    </div>

    <!-- 🔔 今日养狗提醒 -->
    <div class="card">
      <h3>{{ copy.raiseDog.reminderTitle }}</h3>
      <ul>
        <li
          v-for="reminder in copy.raiseDog.reminders"
          :key="reminder"
        >
          {{ reminder }}
        </li>
      </ul>
    </div>

    <!-- ✅ 今日打卡 -->
    <div class="card">
      <h3>{{ copy.raiseDog.checkinTitle }}</h3>

      <div class="check-item" @click="toggleCare('feed')">
        <span>{{ careStatus.feed ? '☑' : '☐' }}</span>
        <span>{{ copy.raiseDog.checkItems.feed }}</span>
      </div>

      <div class="check-item" @click="toggleCare('walk')">
        <span>{{ careStatus.walk ? '☑' : '☐' }}</span>
        <span>{{ copy.raiseDog.checkItems.walk }}</span>
      </div>

      <div class="check-item" @click="toggleCare('play')">
        <span>{{ careStatus.play ? '☑' : '☐' }}</span>
        <span>{{ copy.raiseDog.checkItems.play }}</span>
      </div>
    </div>

    <!-- 🎉 打卡完成反馈 -->
    <p
      v-if="isAllDone"
      class="done-text"
    >
      {{ copy.raiseDog.doneText }}
    </p>

    <!-- 🏆 连续照顾天数 -->
    <p v-if="streakDays > 0" class="streak-text">
      {{ format(copy.raiseDog.streakText, { days: streakDays }) }}
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
      <h3>{{ copy.raiseDog.adviceTitle }}</h3>
      <p>{{ careTip }}</p>
    </div>

    <!-- 🐾 成长记录 -->
    <div class="growth-box">
      <h3 class="growth-title">{{ copy.raiseDog.growthTitle }}</h3>

      <ul class="growth-list">
        <li
          v-for="item in growthRecords"
          :key="item.day"
          class="growth-item"
        >
          <div class="record-main">
            <span class="day">{{ format(copy.raiseDog.dayLabel, { day: item.day }) }}</span>
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
import { formatMessage, i18nState, langData } from '@/i18n'
import LanguageToggle from '@/components/LanguageToggle.vue'

export default {
  name: 'RaiseDog',

  components: {
    LanguageToggle
  },

  data() {
    return {
      dog: null,
      startDate: '',
      daysTogether: 0,
      careStatus: {
          feed: false,
          walk: false,
          play: false
        },
        dogMood: 'sad',
      streakDays: 0,
      lastDoneDate: '',
      returnTipKey: '',
      showSuccess: false
    }
  },
  computed: {
    lang() {
      return i18nState.lang
    },
    copy() {
      return langData[this.lang]
    },
    dogMoodText() {
      return this.copy.common.moods[this.dogMood]
    },
    dogName() {
      if (!this.dog) return ''
      return this.copy.chooseDog.dogs[this.dog.id]?.name || this.dog.name
    },
    careTip() {
      if (!this.dog) return ''

      if (this.dog.level === 'low') {
        return this.copy.raiseDog.careTips.low
      }
      if (this.dog.level === 'mid') {
        return this.copy.raiseDog.careTips.mid
      }
      if (this.dog.level === 'high') {
        return this.copy.raiseDog.careTips.high
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
        return this.copy.raiseDog.streakTips.day1
      }
      if (this.streakDays === 3) {
        return this.copy.raiseDog.streakTips.day3
      }
      if (this.streakDays === 7) {
        return this.copy.raiseDog.streakTips.day7
      }
      if (this.streakDays === 30) {
        return this.copy.raiseDog.streakTips.day30
      }

      if (this.streakDays > 1 && this.streakDays < 7) {
        return this.format(this.copy.raiseDog.streakTips.under7, { days: this.streakDays })
      }

      if (this.streakDays > 7 && this.streakDays < 30) {
        return this.format(this.copy.raiseDog.streakTips.under30, { days: this.streakDays })
      }

      if (this.streakDays > 30) {
        return this.copy.raiseDog.streakTips.over30
      }

      return ''
    },

    welcomeText() {
      const hour = new Date().getHours()

      // 第一次来（还没开始）
      if (!this.streakDays) {
        return this.getRandom(this.copy.raiseDog.welcome.first)
      }

      // ❗还没完成今天任务
      if (!this.isAllDone) {
        if (hour < 12) {
          return this.getRandom(this.copy.raiseDog.welcome.morningWaiting)
        }

        if (hour < 18) {
          return this.getRandom(this.copy.raiseDog.welcome.afternoonWaiting)
        }

        return this.getRandom(this.copy.raiseDog.welcome.eveningWaiting)
      }

      // ✅ 已完成今天任务
      if (hour < 12) {
        return this.getRandom(this.copy.raiseDog.welcome.morningDone)
      }

      if (hour < 18) {
        return this.getRandom(this.copy.raiseDog.welcome.afternoonDone)
      }

      return this.getRandom(this.copy.raiseDog.welcome.eveningDone)
    },

    milestoneTip() {
      if (this.streakDays === 7) {
        return this.copy.raiseDog.milestones.day7
      }

      if (this.streakDays === 30) {
        return this.copy.raiseDog.milestones.day30
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
        return this.copy.raiseDog.missedTip
      }

      return ''
    },
    returnTip() {
      return this.returnTipKey ? this.copy.raiseDog.returnTips[this.returnTipKey] : ''
    },

    dailyEvent() {
      const today = new Date().toISOString().slice(0, 10)
      const key = 'eventIndex_' + today

      let eventIndex = localStorage.getItem(key)

      if (!eventIndex) {
        eventIndex = Math.floor(Math.random() * this.copy.raiseDog.dailyEvents.length)
        localStorage.setItem(key, eventIndex)
      }

      return this.copy.raiseDog.dailyEvents[Number(eventIndex)]
    },

    growthRecords() {
      const records = []

      if (this.startDate) {
        records.push({
          day: 1,
          text: this.copy.raiseDog.growthRecords.day1.text,
          dogSay: this.copy.raiseDog.growthRecords.day1.dogSay,
          highlight: this.isFirstTime(1)
        })
      }

      if (this.streakDays >= 7) {
        records.push({
          day: 7,
          text: this.copy.raiseDog.growthRecords.day7.text,
          dogSay: this.copy.raiseDog.growthRecords.day7.dogSay,
          highlight: this.isFirstTime(7)
        })
      }

      if (this.streakDays >= 30) {
        records.push({
          day: 30,
          text: this.copy.raiseDog.growthRecords.day30.text,
          dogSay: this.copy.raiseDog.growthRecords.day30.dogSay,
          highlight: this.isFirstTime(30)
        })
      }

      return records
    },
    dogImage() {
      if (this.dogMood === 'happy') {
        return require('@/assets/raise/happy.png')
      } else if (this.dogMood === 'normal') {
        return require('@/assets/raise/normal.png')
      } else {
        return require('@/assets/raise/sad.png')
      }
    }

  },
  created() {
    const savedDog = localStorage.getItem('myDog')
    const startDate = localStorage.getItem('startDate')

    if (savedDog) {
      this.dog = JSON.parse(savedDog)
    }

    if (startDate) {
      this.startDate = startDate
      const start = new Date(startDate)
      const now = new Date()
      const diffTime = now - start
      this.daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
    }

    this.loadCareStatus()
    this.updateDogMood()

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
          this.returnTipKey = 'long'
        } else {
          this.returnTipKey = 'short'
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
    format(template, values) {
      return formatMessage(template, values)
    },
    updateDogMood() {
      const { feed, walk, play } = this.careStatus

      const count = [feed, walk, play].filter(v => v).length

      if (count === 3) {
        this.dogMood = 'happy'
      } else if (count === 2) {
        this.dogMood = 'normal'
      } else if (count === 1) {
        this.dogMood = 'bored'
      } else {
        this.dogMood = 'sad'
      }
    },
    toggleCare(type) {
      this.careStatus[type] = !this.careStatus[type]
      // 👉 判断是否全部完成
      const allDone = 
        this.careStatus.feed &&
        this.careStatus.walk &&
        this.careStatus.play

      if (allDone) {
        const today = new Date().toDateString()
        const yesterday = new Date(Date.now() - 86400000).toDateString()

        const lastDate = localStorage.getItem('lastFedDate')
        let streak = parseInt(localStorage.getItem('streak')) || 0

        if (lastDate === yesterday) {
          streak += 1
        } else if (lastDate === today) {
          // 今天已经算过，不重复加
        } else {
          streak = 1
        }

        localStorage.setItem('streak', streak)
        localStorage.setItem('lastFedDate', today)

        // 🔥 新增：提示
        this.showSuccess = true

        setTimeout(() => {
          this.showSuccess = false
        }, 2000)
      }

      this.saveCareStatus()
      this.checkStreak()
      this.updateDogMood()
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
  padding: 16px 16px calc(96px + env(safe-area-inset-bottom));
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

.dog-mood {
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
  color: #333;
}

.success {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 12px 20px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  font-size: 16px;
  animation: fade 2s;
}

@keyframes fade {
  0% { opacity: 0; transform: translate(-50%, -10px); }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -20px); }
}

.dog-img {
  width: 120px;
  display: block;
  margin: 10px auto;
}
</style>
