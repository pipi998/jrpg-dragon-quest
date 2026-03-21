// 技能库
export const SKILLS = {
  // 5级技能
  iron_wall: {
    id: "iron_wall",
    name: "铁壁",
    emoji: "🛡️",
    description: "接下来3回合受到伤害减少20%",
    level: 5,
    type: "buff",
    duration: 3,
    effect: { damageReduction: 0.2 }
  },
  // 10级技能
  heal: {
    id: "heal",
    name: "治愈",
    emoji: "💚",
    description: "恢复30%体力",
    level: 10,
    type: "heal",
    effect: { healPercent: 0.3 }
  },
  // 10级技能
  berserker: {
    id: "berserker",
    name: "猛攻",
    emoji: "⚔️",
    description: "接下来2回合攻击提升20%",
    level: 10,
    type: "buff",
    duration: 2,
    effect: { attackBoost: 0.2 }
  },
  // 15级技能
  fury: {
    id: "fury",
    name: "狂暴",
    emoji: "🔥",
    description: "下回合攻击提升50%",
    level: 15,
    type: "buff",
    duration: 1,
    effect: { attackBoost: 0.5 }
  },
  // 15级技能
  regen: {
    id: "regen",
    name: "持续恢复",
    emoji: "💖",
    description: "2回合内每回合恢复18%体力",
    level: 15,
    type: "regen",
    duration: 2,
    effect: { regenPercent: 0.18 }
  },
  // 20级技能
  desperate: {
    id: "desperate",
    name: "破釜沉舟",
    emoji: "💀",
    description: "当回合攻击+80%，之后2回合攻击力-50%",
    level: 20,
    type: "desperate",
    duration: 3,
    effect: { attackBoostFirst: 0.8, attackReductionAfter: 0.5 }
  }
};

// 技能库数组（用于随机学习）
export const SKILL_POOL = [
  "iron_wall",    // 5级
  "heal",         // 10级
  "berserker",    // 10级
  "fury",         // 15级
  "regen",        // 15级
  "desperate"     // 20级
];

// 获取指定等级可学习的技能
export function getSkillForLevel(level) {
  if (level !== 5 && level !== 10 && level !== 15 && level !== 20) {
    return null;
  }
  
  // 75%概率学习技能
  if (Math.random() > 0.75) {
    return null;
  }
  
  // 从对应等级的技能池中随机
  const availableSkills = SKILL_POOL.filter(skillId => {
    const skill = SKILLS[skillId];
    return skill.level === level;
  });
  
  if (availableSkills.length === 0) {
    return null;
  }
  
  const randomSkillId = availableSkills[Math.floor(Math.random() * availableSkills.length)];
  return SKILLS[randomSkillId];
}
