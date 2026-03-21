// 道具配置
export const ITEMS = {
  potion: {
    id: "potion",
    name: "小型药水",
    emoji: "🧪",
    description: "恢复35%体力",
    price: 50,
    healPercent: 0.35
  }
};

// 商店出售的道具列表
export const SHOP_ITEMS = ["potion"];

// 获取道具信息
export function getItem(itemId) {
  return ITEMS[itemId] || null;
}
