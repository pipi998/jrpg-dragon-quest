import React from 'react';
import { useGame } from '../../context/GameContext';
import './TaskReward.css';

export default function TaskReward() {
  const { state, dispatch } = useGame();
  const { taskReward } = state;
  
  if (!taskReward) return null;
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_TASK_REWARD' });
  };
  
  return (
    <div className="task-reward-overlay" onClick={handleClose}>
      <div className="task-reward-box" onClick={e => e.stopPropagation()}>
        <div className="task-reward-header">
          <span className="reward-icon">🎉</span>
          <h2>任务完成！</h2>
        </div>
        
        <div className="task-reward-content">
          <div className="task-name">{taskReward.taskName}</div>
          
          <div className="reward-items">
            <div className="reward-item">
              <span className="reward-emoji">💰</span>
              <span className="reward-text">金币 +{taskReward.rewards.gold}</span>
            </div>
            <div className="reward-item">
              <span className="reward-emoji">🧪</span>
              <span className="reward-text">药水 +{taskReward.rewards.items.potion}</span>
            </div>
          </div>
        </div>
        
        <button className="reward-close-btn" onClick={handleClose}>
          确定
        </button>
      </div>
    </div>
  );
}
