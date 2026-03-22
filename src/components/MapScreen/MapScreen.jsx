import React from 'react';
import { useGame, NODES, NODE_TYPES } from '../../context/GameContext';
import './MapScreen.css';

export default function MapScreen() {
  const { state, dispatch } = useGame();
  const { map, player, tasks } = state;
  
  const handleNodeClick = (nodeId) => {
    const currentNodeId = map.currentNode;
    const currentNode = NODES.find(n => n.id === currentNodeId);
    if (!currentNode) return;
    
    // 检查是否可以访问该节点
    // 只能移动到：相邻节点 OR 前置节点（回头路），且必须已解锁
    const isAdjacent = currentNode.unlocks.includes(nodeId);
    const isPreviousNode = NODES.some(n => n.id === nodeId && n.unlocks.includes(currentNodeId));
    const isUnlocked = map.unlockedNodes.includes(nodeId);
    
    // 每次只能移动1个节点：相邻或前置，且必须已解锁
    if (!isUnlocked) return;
    if (!isAdjacent && !isPreviousNode) return;
    
    dispatch({ type: 'MOVE_TO_NODE', payload: { nodeId } });
  };
  
  const getNodeEmoji = (node) => {
    // 未解锁
    if (!map.unlockedNodes.includes(node.id)) {
      return '🔒';
    }
    // 宝箱已领取
    if (node.type === 'chest' && map.collectedChests.includes(node.id)) {
      return '📦';
    }
    return node.emoji;
  };
  
  const isReachable = (nodeId) => {
    const currentNodeId = map.currentNode;
    const currentNode = NODES.find(n => n.id === currentNodeId);
    if (!currentNode) return false;
    
    const isAdjacent = currentNode.unlocks.includes(nodeId);
    const isPreviousNode = NODES.some(n => n.id === nodeId && n.unlocks.includes(currentNodeId));
    const isUnlocked = map.unlockedNodes.includes(nodeId);
    
    // 每次只能移动1步：相邻或前置，且必须已解锁
    return isUnlocked && (isAdjacent || isPreviousNode);
  };
  
  const isVisited = (nodeId) => {
    return map.visitedNodes.includes(nodeId);
  };
  
  const isChestCollected = (nodeId) => {
    const node = NODES.find(n => n.id === nodeId);
    return node?.type === 'chest' && map.collectedChests.includes(nodeId);
  };
  
  const isCurrentNode = (nodeId) => {
    return map.currentNode === nodeId;
  };
  
  const hasActiveTask = () => {
    return tasks.active !== null;
  };
  
  const currentNode = NODES.find(n => n.id === map.currentNode);
  const reachableCount = currentNode ? currentNode.unlocks.filter(id => map.unlockedNodes.includes(id)).length : 0;
  
  return (
    <div className="map-screen">
      <div className="map-header">
        <div className="player-stats">
          <span className="stat">🧙‍♂️ Lv.{player.level}</span>
          <span className="stat">❤️ {player.hp}/{player.maxHp}</span>
          <span className="stat">💰 {player.gold}</span>
          <span className="stat">🧪 {player.items.potion || 0}</span>
        </div>
        <div className="map-controls">
          <button className="control-btn" onClick={() => dispatch({ type: 'TOGGLE_STATUS' })}>
            📊 状态
          </button>
          <button className="control-btn" onClick={() => dispatch({ type: 'TOGGLE_TASK' })}>
            📋 任务 {hasActiveTask() && <span className="red-dot">●</span>}
          </button>
        </div>
      </div>
      
      <div className="map-container">
        <svg className="map-lines" width="2600" height="500">
          {NODES.map(node => 
            node.unlocks.map(targetId => {
              const target = NODES.find(n => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.position.x}
                  y1={node.position.y}
                  x2={target.position.x}
                  y2={target.position.y}
                  className={`map-line ${isReachable(targetId) ? 'unlocked' : ''}`}
                />
              );
            })
          )}
        </svg>
        
        {NODES.map(node => (
          <div
            key={node.id}
            className={`map-node ${isCurrentNode(node.id) ? 'current' : ''} ${isReachable(node.id) ? 'reachable' : ''} ${isVisited(node.id) && !isCurrentNode(node.id) ? 'visited' : ''} ${map.unlockedNodes.includes(node.id) && !isReachable(node.id) && !isVisited(node.id) ? 'unlocked' : ''} ${!map.unlockedNodes.includes(node.id) ? 'locked' : ''}`}
            style={{ left: node.position.x, top: node.position.y }}
            onClick={() => handleNodeClick(node.id)}
          >
            <div className="node-emoji">{getNodeEmoji(node)}</div>
            <div className="node-name">{node.name}</div>
            <div className="node-type">{NODE_TYPES[node.type]?.name || node.type}</div>
            {tasks.active?.nodeId === node.id && (
              <div className="task-indicator">📋</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="map-footer">
        <p>点击可移动节点移动 · 已解锁 {map.unlockedNodes.length}/40 个节点</p>
      </div>
    </div>
  );
}
