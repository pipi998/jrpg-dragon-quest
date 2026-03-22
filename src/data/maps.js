// 地图节点配置 - 40个节点
export const NODES = [
  // ===== 新手村区域 (0-7) =====
  {
    id: 0,
    name: "起始之地",
    emoji: "🏕️",
    type: "rest",
    description: "勇者的出生地，宁静的小村庄",
    position: { x: 100, y: 250 },
    unlocks: [1],
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "这里是...哪里？" },
        { speaker: "✨ 光之神", text: "欢迎来到阿斯特拉大陆，勇者。你是被选中的命运之子。" }
      ]
    }
  },
  {
    id: 1,
    name: "村长家",
    emoji: "🏠",
    type: "task",
    description: "村长委托勇者的起点",
    position: { x: 200, y: 150 },
    unlocks: [2, 3],
    dialogue: {
      intro: [
        { speaker: "👴 村长", text: "勇者啊，魔龙王的势力日渐强盛，只有你能拯救我们..." },
        { speaker: "👴 村长", text: "村外的森林里有一些哥布林作祟，请你去讨伐它们！" }
      ]
    },
    taskId: "kill_goblins"
  },
  {
    id: 2,
    name: "村外草地",
    emoji: "🌿",
    type: "battle",
    description: "史莱姆栖息地，勇者第一次战斗",
    position: { x: 300, y: 250 },
    unlocks: [4],
    enemyId: "slime",
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "这就是...我的第一场战斗！" }
      ],
      victory: [
        { speaker: "🧙‍♂️ 勇者", text: "我做到了！这就是战斗的感觉！" }
      ]
    }
  },
  {
    id: 3,
    name: "小溪边",
    emoji: "🏞️",
    type: "rest",
    description: "清澈的小溪，休息的好地方",
    position: { x: 280, y: 100 },
    unlocks: [5],
    dialogue: {
      intro: [
        { speaker: "💧 溪水", text: "清澈的溪水让人心旷神怡。" }
      ]
    }
  },
  {
    id: 4,
    name: "森林入口",
    emoji: "🌲",
    type: "battle",
    description: "哥布林领地",
    position: { x: 400, y: 250 },
    unlocks: [5, 6],
    enemyId: "goblin",
    dialogue: {
      intro: [
        { speaker: "👺 哥布林", text: "人类？这里不欢迎你！" }
      ]
    }
  },
  {
    id: 5,
    name: "古老神庙",
    emoji: "⛩️",
    type: "chest",
    description: "隐藏着古代遗迹",
    position: { x: 480, y: 150 },
    unlocks: [7],
    reward: { gold: 50 },
    dialogue: {
      intro: [
        { speaker: "🗿 神庙石碑", text: "光之子，欢迎来到阿斯特拉大陆..." },
        { speaker: "🗿 神庙石碑", text: "你的旅程才刚刚开始，勇气与智慧将指引你的道路。" }
      ]
    }
  },
  {
    id: 6,
    name: "废弃木屋",
    emoji: "🛖",
    type: "chest",
    description: "猎人遗留的小屋",
    position: { x: 450, y: 350 },
    unlocks: [],
    reward: { gold: 30, items: { potion: 1 } },
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "这里有个小屋，让我看看有什么..." }
      ]
    }
  },
  {
    id: 7,
    name: "魔法森林",
    emoji: "✨",
    type: "battle",
    description: "妖精与魔法生物的居所",
    position: { x: 550, y: 250 },
    unlocks: [8, 9],
    enemyId: "fairy",
    dialogue: {
      intro: [
        { speaker: "🧚 妖精", text: "离开这里，人类！" }
      ]
    }
  },

  // ===== 森林深处区域 (8-15) =====
  {
    id: 8,
    name: "森林深处",
    emoji: "🌳",
    type: "battle",
    description: "狼群出没",
    position: { x: 650, y: 180 },
    unlocks: [10],
    enemyId: "wolf_pack",
    dialogue: {
      intro: [
        { speaker: "🐺 狼嚎", text: "嗷呜——！" }
      ]
    }
  },
  {
    id: 9,
    name: "精灵之泉",
    emoji: "💧",
    type: "rest",
    description: "恢复体力，精灵居住地",
    position: { x: 620, y: 320 },
    unlocks: [10, 11],
    dialogue: {
      intro: [
        { speaker: "🧚 精灵", text: "你拥有光之神的祝福..." },
        { speaker: "💧 精灵之泉", text: "温暖的泉水治愈着你的身心。" }
      ]
    }
  },
  {
    id: 10,
    name: "哥布林营地",
    emoji: "🔥",
    type: "task_battle",
    description: "哥布林部落",
    position: { x: 750, y: 250 },
    unlocks: [12],
    enemyId: "goblin_chief",
    taskId: "defeat_goblins",
    dialogue: {
      intro: [
        { speaker: "👹 哥布林战士", text: "竟是勇者！受死吧！" }
      ],
      victory: [
        { speaker: "🧙‍♂️ 勇者", text: "哥布林部落已被击败！" },
        { speaker: "👴 村长", text: "干得好，勇者！这是你的奖励。" }
      ]
    }
  },
  {
    id: 11,
    name: "野果丛",
    emoji: "🍇",
    type: "chest",
    description: "野果可以充饥",
    position: { x: 700, y: 400 },
    unlocks: [],
    reward: { items: { potion: 1 } },
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "发现了些野果和一枚奇特的种子..." }
      ]
    }
  },
  {
    id: 12,
    name: "山麓小径",
    emoji: "⛰️",
    type: "battle",
    description: "山路入口",
    position: { x: 850, y: 200 },
    unlocks: [13],
    enemyId: "wildcat",
    dialogue: {
      intro: [
        { speaker: "🐱 山猫", text: "喵——！" }
      ]
    }
  },
  {
    id: 13,
    name: "古老驿站",
    emoji: "🏪",
    type: "rest",
    description: "旅人休息处",
    position: { x: 920, y: 280 },
    unlocks: [14, 15],
    dialogue: {
      intro: [
        { speaker: "🧔 旅行者", text: "前面的山脉...据说有古代遗迹..." },
        { speaker: "🧔 旅行者", text: "祝你一路顺风，勇者！" }
      ]
    }
  },
  {
    id: 14,
    name: "废弃矿洞",
    emoji: "⛏️",
    type: "chest",
    description: "矿洞中的宝藏",
    position: { x: 980, y: 150 },
    unlocks: [],
    reward: { gold: 60, items: { potion: 1 } },
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "矿洞里似乎有什么东西..." }
      ]
    }
  },
  {
    id: 15,
    name: "山贼窝点",
    emoji: "🏚️",
    type: "task_battle",
    description: "山贼巢穴",
    position: { x: 1000, y: 350 },
    unlocks: [16],
    enemyId: "bandit_leader",
    taskId: "defeat_bandits",
    dialogue: {
      intro: [
        { speaker: "💂 山贼头目", text: "竟敢闯入我的领地！" }
      ],
      victory: [
        { speaker: "💂 山贼头目", text: "啊...我输了..." },
        { speaker: "🧙‍♂️ 勇者", text: "罪恶终将受到制裁！" }
      ]
    }
  },

  // ===== 山脉区域 (16-23) =====
  {
    id: 16,
    name: "铁矿山脉",
    emoji: "🪨",
    type: "battle",
    description: "矿石生物",
    position: { x: 1100, y: 250 },
    unlocks: [17],
    enemyId: "rock_golem",
    dialogue: {
      intro: [
        { speaker: "🗿 岩石傀儡", text: "守卫...职责..." }
      ]
    }
  },
  {
    id: 17,
    name: "山间平台",
    emoji: "🗻",
    type: "rest",
    description: "可以俯瞰整个山脉",
    position: { x: 1180, y: 180 },
    unlocks: [18, 19],
    dialogue: {
      intro: [
        { speaker: "💨 山风", text: "呼啸的风声仿佛在诉说着古老的传说..." }
      ]
    }
  },
  {
    id: 18,
    name: "险峻岩壁",
    emoji: "🏔️",
    type: "battle",
    description: "攀登时的考验",
    position: { x: 1250, y: 250 },
    unlocks: [20],
    enemyId: "troll",
    dialogue: {
      intro: [
        { speaker: "👾 巨魔", text: "吼！！！人类...死！" }
      ]
    }
  },
  {
    id: 19,
    name: "隐蔽山洞",
    emoji: "🕳️",
    type: "chest",
    description: "探险者的遗产",
    position: { x: 1200, y: 350 },
    unlocks: [],
    reward: { gold: 80 },
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "山洞里似乎有人居住过的痕迹..." }
      ]
    }
  },
  {
    id: 20,
    name: "山顶遗迹",
    emoji: "🏛️",
    type: "chest",
    description: "古代贤者遗产",
    position: { x: 1320, y: 200 },
    unlocks: [21],
    reward: { gold: 100, items: { potion: 2 } },
    dialogue: {
      intro: [
        { speaker: "📜 遗迹石碑", text: "勇气与智慧并存之人..." },
        { speaker: "✨ 获得了古代智者的祝福，攻击力大幅提升！" }
      ]
    }
  },
  {
    id: 21,
    name: "鹰巢",
    emoji: "🦅",
    type: "rest",
    description: "巨鹰的栖息地",
    position: { x: 1380, y: 300 },
    unlocks: [22],
    dialogue: {
      intro: [
        { speaker: "🦅 巨鹰", text: "嗷——！" },
        { speaker: "🦅 巨鹰", text: "巨鹰似乎认可了你的勇气，愿意让你休息。" }
      ]
    }
  },
  {
    id: 22,
    name: "魔兽荒原",
    emoji: "🏜️",
    type: "battle",
    description: "开始遇到强力魔兽",
    position: { x: 1480, y: 200 },
    unlocks: [23],
    enemyId: "troll",
    dialogue: {
      intro: [
        { speaker: "👾 巨魔", text: "吼！！！" }
      ]
    }
  },
  {
    id: 23,
    name: "荒原泉水",
    emoji: "⛲",
    type: "rest",
    description: "荒原中的生命之泉",
    position: { x: 1520, y: 320 },
    unlocks: [24, 25],
    dialogue: {
      intro: [
        { speaker: "✨ 泉水", text: "散发着神秘光芒的泉水。" }
      ]
    }
  },

  // ===== 魔兽森林外围 (24-31) =====
  {
    id: 24,
    name: "黑暗沼泽",
    emoji: "🪷",
    type: "battle",
    description: "毒雾与怪物",
    position: { x: 1580, y: 180 },
    unlocks: [26],
    enemyId: "swamp_beast",
    dialogue: {
      intro: [
        { speaker: "💀 沼泽怪", text: "踏入...禁区..." }
      ]
    }
  },
  {
    id: 25,
    name: "流浪商人",
    emoji: "🐫",
    type: "shop",
    description: "神秘商队",
    position: { x: 1600, y: 350 },
    unlocks: [26],
    dialogue: {
      intro: [
        { speaker: "🧔 商人", text: "旅者，前方危险...买点防身吧" }
      ]
    }
  },
  {
    id: 26,
    name: "枯木林",
    emoji: "🌑",
    type: "battle",
    description: "诡异的枯树林",
    position: { x: 1680, y: 250 },
    unlocks: [27, 28],
    enemyId: "shadow_hunter",
    dialogue: {
      intro: [
        { speaker: "🌑 阴影", text: "沙沙声..." }
      ]
    }
  },
  {
    id: 27,
    name: "古老石碑",
    emoji: "🪦",
    type: "chest",
    description: "纪念逝去的英雄",
    position: { x: 1720, y: 150 },
    unlocks: [],
    reward: { gold: 120 },
    dialogue: {
      intro: [
        { speaker: "🪦 石碑", text: "纪念勇敢的英雄们..." }
      ]
    }
  },
  {
    id: 28,
    name: "暗影洞穴",
    emoji: "🔮",
    type: "battle",
    description: "黑暗生物的居所",
    position: { x: 1750, y: 320 },
    unlocks: [29],
    enemyId: "shadow_hunter",
    dialogue: {
      intro: [
        { speaker: "👁️ 暗影生物", text: "发现了...入侵者..." }
      ]
    }
  },
  {
    id: 29,
    name: "魔兽巢穴入口",
    emoji: "🗝️",
    type: "task",
    description: "讨伐开始",
    position: { x: 1850, y: 200 },
    unlocks: [30],
    taskId: "final_assault",
    dialogue: {
      intro: [
        { speaker: "🦅 守卫", text: "来者止步！这里通向魔兽领地！" },
        { speaker: "🦅 守卫", text: "既然你决定了...就去吧。勇者，祝你好运。" }
      ]
    }
  },
  {
    id: 30,
    name: "血池",
    emoji: "🩸",
    type: "battle",
    description: "危险的区域",
    position: { x: 1920, y: 280 },
    unlocks: [31],
    enemyId: "troll",
    dialogue: {
      intro: [
        { speaker: "🩸 血池", text: "咕噜咕噜..." }
      ]
    }
  },
  {
    id: 31,
    name: "黑暗祭坛",
    emoji: "🔯",
    type: "chest",
    description: "邪恶的仪式遗迹",
    position: { x: 1980, y: 150 },
    unlocks: [],
    reward: { gold: 150, items: { potion: 2 } },
    dialogue: {
      intro: [
        { speaker: "🔯 祭坛", text: "曾在此进行过黑暗的仪式..." }
      ]
    }
  },

  // ===== 魔兽森林深处 (32-39) =====
  {
    id: 32,
    name: "魔兽森林深处",
    emoji: "🌚",
    type: "battle_boss",
    description: "剧情中期BOSS战",
    position: { x: 2050, y: 250 },
    unlocks: [33],
    enemyId: "shadow_hunter",
    dialogue: {
      intro: [
        { speaker: "🐲 暗影猎龙者", text: "愚蠢的勇者...这只是开始..." },
        { speaker: "🐲 暗影猎龙者", text: "魔龙王大人会终结这一切！" }
      ],
      victory: [
        { speaker: "🐲 暗影猎龙者", text: "呃啊...勇者...你很强..." },
        { speaker: "🧙‍♂️ 勇者", text: "我不会退缩！为了阿斯特拉大陆！" },
        { speaker: "✨ 光之神", text: "勇者，你的旅程还在继续..." }
      ]
    }
  },
  {
    id: 33,
    name: "龙之巢穴",
    emoji: "🐉",
    type: "rest",
    description: "巨龙曾经的栖息地",
    position: { x: 2120, y: 180 },
    unlocks: [34],
    dialogue: {
      intro: [
        { speaker: "🐉 龙之气息", text: "这里残留着强大的龙之力..." }
      ]
    }
  },
  {
    id: 34,
    name: "冰霜洞穴",
    emoji: "❄️",
    type: "battle",
    description: "寒冰生物",
    position: { x: 2180, y: 280 },
    unlocks: [35],
    enemyId: "troll",
    dialogue: {
      intro: [
        { speaker: "❄️ 冰霜巨人", text: "闯入者...死！" }
      ]
    }
  },
  {
    id: 35,
    name: "火焰山",
    emoji: "🌋",
    type: "battle",
    description: "火焰生物的领域",
    position: { x: 2250, y: 200 },
    unlocks: [36],
    enemyId: "troll",
    dialogue: {
      intro: [
        { speaker: "🌋 火焰元素", text: "热...好热..." }
      ]
    }
  },
  {
    id: 36,
    name: "元素交汇点",
    emoji: "⚡",
    type: "rest",
    description: "四大元素汇聚之处",
    position: { x: 2300, y: 320 },
    unlocks: [37, 38],
    dialogue: {
      intro: [
        { speaker: "⚡ 元素之力", text: "水、火、风、土在此交汇..." }
      ]
    }
  },
  {
    id: 37,
    name: "古代龙墓",
    emoji: "🦴",
    type: "chest",
    description: "龙族的墓地",
    position: { x: 2350, y: 180 },
    unlocks: [],
    reward: { gold: 200, items: { potion: 3 } },
    dialogue: {
      intro: [
        { speaker: "🦴 龙骨", text: "无数巨龙在此长眠..." }
      ]
    }
  },
  {
    id: 38,
    name: "魔龙城外围",
    emoji: "🏰",
    type: "battle",
    description: "通往最终决战",
    position: { x: 2380, y: 280 },
    unlocks: [39],
    enemyId: "shadow_hunter",
    dialogue: {
      intro: [
        { speaker: "💀 亡灵守卫", text: "此路不通！" }
      ]
    }
  },
  {
    id: 39,
    name: "魔龙城",
    emoji: "🐲🏰",
    type: "battle_boss",
    description: "最终BOSS战",
    position: { x: 2480, y: 250 },
    unlocks: [],
    enemyId: "shadow_hunter",
    dialogue: {
      intro: [
        { speaker: "🐲 魔龙王", text: "愚蠢的勇者，你终于来了！" },
        { speaker: "🐲 魔龙王", text: "这就是你的终结！" }
      ],
      victory: [
        { speaker: "🐲 魔龙王", text: "不可能...我竟然..." },
        { speaker: "✨ 光之神", text: "勇者！你做到了！阿斯特拉大陆得救了！" },
        { speaker: "🧙‍♂️ 勇者", text: "旅程...终于结束了..." }
      ]
    }
  }
];

// 节点类型定义
export const NODE_TYPES = {
  rest: { name: "休息", emoji: "🏕️", color: "#4CAF50" },
  task: { name: "任务", emoji: "📋", color: "#FF9800" },
  task_battle: { name: "任务战斗", emoji: "⚔️", color: "#E91E63" },
  battle: { name: "战斗", emoji: "⚔️", color: "#f44336" },
  battle_boss: { name: "BOSS战", emoji: "🐲", color: "#9C27B0" },
  chest: { name: "宝箱", emoji: "📦", color: "#FFC107" },
  shop: { name: "商店", emoji: "🏪", color: "#2196F3" }
};
