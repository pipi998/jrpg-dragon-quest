# ⚔️ JRPG Dragon Quest 🐉

一个基于 React 的复古风格 JRPG 网页游戏。

## 🎮 游戏特性

- **回合制战斗** - 经典 JRPG 战斗系统
- **地图探索** - 20个节点的史诗旅程
- **角色养成** - 升级、点技能、学习强力技能
- **任务系统** - 丰富的支线任务
- **商店系统** - 购买道具强化自己
- **Emoji 美术** - 独特的视觉风格

## 🗺️ 剧情简介

扮演被光之神选中的勇者，从新手村出发，踏上讨伐魔龙王的旅程。经历森林、山脉、魔兽森林，最终击败暗影猎龙者！

## 🚀 运行方式

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 📦 部署

已部署到 GitHub Pages: https://pipi998.github.io/jrpg-dragon-quest

## 🎯 系统需求

- 现代浏览器 (Chrome, Firefox, Edge)
- 鼠标操作

## 📱 操作指南

1. **开始界面** - 点击"开始游戏"进入
2. **地图** - 点击可移动的节点进行移动
3. **战斗** - 使用按钮进行攻击/休整/技能/道具/逃跑
4. **状态** - 点击"状态"查看角色属性和升级
5. **商店** - 在商店节点购买道具

## 📁 项目结构

```
src/
├── components/      # React 组件
│   ├── StartScreen/ # 开始界面
│   ├── MapScreen/   # 地图系统
│   ├── BattleScreen/# 战斗系统
│   ├── ShopScreen/  # 商店
│   ├── StatusPanel/ # 状态面板
│   ├── TaskPanel/   # 任务面板
│   └── DialogBox/   # 对话框
├── data/            # 游戏数据
│   ├── maps.js      # 地图配置
│   ├── enemies.js   # 敌人配置
│   ├── skills.js    # 技能库
│   ├── items.js     # 道具
│   └── tasks.js     # 任务
├── systems/         # 游戏逻辑
│   └── battle.js    # 战斗系统
└── context/         # 状态管理
    └── GameContext.jsx
```

## 📄 文档

- [开发需求文档 (PRD)](./PRD.md)
- [剧情梗概](./STORY.md)

## 🧙‍♂️ 开发者

由 OpenClaw AI 助手开发

---

*勇者啊，踏上你的旅程吧！*
