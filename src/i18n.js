import Vue from 'vue'

const savedLang = localStorage.getItem('lang')

export const i18nState = Vue.observable({
  lang: savedLang === 'en' ? 'en' : 'zh'
})

export function toggleLang() {
  i18nState.lang = i18nState.lang === 'zh' ? 'en' : 'zh'
  localStorage.setItem('lang', i18nState.lang)
}

export function formatMessage(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '')
}

export const langData = {
  zh: {
    common: {
      languageButton: 'EN',
      languageAriaLabel: '切换到英文',
      days: '天',
      mood: '当前状态',
      moods: {
        sad: '😢 很难过',
        bored: '😐 有点无聊',
        normal: '🙂 还不错',
        happy: '😄 非常开心'
      }
    },
    nav: {
      home: '首页',
      chooseDog: '选狗',
      raiseDog: '养狗',
      rules: '规则'
    },
    app: {
      raiseDog: '🐶 养狗',
      chooseDog: '🐕 选狗',
      rules: '📖 规则'
    },
    home: {
      status: '已陪伴狗狗',
      streak: '已连续照顾',
      share: '📷 分享我的养狗记录',
      mainText: [
        '每一只被遗弃的狗，',
        '都曾经相信过人类。'
      ],
      bullets: [
        '我很喜欢狗狗，但我真的适合养狗吗？',
        '狗狗那么多，我应该养哪一种？',
        '狗狗好养吗？养好一只狗需要注意什么？'
      ],
      cards: [
        '我适合养狗吗？（⬆这里有答案）',
        '这么多狗，我该选哪一种？（⬆在这里选最适合养的狗）',
        '养狗难不难？要注意什么？（⬆点击查看注意事项）'
      ],
      shareCard: {
        days: '🐶 我已经陪伴狗狗 {days} 天',
        streak: '🔥 连续照顾 {streak} 天',
        mood: '今天它{mood}',
        close: '关闭'
      }
    },
    chooseDog: {
      recommendTips: {
        low: '👉 推荐：性格温和、好打理的狗狗',
        mid: '👉 推荐：适合家庭饲养的狗狗',
        high: '👉 推荐：精力充沛、互动性强的狗狗'
      },
      whyRecommended: '为什么推荐这只狗？',
      whyNotRecommended: '为什么不太推荐这只狗？',
      confirm: '确认选择',
      recommendedBadge: '推荐',
      defaultReason: '点击狗狗卡片查看详情。',
      dogs: {
        1: {
          name: '金毛',
          reason: {
            good: '性格温顺、亲人友好，适合家庭饲养，新手也容易上手',
            bad: '掉毛较多，需要经常梳理和一定运动量'
          }
        },
        2: {
          name: '拉布拉多',
          reason: {
            good: '聪明听话、服从性强，适合陪伴和训练',
            bad: '精力旺盛，需要每天稳定遛狗'
          }
        },
        3: {
          name: '哈士奇',
          reason: {
            good: '活泼外向，互动性强，适合喜欢运动的人',
            bad: '拆家概率高，新手和忙碌人群不友好'
          }
        },
        4: {
          name: '阿拉斯加',
          reason: {
            good: '外形帅气，性格忠诚稳重',
            bad: '体型大、食量高，对空间和体力要求高'
          }
        },
        5: {
          name: '德国牧羊犬',
          reason: {
            good: '智商高、护主性强，适合有经验的饲养者',
            bad: '需要系统训练，不适合完全新手'
          }
        },
        6: {
          name: '边境牧羊犬',
          reason: {
            good: '世界顶级智商，学习能力极强',
            bad: '精力过剩，运动不足容易焦虑'
          }
        },
        7: {
          name: '柴犬',
          reason: {
            good: '干净独立，体型适中，城市友好',
            bad: '性格倔强，服从性一般'
          }
        },
        8: {
          name: '柯基',
          reason: {
            good: '性格活泼，亲人爱互动',
            bad: '腰椎较脆弱，需要控制体重'
          }
        },
        9: {
          name: '贵宾',
          reason: {
            good: '不易掉毛，聪明好训练，适合新手',
            bad: '需要定期美容护理'
          }
        },
        10: {
          name: '比熊',
          reason: {
            good: '性格温和可爱，陪伴感强',
            bad: '毛发护理成本较高'
          }
        },
        11: {
          name: '博美',
          reason: {
            good: '体型小，适合公寓饲养',
            bad: '容易叫，需要训练'
          }
        },
        12: {
          name: '吉娃娃',
          reason: {
            good: '饲养成本低，占用空间小',
            bad: '性格敏感，对环境变化较敏感'
          }
        },
        13: {
          name: '法斗',
          reason: {
            good: '运动需求低，适合上班族',
            bad: '呼吸道较弱，夏天需注意'
          }
        },
        14: {
          name: '巴哥',
          reason: {
            good: '性格憨厚，陪伴型犬种',
            bad: '容易肥胖，需要控制饮食'
          }
        },
        15: {
          name: '萨摩耶',
          reason: {
            good: '性格友善，外形颜值高',
            bad: '掉毛严重，运动需求大'
          }
        },
        16: {
          name: '秋田',
          reason: {
            good: '忠诚度高，看家能力强',
            bad: '性格独立，不适合新手'
          }
        },
        17: {
          name: '罗威纳',
          reason: {
            good: '护主能力强，安全感高',
            bad: '需要经验和稳定训练'
          }
        },
        18: {
          name: '松狮',
          reason: {
            good: '性格安静，适合安稳生活',
            bad: '服从性较低，护理较麻烦'
          }
        }
      }
    },
    dogTest: {
      title: '🐾 我适合养狗吗？',
      resultTitle: '测试结果',
      questions: [
        {
          title: '你每天能陪狗多长时间？',
          options: [
            { text: '少于 1 小时', score: 1 },
            { text: '1–3 小时', score: 2 },
            { text: '3 小时以上', score: 3 }
          ]
        },
        {
          title: '你是否愿意每天带狗外出？',
          options: [
            { text: '不太愿意', score: 1 },
            { text: '可以接受', score: 2 },
            { text: '非常愿意', score: 3 }
          ]
        },
        {
          title: '你对掉毛和打理的接受度？',
          options: [
            { text: '比较介意', score: 1 },
            { text: '还可以', score: 2 },
            { text: '完全不介意', score: 3 }
          ]
        }
      ],
      results: {
        low: '你目前更适合饲养安静、运动量较小、好打理的狗狗。',
        mid: '你适合大多数家庭犬，可以根据性格偏好进行选择。',
        high: '你非常适合养狗，可以考虑精力旺盛、互动性强的犬种。'
      }
    },
    dogDetail: {
      levelLabel: '推荐等级：',
      levels: {
        low: '新手友好',
        mid: '需要一定经验',
        high: '高挑战'
      },
      whyRecommended: '为什么推荐你养它？',
      whyNotRecommended: '为什么不太推荐你养它？',
      confirm: '选这只狗'
    },
    raiseDog: {
      moodLabel: '🐶 当前状态：',
      tip: '🐶 每一次陪伴，都是在学习如何不放弃一只狗',
      success: '🎉 今天狗狗超级开心！',
      daysTogether: '我们已经在一起第 {days} 天',
      reminderTitle: '🐾 今日养狗提醒',
      reminders: [
        '🍖 今天记得按时喂食',
        '🚶 至少一次户外活动',
        '🧼 观察是否需要清洁',
        '🩺 留意精神和食欲状态'
      ],
      checkinTitle: '✅ 今日打卡',
      checkItems: {
        feed: '🍖 今天喂食了',
        walk: '🚶 今天运动了',
        play: '🎾 今天陪伴互动'
      },
      doneText: '🐶 你今天把狗照顾得很好！',
      streakText: '🏆 你已经连续照顾狗狗 {days} 天了',
      adviceTitle: '📘 养狗小建议',
      growthTitle: '🐾 成长记录',
      dayLabel: '第 {day} 天',
      careTips: {
        low: '这类狗狗对新手非常友好，保持规律作息就好。',
        mid: '建议每天安排固定的陪伴和互动时间。',
        high: '精力充沛，记得多运动、多互动，避免无聊。'
      },
      streakTips: {
        day1: '很好！你已经迈出了照顾狗狗的第一步 🐾',
        day3: '你已经开始建立稳定的照顾习惯了 😊',
        day7: '太棒了！你已经坚持整整一周 🎉',
        day30: '你已经是真正的养狗达人了 🏆',
        under7: '你已经连续照顾狗狗 {days} 天了，加油！',
        under30: '坚持了 {days} 天，你真的很用心 🐶',
        over30: '狗狗已经把你当成最重要的人了 💛'
      },
      welcome: {
        first: [
          '你今天会来看我吗？',
          '我一直在这里等你…',
          '你会不会忘了我呀？'
        ],
        morningWaiting: [
          '早上好，我在等你带我开始一天 🐾',
          '你醒了吗？我已经在等你了',
          '今天可以早点陪我吗？'
        ],
        afternoonWaiting: [
          '下午有点无聊…要不要陪我一下？',
          '你今天好像还没怎么陪我',
          '我一直在等你回来…'
        ],
        eveningWaiting: [
          '已经晚上了，我还在等你…',
          '今天还没结束，你会来吗？',
          '我有点想你了…'
        ],
        morningDone: [
          '今天一早就见到你，真好 ☀️',
          '有你陪我开始一天，好安心',
          '今天一定会是开心的一天！'
        ],
        afternoonDone: [
          '下午和你在一起，很安心 😊',
          '有你陪着，我一点都不无聊',
          '今天的时光好舒服啊'
        ],
        eveningDone: [
          '今天能陪你到晚上，好幸福 🌙',
          '和你在一起的一天结束了，好满足',
          '明天也要见到你，好吗？'
        ]
      },
      milestones: {
        day7: '🎉 连续 7 天！你已经建立起照顾狗狗的稳定习惯了',
        day30: '🏆 连续 30 天！你已经是真正意义上的养狗人了'
      },
      missedTip: '🐶 昨天你没来，我等了你很久…',
      returnTips: {
        long: '🐶 你终于回来了，我等了你好久…',
        short: '🐶 你回来啦，我刚刚还在想你'
      },
      dailyEvents: [
        '🐶 今天它特别粘你，一直跟着你',
        '🐶 它今天看起来心情很好，一直摇尾巴',
        '🐶 它刚刚偷偷看了你好久',
        '🐶 今天它有点安静，好像在想事情',
        '🐶 它刚刚对你歪头了，好可爱'
      ],
      growthRecords: {
        day1: {
          text: '🐾 今天，你决定开始养狗',
          dogSay: '💬 我有点紧张，但我会努力相信你。'
        },
        day7: {
          text: '🎉 连续 7 天，你已经建立起稳定的照顾习惯',
          dogSay: '💬 我开始记住你的味道了。'
        },
        day30: {
          text: '🏆 连续 30 天，你和狗狗已经形成真正的陪伴关系',
          dogSay: '💬 原来，这就是家。'
        }
      }
    },
    rules: {
      title: '📖 养狗规则',
      items: [
        {
          title: '🐶 责任养狗',
          text: '养狗是一段长期责任，请在现实中慎重决定是否饲养宠物。'
        },
        {
          title: '💔 减少弃养',
          text: '每一只被抛弃的狗，都在等待它的主人。本应用希望减少现实中的弃养行为。'
        },
        {
          title: '❤️ 每日陪伴',
          text: '每天完成喂食、喝水、玩耍任务，狗狗会更依赖你。'
        },
        {
          title: '🔥 连续陪伴',
          text: '连续打卡天数越多，你们的关系越深。'
        },
        {
          title: '💉 健康与安全',
          text: '定期为狗狗接种疫苗，是对它和他人负责的重要行为。'
        },
        {
          title: '🏡 领养代替购买',
          text: '优先考虑领养流浪动物，帮助减少流浪狗数量。'
        }
      ]
    }
  },
  en: {
    common: {
      languageButton: '中',
      languageAriaLabel: 'Switch to Chinese',
      days: 'days',
      mood: 'Mood',
      moods: {
        sad: '😢 Sad',
        bored: '😐 A little bored',
        normal: '🙂 Doing okay',
        happy: '😄 Very happy'
      }
    },
    nav: {
      home: 'Home',
      chooseDog: 'Choose',
      raiseDog: 'Care',
      rules: 'Rules'
    },
    app: {
      raiseDog: '🐶 Care',
      chooseDog: '🐕 Choose',
      rules: '📖 Rules'
    },
    home: {
      status: 'Days with your dog',
      streak: 'Care streak',
      share: '📷 Share my dog journey',
      mainText: [
        'Every abandoned dog',
        'once believed in people.'
      ],
      bullets: [
        'I love dogs, but am I really ready for one?',
        'There are so many dogs. Which one should I choose?',
        'Are dogs hard to raise? What should I know?'
      ],
      cards: [
        'Am I ready for a dog? (⬆ Find the answer here)',
        'So many dogs. Which one fits me best? (⬆ Choose here)',
        'Is raising a dog hard? What should I know? (⬆ Read the guide)'
      ],
      shareCard: {
        days: '🐶 I have been with my dog for {days} days',
        streak: '🔥 Care streak: {streak} days',
        mood: 'Today it feels {mood}',
        close: 'Close'
      }
    },
    chooseDog: {
      recommendTips: {
        low: '👉 Recommended: gentle dogs that are easy to care for',
        mid: '👉 Recommended: dogs that fit family life',
        high: '👉 Recommended: energetic, highly interactive dogs'
      },
      whyRecommended: 'Why is this dog recommended?',
      whyNotRecommended: 'Why is this dog less recommended?',
      confirm: 'Confirm choice',
      recommendedBadge: 'Recommended',
      defaultReason: 'Tap a dog card to view details.',
      dogs: {
        1: {
          name: 'Golden Retriever',
          reason: {
            good: 'Gentle, affectionate, and family-friendly; also approachable for beginners',
            bad: 'Sheds quite a lot and needs regular brushing plus daily activity'
          }
        },
        2: {
          name: 'Labrador Retriever',
          reason: {
            good: 'Smart, obedient, and great for companionship and training',
            bad: 'Very energetic and needs steady daily walks'
          }
        },
        3: {
          name: 'Husky',
          reason: {
            good: 'Outgoing, playful, and interactive; great for active people',
            bad: 'Can be destructive and is not friendly to total beginners or busy owners'
          }
        },
        4: {
          name: 'Alaskan Malamute',
          reason: {
            good: 'Striking appearance with a loyal, steady personality',
            bad: 'Large body, big appetite, and higher space and stamina needs'
          }
        },
        5: {
          name: 'German Shepherd',
          reason: {
            good: 'Highly intelligent and protective; suitable for experienced owners',
            bad: 'Needs structured training and is not ideal for complete beginners'
          }
        },
        6: {
          name: 'Border Collie',
          reason: {
            good: 'One of the smartest breeds with exceptional learning ability',
            bad: 'Has intense energy and may get anxious without enough exercise'
          }
        },
        7: {
          name: 'Shiba Inu',
          reason: {
            good: 'Clean, independent, medium-sized, and city-friendly',
            bad: 'Can be stubborn and less obedient'
          }
        },
        8: {
          name: 'Corgi',
          reason: {
            good: 'Lively, affectionate, and loves interaction',
            bad: 'Has a sensitive back, so weight control matters'
          }
        },
        9: {
          name: 'Poodle',
          reason: {
            good: 'Low shedding, smart, trainable, and beginner-friendly',
            bad: 'Needs regular grooming'
          }
        },
        10: {
          name: 'Bichon Frise',
          reason: {
            good: 'Sweet, gentle, and strongly companion-oriented',
            bad: 'Coat care can be costly'
          }
        },
        11: {
          name: 'Pomeranian',
          reason: {
            good: 'Small size and suitable for apartment living',
            bad: 'May bark often and needs training'
          }
        },
        12: {
          name: 'Chihuahua',
          reason: {
            good: 'Low keeping cost and needs little space',
            bad: 'Sensitive personality and may react strongly to environmental changes'
          }
        },
        13: {
          name: 'French Bulldog',
          reason: {
            good: 'Lower exercise needs and suitable for office workers',
            bad: 'Breathing can be fragile, especially in summer'
          }
        },
        14: {
          name: 'Pug',
          reason: {
            good: 'Easygoing, lovable, and companionship-focused',
            bad: 'Prone to weight gain, so diet needs control'
          }
        },
        15: {
          name: 'Samoyed',
          reason: {
            good: 'Friendly personality and beautiful appearance',
            bad: 'Heavy shedding and high exercise needs'
          }
        },
        16: {
          name: 'Akita',
          reason: {
            good: 'Highly loyal with strong guarding ability',
            bad: 'Independent personality and not ideal for beginners'
          }
        },
        17: {
          name: 'Rottweiler',
          reason: {
            good: 'Protective and gives a strong sense of security',
            bad: 'Needs experience and stable training'
          }
        },
        18: {
          name: 'Chow Chow',
          reason: {
            good: 'Quiet personality and suitable for a calm lifestyle',
            bad: 'Lower obedience and more troublesome grooming'
          }
        }
      }
    },
    dogTest: {
      title: '🐾 Am I ready for a dog?',
      resultTitle: 'Result',
      questions: [
        {
          title: 'How much time can you spend with a dog every day?',
          options: [
            { text: 'Less than 1 hour', score: 1 },
            { text: '1-3 hours', score: 2 },
            { text: 'More than 3 hours', score: 3 }
          ]
        },
        {
          title: 'Are you willing to take a dog outside every day?',
          options: [
            { text: 'Not really', score: 1 },
            { text: 'I can accept it', score: 2 },
            { text: 'Absolutely', score: 3 }
          ]
        },
        {
          title: 'How do you feel about shedding and grooming?',
          options: [
            { text: 'I mind it a lot', score: 1 },
            { text: 'It is okay', score: 2 },
            { text: 'I do not mind at all', score: 3 }
          ]
        }
      ],
      results: {
        low: 'You are currently better suited to a calm, lower-energy dog that is easy to care for.',
        mid: 'Most family dogs could fit you. Choose based on personality preferences.',
        high: 'You are very ready for a dog and can consider energetic, highly interactive breeds.'
      }
    },
    dogDetail: {
      levelLabel: 'Recommended level: ',
      levels: {
        low: 'Beginner-friendly',
        mid: 'Some experience needed',
        high: 'High challenge'
      },
      whyRecommended: 'Why is this dog recommended for you?',
      whyNotRecommended: 'Why is this dog less recommended for you?',
      confirm: 'Choose this dog'
    },
    raiseDog: {
      moodLabel: '🐶 Current mood: ',
      tip: '🐶 Every moment of care is practice in not giving up on a dog',
      success: '🎉 Your dog is super happy today!',
      daysTogether: 'We have been together for {days} days',
      reminderTitle: '🐾 Today\'s care reminders',
      reminders: [
        '🍖 Remember to feed on time today',
        '🚶 Go outside at least once',
        '🧼 Check whether cleaning is needed',
        '🩺 Watch its energy and appetite'
      ],
      checkinTitle: '✅ Today\'s check-in',
      checkItems: {
        feed: '🍖 Fed today',
        walk: '🚶 Exercised today',
        play: '🎾 Played together today'
      },
      doneText: '🐶 You took great care of your dog today!',
      streakText: '🏆 You have cared for your dog for {days} days in a row',
      adviceTitle: '📘 Dog care tip',
      growthTitle: '🐾 Growth record',
      dayLabel: 'Day {day}',
      careTips: {
        low: 'This type of dog is very beginner-friendly. A regular routine is enough.',
        mid: 'Try to set a steady daily time for companionship and interaction.',
        high: 'Full of energy. Give it more exercise and interaction to prevent boredom.'
      },
      streakTips: {
        day1: 'Great! You have taken the first step in caring for your dog 🐾',
        day3: 'You are starting to build a steady care habit 😊',
        day7: 'Amazing! You have kept going for a whole week 🎉',
        day30: 'You are truly a dog-care expert now 🏆',
        under7: 'You have cared for your dog for {days} days in a row. Keep going!',
        under30: '{days} days of care. You are really putting your heart into this 🐶',
        over30: 'Your dog already sees you as its most important person 💛'
      },
      welcome: {
        first: [
          'Will you come see me today?',
          'I have been waiting for you here...',
          'You will not forget me, right?'
        ],
        morningWaiting: [
          'Good morning. I am waiting to start the day with you 🐾',
          'Are you awake? I have been waiting for you',
          'Can you spend time with me a little earlier today?'
        ],
        afternoonWaiting: [
          'The afternoon feels a little boring... want to keep me company?',
          'It feels like you have not spent much time with me today',
          'I have been waiting for you to come back...'
        ],
        eveningWaiting: [
          'It is already evening, and I am still waiting...',
          'The day is not over yet. Will you come?',
          'I kind of miss you...'
        ],
        morningDone: [
          'Seeing you this early feels wonderful ☀️',
          'Starting the day with you feels so safe',
          'Today is going to be a happy day!'
        ],
        afternoonDone: [
          'Being with you this afternoon feels peaceful 😊',
          'With you here, I am not bored at all',
          'Today feels so comfortable'
        ],
        eveningDone: [
          'Getting to stay with you until evening feels so happy 🌙',
          'A day with you ends with such a full heart',
          'Can I see you again tomorrow?'
        ]
      },
      milestones: {
        day7: '🎉 7 days in a row! You are building a stable dog-care habit',
        day30: '🏆 30 days in a row! You truly are a dog person now'
      },
      missedTip: '🐶 You did not come yesterday. I waited for you for a long time...',
      returnTips: {
        long: '🐶 You finally came back. I waited so long...',
        short: '🐶 You are back. I was just thinking about you'
      },
      dailyEvents: [
        '🐶 Today it is extra clingy and keeps following you',
        '🐶 It seems happy today and keeps wagging its tail',
        '🐶 It secretly looked at you for a long time just now',
        '🐶 It is a little quiet today, like it is thinking',
        '🐶 It tilted its head at you. So cute'
      ],
      growthRecords: {
        day1: {
          text: '🐾 Today, you decided to start raising a dog',
          dogSay: '💬 I am a little nervous, but I will try to trust you.'
        },
        day7: {
          text: '🎉 7 days in a row. You have built a steady care habit',
          dogSay: '💬 I am starting to remember your scent.'
        },
        day30: {
          text: '🏆 30 days in a row. You and your dog have formed real companionship',
          dogSay: '💬 So this is what home feels like.'
        }
      }
    },
    rules: {
      title: '📖 Dog Care Rules',
      items: [
        {
          title: '🐶 Responsible ownership',
          text: 'Raising a dog is a long-term responsibility. Please think carefully before keeping a pet in real life.'
        },
        {
          title: '💔 Reduce abandonment',
          text: 'Every abandoned dog is waiting for its person. This app hopes to reduce real-world pet abandonment.'
        },
        {
          title: '❤️ Daily companionship',
          text: 'Complete feeding, water, and play tasks every day so your dog depends on you more.'
        },
        {
          title: '🔥 Continuous care',
          text: 'The more days you check in, the deeper your relationship becomes.'
        },
        {
          title: '💉 Health and safety',
          text: 'Regular vaccination is an important responsibility to your dog and to others.'
        },
        {
          title: '🏡 Adopt instead of buying',
          text: 'Consider adopting stray animals first to help reduce the number of homeless dogs.'
        }
      ]
    }
  }
}
