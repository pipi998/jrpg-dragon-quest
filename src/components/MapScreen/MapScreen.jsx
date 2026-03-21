import React from 'react';
import { useGame, NODES, NODE_TYPES } from '../../context/GameContext';
import './MapScreen.css';

export default function MapScreen() {
  const { state, dispatch } = useGame();
  const { map, player, tasks } = state;
  
  const handleNodeClick = (nodeId) => {
    if (map.unlockedNodes.includes(nodeId)) {
      dispatch({ type: 'MOVE_TO_NODE', payload: { nodeId } });
    }
  };
  
  const getNodeEmoji = (node) => {
    if (!map.unlockedNodes.includes(node.id)) {
      return '🔒';
    }
    return node.emoji;
  };
  
  const isReachable = (nodeId) => {
    return map.unlockedNodes.includes(nodeId);
  };
  
  const hasActiveTask = () => {
    return tasks.active !== null;
  };
  
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
        <svg className="map-lines" width="1800" height="500">
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
            className={`map-node ${map.currentNode === node.id ? 'current' : ''} ${isReachable(node.id) ? 'reachable' : 'locked'}`}
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
        <p>点击节点移动 · 已解锁 {map.unlockedNodes.length}/20 个节点</p>
      </div>
    </div>
  );
}
