// 地图节点配置
export const NODES = [
  // 新手村区域 (0-4)
  {
    id: 0,
    name: "起始之地",
    emoji: "🏕️",
    type: "rest",
    description: "勇者的出生地，宁静的小村庄",
    position: { x: 100, y: 300 },
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
    position: { x: 200, y: 200 },
    unlocks: [2, 5],
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
    position: { x: 300, y: 300 },
    unlocks: [3],
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
    name: "森林入口",
    emoji: "🌲",
    type: "battle",
    description: "哥布林领地",
    position: { x: 400, y: 250 },
    unlocks: [4, 6],
    enemyId: "goblin",
    dialogue: {
      intro: [
        { speaker: "👺 哥布林", text: "人类？这里不欢迎你！" }
      ]
    }
  },
  {
    id: 4,
    name: "古老神庙",
    emoji: "⛩️",
    type: "chest",
    description: "隐藏着古代遗迹",
    position: { x: 500, y: 350 },
    unlocks: [],
    reward: { gold: 50 },
    dialogue: {
      intro: [
        { speaker: "🗿 神庙石碑", text: "光之子，欢迎来到阿斯特拉大陆..." },
        { speaker: "🗿 神庙石碑", text: "你的旅程才刚刚开始勇气与智慧将指引你的道路。" }
      ]
    }
  },
  // 森林区域 (5-9)
  {
    id: 5,
    name: "魔法森林",
    emoji: "✨",
    type: "battle",
    description: "妖精与魔法生物的居所",
    position: { x: 550, y: 150 },
    unlocks: [6, 7],
    enemyId: "fairy",
    dialogue: {
      intro: [
        { speaker: "🧚 妖精", text: "离开这里，人类！" }
      ]
    }
  },
  {
    id: 6,
    name: "森林深处",
    emoji: "🌳",
    type: "battle",
    description: "狼群出没",
    position: { x: 650, y: 200 },
    unlocks: [8],
    enemyId: "wolf_pack",
    dialogue: {
      intro: [
        { speaker: "🐺 狼嚎", text: "嗷呜——！" }
      ]
    }
  },
  {
    id: 7,
    name: "精灵之泉",
    emoji: "💧",
    type: "rest",
    description: "恢复体力，精灵居住地",
    position: { x: 700, y: 100 },
    unlocks: [9, 10],
    dialogue: {
      intro: [
        { speaker: "🧚 精灵", text: "你拥有光之神的祝福..." },
        { speaker: "💧 精灵之泉", text: "温暖的泉水治愈着你的身心。" }
      ]
    }
  },
  {
    id: 8,
    name: "废弃矿洞",
    emoji: "⛏️",
    type: "chest",
    description: "矿洞中的宝藏",
    position: { x: 750, y: 280 },
    unlocks: [],
    reward: { gold: 30, items: { potion: 1 } },
    dialogue: {
      intro: [
        { speaker: "🧙‍♂️ 勇者", text: "矿洞里似乎有什么东西..." },
        { speaker: "✨ 发现!", text: "你发现了30金币和1瓶药水！" }
      ]
    }
  },
  {
    id: 9,
    name: "哥布林营地",
    emoji: "🔥",
    type: "task_battle",
    description: "哥布林部落",
    position: { x: 850, y: 180 },
    unlocks: [11],
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
  // 山脉区域 (10-14)
  {
    id: 10,
    name: "山麓小径",
    emoji: "⛰️",
    type: "battle",
    description: "山路入口",
    position: { x: 950, y: 280 },
    unlocks: [11],
    enemyId: "wildcat",
    dialogue: {
      intro: [
        { speaker: "🐱 山猫", text: "喵——！" }
      ]
    }
  },
  {
    id: 11,
    name: "山贼窝点",
    emoji: "🏚️",
    type: "task_battle",
    description: "山贼巢穴",
    position: { x: 1050, y: 180 },
    unlocks: [12],
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
  {
    id: 12,
    name: "古老驿站",
    emoji: "🏪",
    type: "rest",
    description: "旅人休息处",
    position: { x: 1100, y: 300 },
    unlocks: [13, 17],
    dialogue: {
      intro: [
        { speaker: "🧔 旅行者", text: "前面的山脉...据说有古代遗迹..." },
        { speaker: "🧔 旅行者", text: "祝你一路顺风，勇者！" }
      ]
    }
  },
  {
    id: 13,
    name: "铁矿山脉",
    emoji: "🪨",
    type: "battle",
    description: "矿石生物",
    position: { x: 1150, y: 150 },
    unlocks: [14],
    enemyId: "rock_golem",
    dialogue: {
      intro: [
        { speaker: "🗿 岩石傀儡", text: "守卫...职责..." }
      ]
    }
  },
  {
    id: 14,
    name: "山顶遗迹",
    emoji: "🏛️",
    type: "chest",
    description: "古代贤者遗产",
    position: { x: 1250, y: 200 },
    unlocks: [],
    reward: { gold: 100, items: { potion: 1 } },
    dialogue: {
      intro: [
        { speaker: "📜 遗迹石碑", text: "勇气与智慧并存之人..." },
        { speaker: "✨ 获得了古代智者的祝福，攻击力大幅提升！" }
      ]
    }
  },
  // 魔兽森林外围 (15-19)
  {
    id: 15,
    name: "魔兽荒原",
    emoji: "🏜️",
    type: "battle",
    description: "开始遇到强力魔兽",
    position: { x: 1300, y: 300 },
    unlocks: [16],
    enemyId: "troll",
    dialogue: {
      intro: [
        { speaker: "👾 巨魔", text: "吼！！！人类...死！" }
      ]
    }
  },
  {
    id: 16,
    name: "黑暗沼泽",
    emoji: "🪷",
    type: "battle",
    description: "毒雾与怪物",
    position: { x: 1400, y: 200 },
    unlocks: [17, 18],
    enemyId: "swamp_beast",
    dialogue: {
      intro: [
        { speaker: "💀 沼泽怪", text: "踏入...禁区..." }
      ]
    }
  },
  {
    id: 17,
    name: "流浪商人",
    emoji: "🐫",
    type: "shop",
    description: "神秘商队",
    position: { x: 1450, y: 320 },
    unlocks: [18],
    dialogue: {
      intro: [
        { speaker: "🧔 商人", text: "旅者，前方危险...买点防身吧" }
      ]
    }
  },
  {
    id: 18,
    name: "魔兽巢穴入口",
    emoji: "🗝️",
    type: "task",
    description: "讨伐开始",
    position: { x: 1550, y: 150 },
    unlocks: [19],
    taskId: "final_assault",
    dialogue: {
      intro: [
        { speaker: "🦅 守卫", text: "来者止步！这里通向魔兽领地！" },
        { speaker: "🦅 守卫", text: "既然你决定了...就去吧。勇者，祝你好运。" }
      ]
    }
  },
  {
    id: 19,
    name: "魔兽森林深处",
    emoji: "🌑",
    type: "battle_boss",
    description: "剧情中期BOSS战",
    position: { x: 1650, y: 250 },
    unlocks: [],
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
