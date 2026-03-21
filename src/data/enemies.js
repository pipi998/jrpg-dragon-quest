// 敌人配置
export const ENEMIES = {
  // 史莱姆
  slime: {
    id: "slime",
    name: "史莱姆",
    emoji: "🟢",
    level: 1,
    attack: 3,
    hp: 15,
    gold: 10,
    description: "Q弹的绿色史莱姆"
  },
  // 哥布林
  goblin: {
    id: "goblin",
    name: "哥布林",
    emoji: "👺",
    level: 2,
    attack: 5,
    hp: 25,
    gold: 20,
    description: "绿皮肤的邪恶小生物"
  },
  // 哥布林战士
  goblin_chief: {
    id: "goblin_chief",
    name: "哥布林战士",
    emoji: "👹",
    level: 4,
    attack: 10,
    hp: 50,
    gold: 40,
    description: "哥布林部落的精英战士"
  },
  // 森林妖精
  fairy: {
    id: "fairy",
    name: "森林妖精",
    emoji: "🧚",
    level: 5,
    attack: 12,
    hp: 45,
    gold: 50,
    description: "魔法森林的守护者"
  },
  // 狼群
  wolf_pack: {
    id: "wolf_pack",
    name: "巨狼",
    emoji: "🐺",
    level: 5,
    attack: 15,
    hp: 60,
    gold: 60,
    description: "成群出没的凶猛巨狼"
  },
  // 山猫
  wildcat: {
    id: "wildcat",
    name: "山猫",
    emoji: "🐱",
    level: 6,
    attack: 18,
    hp: 70,
    gold: 70,
    description: "山路的敏捷猎手"
  },
  // 山贼
  bandit: {
    id: "bandit",
    name: "山贼",
    emoji: "👤",
    level: 7,
    attack: 20,
    hp: 80,
    gold: 80,
    description: "打劫路人的恶徒"
  },
  // 山贼头目
  bandit_leader: {
    id: "bandit_leader",
    name: "山贼头目",
    emoji: "💂",
    level: 8,
    attack: 30,
    hp: 120,
    gold: 150,
    description: "山贼团的首领"
  },
  // 岩石傀儡
  rock_golem: {
    id: "rock_golem",
    name: "岩石傀儡",
    emoji: "🗿",
    level: 8,
    attack: 25,
    hp: 150,
    gold: 100,
    description: "由岩石构成的古代守卫"
  },
  // 荒野巨魔
  troll: {
    id: "troll",
    name: "荒野巨魔",
    emoji: "👾",
    level: 9,
    attack: 35,
    hp: 130,
    gold: 120,
    description: "荒原上的恐怖怪物"
  },
  // 毒蛇
  snake: {
    id: "snake",
    name: "毒蛇",
    emoji: "🐍",
    level: 9,
    attack: 30,
    hp: 100,
    gold: 80,
    description: "沼泽中的致命毒蛇"
  },
  // 沼泽怪
  swamp_beast: {
    id: "swamp_beast",
    name: "沼泽怪",
    emoji: "💀",
    level: 10,
    attack: 40,
    hp: 140,
    gold: 100,
    description: "黑暗沼泽的恐怖生物"
  },
  // 暗影猎龙者 (BOSS)
  shadow_hunter: {
    id: "shadow_hunter",
    name: "暗影猎龙者",
    emoji: "🐲",
    level: 12,
    attack: 60,
    hp: 300,
    gold: 300,
    description: "魔兽森林的守护者，暗影的化身",
    isBoss: true
  }
};
