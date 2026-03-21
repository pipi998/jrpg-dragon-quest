// 战斗系统逻辑

// 玩家初始属性
export const INITIAL_PLAYER = {
  level: 1,
  exp: 0,
  attack: 10,
  maxHp: 100,
  hp: 100,
  gold: 100,
  skills: [],
  items: { potion: 3 }
};

// 等级上限
export const MAX_LEVEL = 20;

// 计算升级所需经验
export function getExpForLevel(level) {
  if (level >= MAX_LEVEL) return Infinity;
  return level * 100; // 每级100经验
}

// 计算等级属性
export function calculateLevelStats(level) {
  const baseAttack = 10;
  const baseHp = 100;
  const maxAttack = 40;
  const maxHp = 400;
  
  const attack = Math.round(baseAttack + (level - 1) * (maxAttack - baseAttack) / (MAX_LEVEL - 1));
  const maxHpVal = Math.round(baseHp + (level - 1) * (maxHp - baseHp) / (MAX_LEVEL - 1));
  
  return { attack: Math.min(attack, maxAttack), maxHp: Math.min(maxHpVal, maxHp) };
}

// 升级所需金币
export function getUpgradeCost(currentLevel) {
  if (currentLevel >= MAX_LEVEL) return null;
  return 100 + currentLevel * 50; // 150, 200, 250...
}

// 战斗伤害计算
export function calculateDamage(attacker, defender, battleState) {
  let damage = attacker.attack;
  
  // 应用攻击Buff
  if (battleState?.playerBuffs?.attackBoost) {
    damage = Math.round(damage * (1 + battleState.playerBuffs.attackBoost));
  }
  
  // 应用防御减伤
  if (battleState?.playerBuffs?.damageReduction) {
    damage = Math.round(damage * (1 - battleState.playerBuffs.damageReduction));
  }
  
  // 破釜沉舟的后续debuff
  if (battleState?.playerBuffs?.desperateDebuff) {
    damage = Math.round(damage * 0.5);
  }
  
  return Math.max(1, damage);
}

// 逃跑成功率
export const ESCAPE_SUCCESS_RATE = 0.5;

// 执行逃跑
export function tryEscape() {
  return Math.random() < ESCAPE_SUCCESS_RATE;
}
