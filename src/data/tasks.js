// 任务配置
export const TASKS = {
  kill_goblins: {
    id: "kill_goblins",
    name: "讨伐哥布林",
    description: "击败3个哥布林",
    type: "battle",
    target: "goblin",
    reward: { gold: 50, items: { potion: 1 } }
  },
  defeat_goblins: {
    id: "defeat_goblins",
    name: "哥布林营地",
    description: "击败哥布林营地",
    type: "battle",
    reward: { gold: 100, items: { potion: 2 } }
  },
  defeat_bandits: {
    id: "defeat_bandits",
    name: "讨伐山贼",
    description: "击败山贼窝点的敌人",
    type: "battle",
    reward: { gold: 150, items: { potion: 2 } }
  },
  final_assault: {
    id: "final_assault",
    name: "魔兽森林讨伐",
    description: "击败魔兽森林深处的守护者",
    type: "battle",
    reward: { gold: 200, items: { potion: 3 } }
  },
  explore_forest: {
    id: "explore_forest",
    name: "森林探索",
    description: "击败5个山猫",
    type: "battle",
    target: "wildcat",
    reward: { gold: 80, items: { potion: 1 } }
  },
  protect_fairy: {
    id: "protect_fairy",
    name: "保护精灵",
    description: "赶走袭击精灵领地的山猫",
    type: "battle",
    target: "wildcat",
    reward: { gold: 100, items: { potion: 2 } }
  },
  clear_cave: {
    id: "clear_cave",
    name: "洞穴清理",
    description: "清除隐蔽山洞中的怪物",
    type: "battle",
    target: "troll",
    reward: { gold: 120, items: { potion: 2 } }
  }
};

// 根据玩家等级计算任务奖励
export function calculateTaskReward(task, playerLevel) {
  const baseReward = TASKS[task.id]?.reward || { gold: 0, items: {} };
  
  // 金币奖励 = 基础金币 + 等级 * 10
  const gold = baseReward.gold + playerLevel * 20;
  
  // 药水 = 基础 + 随机1-2
  const items = { ...baseReward.items };
  if (!items.potion) items.potion = 0;
  items.potion += Math.floor(Math.random() * 2) + 1;
  
  return { gold, items };
}
