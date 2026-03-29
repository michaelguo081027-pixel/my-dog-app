<template>
  <div class="page">

    <!-- ⭐ 推荐提示文案 -->
    <p v-if="recommendLevel === 'low'" class="recommend-tip">
      👉 推荐：性格温和、好打理的狗狗
    </p>
    <p v-if="recommendLevel === 'mid'" class="recommend-tip">
      👉 推荐：适合家庭饲养的狗狗
    </p>
    <p v-if="recommendLevel === 'high'" class="recommend-tip">
      👉 推荐：精力充沛、互动性强的狗狗
    </p>

    <!-- 推荐 / 不推荐说明 -->
    <div class="reason-box" v-if="currentDog">
      <h3>为什么{{ currentDog.level === recommendLevel ? '推荐' : '不太推荐' }}这只狗？</h3>
      <p>{{ currentDog.reason }}</p>
    </div>


    <!-- 🐶 狗狗列表 -->
    <section class="grid">
      <div
        v-for="dog in dogs"
        :key="dog.id"
        class="dog-card"
        :class="{
          recommended: dog.level === recommendLevel,
          selected: selectedDogId === dog.id
        }"
        @click="selectDog(dog)"
      >
        <img :src="dog.img" />
        <p>{{ dog.name }}</p>
      </div>
    </section>

    <!-- ✅ 确认按钮 -->
    <div class="footer">
      <button
        :disabled="!selectedDogId"
        @click="confirmDog"
      >
        确认选择
      </button>
    </div>

  </div>
</template>


<script>
export default {
  name: 'ChooseDog',

  data() {
    return {
      recommendLevel: '',
      recommendText: '',
      selectedDogId: null,
      currentDog: null,
      dogs: [
        {
          id: 1,
          name: '金毛',
          img: require('@/assets/dogs/dog01.jpg'),
          level: 'mid',
          reason: {
            good: '性格温顺、亲人友好，适合家庭饲养，新手也容易上手',
            bad: '掉毛较多，需要经常梳理和一定运动量'
          }
        },
        {
          id: 2,
          name: '拉布拉多',
          img: require('@/assets/dogs/dog02.jpg'),
          level: 'mid',
          reason: {
            good: '聪明听话、服从性强，适合陪伴和训练',
            bad: '精力旺盛，需要每天稳定遛狗'
          }
        },
        {
          id: 3,
          name: '哈士奇',
          img: require('@/assets/dogs/dog03.jpg'),
          level: 'high',
          reason: {
            good: '活泼外向，互动性强，适合喜欢运动的人',
            bad: '拆家概率高，新手和忙碌人群不友好'
          }
        },
        {
          id: 4,
          name: '阿拉斯加',
          img: require('@/assets/dogs/dog04.jpg'),
          level: 'high',
          reason: {
            good: '外形帅气，性格忠诚稳重',
            bad: '体型大、食量高，对空间和体力要求高'
          }
        },
        {
          id: 5,
          name: '德国牧羊犬',
          img: require('@/assets/dogs/dog05.jpg'),
          level: 'high',
          reason: {
            good: '智商高、护主性强，适合有经验的饲养者',
            bad: '需要系统训练，不适合完全新手'
          }
        },
        {
          id: 6,
          name: '边境牧羊犬',
          img: require('@/assets/dogs/dog06.jpg'),
          level: 'high',
          reason: {
            good: '世界顶级智商，学习能力极强',
            bad: '精力过剩，运动不足容易焦虑'
          }
        },
        {
          id: 7,
          name: '柴犬',
          img: require('@/assets/dogs/dog07.jpg'),
          level: 'mid',
          reason: {
            good: '干净独立，体型适中，城市友好',
            bad: '性格倔强，服从性一般'
          }
        },
        {
          id: 8,
          name: '柯基',
          img: require('@/assets/dogs/dog08.jpg'),
          level: 'mid',
          reason: {
            good: '性格活泼，亲人爱互动',
            bad: '腰椎较脆弱，需要控制体重'
          }
        },
        {
          id: 9,
          name: '贵宾',
          img: require('@/assets/dogs/dog09.jpg'),
          level: 'low',
          reason: {
            good: '不易掉毛，聪明好训练，适合新手',
            bad: '需要定期美容护理'
          }
        },
        {
          id: 10,
          name: '比熊',
          img: require('@/assets/dogs/dog10.jpg'),
          level: 'low',
          reason: {
            good: '性格温和可爱，陪伴感强',
            bad: '毛发护理成本较高'
          }
        },
        {
          id: 11,
          name: '博美',
          img: require('@/assets/dogs/dog11.jpg'),
          level: 'low',
          reason: {
            good: '体型小，适合公寓饲养',
            bad: '容易叫，需要训练'
          }
        },
        {
          id: 12,
          name: '吉娃娃',
          img: require('@/assets/dogs/dog12.jpg'),
          level: 'low',
          reason: {
            good: '饲养成本低，占用空间小',
            bad: '性格敏感，对环境变化较敏感'
          }
        },
        {
          id: 13,
          name: '法斗',
          img: require('@/assets/dogs/dog13.jpg'),
          level: 'mid',
          reason: {
            good: '运动需求低，适合上班族',
            bad: '呼吸道较弱，夏天需注意'
          }
        },
        {
          id: 14,
          name: '巴哥',
          img: require('@/assets/dogs/dog14.jpg'),
          level: 'low',
          reason: {
            good: '性格憨厚，陪伴型犬种',
            bad: '容易肥胖，需要控制饮食'
          }
        },
        {
          id: 15,
          name: '萨摩耶',
          img: require('@/assets/dogs/dog15.jpg'),
          level: 'high',
          reason: {
            good: '性格友善，外形颜值高',
            bad: '掉毛严重，运动需求大'
          }
        },
        {
          id: 16,
          name: '秋田',
          img: require('@/assets/dogs/dog16.jpg'),
          level: 'high',
          reason: {
            good: '忠诚度高，看家能力强',
            bad: '性格独立，不适合新手'
          }
        },
        {
          id: 17,
          name: '罗威纳',
          img: require('@/assets/dogs/dog17.jpg'),
          level: 'high',
          reason: {
            good: '护主能力强，安全感高',
            bad: '需要经验和稳定训练'
          }
        },
        {
          id: 18,
          name: '松狮',
          img: require('@/assets/dogs/dog18.jpg'),
          level: 'mid',
          reason: {
            good: '性格安静，适合安稳生活',
            bad: '服从性较低，护理较麻烦'
          }
        }
      ]
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
      this.recommendText = '✅ 非常适合你，精力、时间与饲养难度都匹配'
     } else if (level === 'mid') {
      this.recommendText = '🟡 可以考虑，但需要一定时间和精力投入'
     } else {
      this.recommendText = '⚠️ 对新手不太友好，需要谨慎选择'
     }
    }
  },

  methods: {
    selectDog(dog) {
      localStorage.setItem('tempDog', JSON.stringify(dog))
      this.$router.push('/dog-detail')
      
    },
    confirmDog() {
      const dog = this.dogs.find(d => d.id === this.selectedDogId)
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
  padding-bottom: 90px;
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
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 12px;
}

button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 8px;
}

button:disabled {
  background: #ccc;
}

.recommended {
  border: 3px solid #4caf50;
  position: relative;
}

.recommended::after {
  content: '推荐';
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
