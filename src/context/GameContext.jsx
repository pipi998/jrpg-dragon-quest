import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_PLAYER, calculateLevelStats, getExpForLevel, MAX_LEVEL, calculateDamage, tryEscape } from '../systems/battle';
import { NODES, NODE_TYPES } from '../data/maps';
import { ENEMIES } from '../data/enemies';
import { TASKS, calculateTaskReward } from '../data/tasks';
import { getItem } from '../data/items';
import { getSkillForLevel } from '../data/skills';

// 游戏屏幕
export const SCREENS = {
  START: 'start',
  MAP: 'map',
  BATTLE: 'battle',
  SHOP: 'shop',
  DIALOG: 'dialog',
  TASK_REWARD: 'task_reward'  // 新增：任务奖励弹窗
};

// 任务奖励弹窗组件数据
let TaskRewardPopup = null;

// 初始状态
const initialState = {
  screen: SCREENS.START,
  player: { ...INITIAL_PLAYER },
  map: {
    currentNode: 0,
    unlockedNodes: [0],
    visitedNodes: [0],      // 已访问节点（用于宝箱）
    collectedChests: []     // 已领取的宝箱
  },
  battle: null,
  dialog: null,
  shop: null,
  statusPanel: false,
  taskPanel: false,
  tasks: {
    active: null,
    completed: []
  },
  notifications: [],
  taskReward: null  // 任务奖励数据
};

// 游戏Reducer
function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      // 初始解锁节点0的相邻节点
      const startNode = NODES.find(n => n.id === 0);
      const initialUnlocked = startNode ? [0, ...startNode.unlocks] : [0];
      
      return {
        ...state,
        screen: SCREENS.MAP,
        player: { ...INITIAL_PLAYER },
        map: {
          currentNode: 0,
          unlockedNodes: initialUnlocked,
          visitedNodes: [0],
          collectedChests: []
        },
        tasks: { active: null, completed: [] }
      };
    
    // 节点移动
    case 'MOVE_TO_NODE': {
      const { nodeId } = action.payload;
      const node = NODES.find(n => n.id === nodeId);
      const currentNode = NODES.find(n => n.id === state.map.currentNode);
      
      // 检查是否只能移动1个节点（相邻节点）
      if (currentNode && !currentNode.unlocks.includes(nodeId)) {
        return state;  // 不能移动到非相邻节点
      }
      
      // 检查宝箱是否已领取（宝箱只能领取一次）
      const isChestCollected = node?.type === 'chest' && state.map.collectedChests.includes(nodeId);
      
      // 检查任务是否已完成
      const isTaskCompleted = node?.taskId && state.tasks.completed.includes(node.taskId);
      
      // 计算新解锁的节点
      const newUnlocked = [...new Set([...state.map.unlockedNodes, ...(node?.unlocks || [])])];
      
      // 触发节点事件
      let newState = {
        ...state,
        map: {
          currentNode: nodeId,
          unlockedNodes: newUnlocked,
          visitedNodes: [...new Set([...state.map.visitedNodes, nodeId])],
          collectedChests: [...state.map.collectedChests]
        },
        statusPanel: false,
        taskPanel: false
      };
      
      // 根据节点类型触发不同事件
      if (node) {
        // 任务节点 - 只有未完成时才发布任务
        if (node.type === 'task') {
          if (node.taskId && !isTaskCompleted) {
            const task = TASKS[node.taskId];
            if (task) {
              newState.tasks.active = { ...task, nodeId };
            }
          }
          // 显示对话
          if (node.dialogue?.intro) {
            newState.dialog = { 
              messages: node.dialogue.intro,
              onComplete: null
            };
            newState.screen = SCREENS.DIALOG;
            return newState;
          }
        }
        
        // 战斗/任务战斗/BOSS节点 - 总是触发战斗
        if (node.type === 'battle' || node.type === 'battle_boss' || node.type === 'task_battle') {
          // 如果有对话，先显示对话
          if (node.dialogue?.intro) {
            newState.dialog = { 
              messages: node.dialogue.intro,
              onComplete: {
                type: 'START_BATTLE',
                nodeId: node.id,
                enemyId: node.enemyId
              }
            };
            newState.screen = SCREENS.DIALOG;
            return newState;
          }
          // 没有对话直接进入战斗
          newState.battle = {
            enemy: { ...ENEMIES[node.enemyId] },
            playerHp: state.player.hp,
            turn: 'player',
            logs: [`遭遇 ${ENEMIES[node.enemyId].name}！`],
            escaped: false,
            nodeId
          };
          newState.screen = SCREENS.BATTLE;
          return newState;
        }
        
        // 宝箱节点 - 只有未领取时才发放奖励
        if (node.type === 'chest') {
          if (!isChestCollected) {
            // 标记宝箱为已领取
            newState.map.collectedChests = [...state.map.collectedChests, nodeId];
            
            const reward = node.reward || { gold: 30 };
            const newItems = { ...state.player.items };
            if (reward.items) {
              Object.keys(reward.items).forEach(itemId => {
                newItems[itemId] = (newItems[itemId] || 0) + reward.items[itemId];
              });
            }
            newState.player = {
              ...state.player,
              gold: state.player.gold + (reward.gold || 0),
              items: newItems
            };
            
            // 显示对话
            if (node.dialogue?.intro) {
              newState.dialog = { 
                messages: node.dialogue.intro,
                onComplete: null
              };
              newState.screen = SCREENS.DIALOG;
              return newState;
            } else {
              newState.notifications = [{
                id: Date.now(),
                message: `获得 ${reward.gold || 0} 金币${reward.items ? ` 和 ${reward.items.potion || 0} 药水` : ''}`
              }];
            }
          } else {
            // 宝箱已领取，提示
            newState.notifications = [{
              id: Date.now(),
              message: '宝箱已经领取过了'
            }];
          }
        }
        
        // 休息节点 - 总是恢复体力
        if (node.type === 'rest') {
          // 先显示对话
          if (node.dialogue?.intro) {
            newState.dialog = { 
              messages: node.dialogue.intro,
              onComplete: {
                type: 'REST',
                nodeId: node.id
              }
            };
            newState.screen = SCREENS.DIALOG;
            return newState;
          }
          // 没有对话直接休息
          newState.player = {
            ...state.player,
            hp: state.player.maxHp
          };
          newState.notifications = [{
            id: Date.now(),
            message: '体力已恢复！'
          }];
        }
        
        // 商店节点 - 总是打开商店
        if (node.type === 'shop') {
          // 先显示对话
          if (node.dialogue?.intro) {
            newState.dialog = { 
              messages: node.dialogue.intro,
              onComplete: {
                type: 'OPEN_SHOP',
                nodeId: node.id
              }
            };
            newState.screen = SCREENS.DIALOG;
          } else {
            newState.shop = { nodeId };
            newState.screen = SCREENS.SHOP;
          }
        }
      }
      
      return newState;
    }
    
    // 开始战斗（对话完成后调用）
    case 'START_BATTLE': {
      const { nodeId, enemyId } = action.payload;
      const enemy = ENEMIES[enemyId];
      
      return {
        ...state,
        screen: SCREENS.BATTLE,
        battle: {
          enemy: { ...enemy },
          playerHp: state.player.hp,
          turn: 'player',
          logs: [`遭遇 ${enemy.name}！`],
          escaped: false,
          nodeId
        },
        dialog: null
      };
    }
    
    // 休息（对话完成后调用）
    case 'REST': {
      return {
        ...state,
        player: {
          ...state.player,
          hp: state.player.maxHp
        },
        notifications: [{
          id: Date.now(),
          message: '体力已恢复！'
        }],
        dialog: null
      };
    }
    
    // 打开商店（对话完成后调用）
    case 'OPEN_SHOP': {
      const { nodeId } = action.payload;
      return {
        ...state,
        shop: { nodeId },
        screen: SCREENS.SHOP,
        dialog: null
      };
    }
    
    case 'BATTLE_ACTION': {
      const { action: battleAction } = action.payload;
      const battle = state.battle;
      if (!battle || battle.turn !== 'player') return state;
      
      const player = state.player;
      let newBattle = { ...battle };
      let newPlayer = { ...player };
      let logs = [...battle.logs];
      let battleFinished = false;
      let escaped = false;
      let showVictoryDialog = false;
      
      switch (battleAction) {
        case 'attack': {
          const damage = calculateDamage(player, battle.enemy, battle);
          newBattle.enemy.hp = battle.enemy.hp - damage;
          logs.push(`你对 ${battle.enemy.name} 造成了 ${damage} 点伤害！`);
          
          if (newBattle.enemy.hp <= 0) {
            battleFinished = true;
            logs.push(`🎉 胜利！获得 ${battle.enemy.gold} 金币！`);
            newPlayer.gold = player.gold + battle.enemy.gold;
            
            // 检查是否有胜利对话
            const currentNode = NODES.find(n => n.id === battle.nodeId);
            if (currentNode?.dialogue?.victory) {
              showVictoryDialog = true;
            }
            
            // 检查升级
            const newExp = player.exp + battle.enemy.gold;
            const expNeeded = getExpForLevel(player.level);
            if (newExp >= expNeeded && player.level < MAX_LEVEL) {
              newPlayer.level = player.level + 1;
              newPlayer.exp = newExp - expNeeded;
              const stats = calculateLevelStats(newPlayer.level);
              newPlayer.attack = stats.attack;
              newPlayer.maxHp = stats.maxHp;
              newPlayer.hp = stats.maxHp;
              logs.push(`🎊 升级到 ${newPlayer.level} 级！攻击力: ${newPlayer.attack}, 体力: ${newPlayer.hp}`);
              
              // 检查技能学习
              const newSkill = getSkillForLevel(newPlayer.level);
              if (newSkill) {
                if (!newPlayer.skills.find(s => s.id === newSkill.id)) {
                  newPlayer.skills = [...newPlayer.skills, newSkill];
                  logs.push(`✨ 学会新技能：${newSkill.name}！`);
                }
              }
            } else {
              newPlayer.exp = newExp;
            }
          }
          break;
        }
        
        case 'rest': {
          const healAmount = Math.floor(player.maxHp * 0.15);
          newPlayer.hp = Math.min(player.maxHp, player.hp + healAmount);
          logs.push(`你休整了一下恢复了 ${healAmount} 点体力！`);
          break;
        }
        
        case 'escape': {
          escaped = tryEscape();
          if (escaped) {
            logs.push('🏃 逃跑成功！');
            newBattle.escaped = true;
          } else {
            logs.push('❌ 逃跑失败！');
          }
          break;
        }
        
        case 'use_potion': {
          if (player.items.potion > 0) {
            const potion = getItem('potion');
            const healAmount = Math.floor(player.maxHp * potion.healPercent);
            newPlayer.hp = Math.min(player.maxHp, player.hp + healAmount);
            newPlayer.items.potion = player.items.potion - 1;
            logs.push(`使用药水恢复了 ${healAmount} 点体力！`);
          }
          break;
        }
      }
      
      // 敌人回合
      if (!battleFinished && !escaped && newBattle.turn === 'player') {
        const enemyDamage = Math.max(1, battle.enemy.attack - Math.floor(player.level * 0.5));
        newPlayer.hp = Math.max(0, newPlayer.hp - enemyDamage);
        logs.push(`${battle.enemy.name} 对你造成了 ${enemyDamage} 点伤害！`);
        
        if (newPlayer.hp <= 0) {
          battleFinished = true;
          logs.push('💀 战斗失败！你被送回了村庄...');
        }
        
        // 敌人攻击后切换回玩家回合
        newBattle.turn = 'player';
      }
      
      newBattle.playerHp = newPlayer.hp;
      newBattle.logs = logs;
      
      // 如果有胜利对话，延迟处理
      if (showVictoryDialog) {
        return {
          ...state,
          battle: newBattle,
          player: newPlayer,
          battleFinished: true,
          escaped
        };
      }
      
      return {
        ...state,
        battle: newBattle,
        player: newPlayer,
        battleFinished,
        escaped
      };
    }
    
    case 'END_BATTLE': {
      const currentNode = NODES.find(n => n.id === state.map.currentNode);
      
      // 检查是否有胜利对话需要显示
      if (currentNode?.dialogue?.victory && state.battle?.enemy?.hp <= 0) {
        return {
          ...state,
          dialog: {
            messages: currentNode.dialogue.victory,
            onComplete: {
              type: 'BATTLE_VICTORY_COMPLETE'
            }
          },
          screen: SCREENS.DIALOG,
          battle: null
        };
      }
      
      if (state.battle?.playerHp <= 0) {
        // 战斗失败，回满血
        return {
          ...state,
          screen: SCREENS.MAP,
          battle: null,
          player: {
            ...state.player,
            hp: state.player.maxHp
          }
        };
      }
      
      // 战斗胜利，检查任务
      let newState = {
        ...state,
        screen: SCREENS.MAP,
        battle: null
      };
      
      // 完成任务
      const activeTask = state.tasks.active;
      if (activeTask && state.battle?.enemy) {
        if (activeTask.type === 'battle' || activeTask.target === state.battle.enemy.id) {
          const rewards = calculateTaskReward(activeTask, state.player.level);
          newState.player = {
            ...state.player,
            gold: state.player.gold + rewards.gold,
            items: {
              ...state.player.items,
              potion: (state.player.items.potion || 0) + (rewards.items.potion || 0)
            }
          };
          newState.tasks = {
            ...state.tasks,
            active: null,
            completed: [...state.tasks.completed, activeTask.id]
          };
          // 显示任务奖励弹窗
          newState.taskReward = {
            taskName: activeTask.name,
            rewards: rewards
          };
          newState.screen = SCREENS.TASK_REWARD;
        }
      }
      
      // 解锁下一个节点
      if (currentNode?.unlocks?.length > 0) {
        newState.map = {
          ...state.map,
          unlockedNodes: [...new Set([...state.map.unlockedNodes, ...currentNode.unlocks])]
        };
      }
      
      return newState;
    }
    
    // 战斗胜利对话完成后
    case 'BATTLE_VICTORY_COMPLETE': {
      let newState = {
        ...state,
        screen: SCREENS.MAP,
        dialog: null
      };
      
      // 完成任务
      const activeTask = state.tasks.active;
      if (activeTask) {
        const rewards = calculateTaskReward(activeTask, state.player.level);
        newState.player = {
          ...state.player,
          gold: state.player.gold + rewards.gold,
          items: {
            ...state.player.items,
            potion: (state.player.items.potion || 0) + (rewards.items.potion || 0)
          }
        };
        newState.tasks = {
          ...state.tasks,
          active: null,
          completed: [...state.tasks.completed, activeTask.id]
        };
        // 显示任务奖励弹窗
        newState.taskReward = {
          taskName: activeTask.name,
          rewards: rewards
        };
        newState.screen = SCREENS.TASK_REWARD;
      }
      
      // 解锁下一个节点
      const currentNode = NODES.find(n => n.id === state.map.currentNode);
      if (currentNode?.unlocks?.length > 0) {
        newState.map = {
          ...state.map,
          unlockedNodes: [...new Set([...state.map.unlockedNodes, ...currentNode.unlocks])]
        };
      }
      
      return newState;
    }
    
    // 关闭任务奖励弹窗
    case 'CLOSE_TASK_REWARD': {
      return {
        ...state,
        screen: SCREENS.MAP,
        taskReward: null
      };
    }
    
    case 'UPGRADE_ATTRIBUTE': {
      const { attribute } = action.payload;
      const cost = getUpgradeCost(state.player.level);
      
      if (!cost || state.player.gold < cost) return state;
      
      const newPlayer = { ...state.player, gold: state.player.gold - cost };
      
      if (attribute === 'attack') {
        newPlayer.attack = state.player.attack + 2;
      } else if (attribute === 'hp') {
        newPlayer.maxHp = state.player.maxHp + 15;
        newPlayer.hp = state.player.hp + 15;
      }
      
      return { ...state, player: newPlayer };
    }
    
    case 'BUY_ITEM': {
      const { itemId } = action.payload;
      const item = getItem(itemId);
      if (!item || state.player.gold < item.price) return state;
      
      return {
        ...state,
        player: {
          ...state.player,
          gold: state.player.gold - item.price,
          items: {
            ...state.player.items,
            [itemId]: (state.player.items[itemId] || 0) + 1
          }
        }
      };
    }
    
    case 'SHOW_DIALOG': {
      return {
        ...state,
        screen: SCREENS.DIALOG,
        dialog: action.payload,
        statusPanel: false,
        taskPanel: false
      };
    }
    
    case 'CLOSE_DIALOG': {
      const dialog = state.dialog;
      
      // 如果有回调，执行回调
      if (dialog?.onComplete) {
        const { type } = dialog.onComplete;
        
        if (type === 'START_BATTLE') {
          return gameReducer(state, { 
            type: 'START_BATTLE', 
            payload: { 
              nodeId: dialog.onComplete.nodeId, 
              enemyId: dialog.onComplete.enemyId 
            } 
          });
        }
        if (type === 'REST') {
          return gameReducer(state, { 
            type: 'REST', 
            payload: { nodeId: dialog.onComplete.nodeId } 
          });
        }
        if (type === 'OPEN_SHOP') {
          return gameReducer(state, { 
            type: 'OPEN_SHOP', 
            payload: { nodeId: dialog.onComplete.nodeId } 
          });
        }
      }
      
      return {
        ...state,
        screen: state.battle ? SCREENS.BATTLE : SCREENS.MAP,
        dialog: null
      };
    }
    
    case 'TOGGLE_STATUS':
      return { ...state, statusPanel: !state.statusPanel };
    
    case 'TOGGLE_TASK':
      return { ...state, taskPanel: !state.taskPanel };
    
    case 'CLOSE_SHOP':
      return { ...state, screen: SCREENS.MAP, shop: null };
    
    case 'DISMISS_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload.id)
      };
    }
    
    case 'LOAD_SAVE': {
      return { ...action.payload };
    }
    
    default:
      return state;
  }
}

// Context
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // 自动保存
  useEffect(() => {
    const saveData = {
      ...state,
      screen: state.screen === SCREENS.DIALOG ? SCREENS.MAP : state.screen
    };
    localStorage.setItem('jrpg_save', JSON.stringify(saveData));
  }, [state]);
  
  // 加载存档
  useEffect(() => {
    const saved = localStorage.getItem('jrpg_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.player) {
          dispatch({ type: 'LOAD_SAVE', payload: { ...initialState, ...data } });
        }
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
  }, []);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export { NODES, NODE_TYPES, ENEMIES, TASKS };
