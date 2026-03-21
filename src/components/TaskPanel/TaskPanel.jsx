import React from 'react';
import { useGame } from '../../context/GameContext';
import './TaskPanel.css';

export default function TaskPanel() {
  const { state, dispatch } = useGame();
  const { taskPanel, tasks } = state;
  
  if (!taskPanel) return null;
  
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_TASK' });
  };
  
  return (
    <div className="task-overlay" onClick={handleClose}>
      <div className="task-panel" onClick={e => e.stopPropagation()}>
        <div className="task-header">
          <h2>📋 任务</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <div className="task-content">
          <div className="task-section">
            <h4>进行中</h4>
            {tasks.active ? (
              <div className="task-item active">
                <div className="task-icon">📋</div>
                <div className="task-info">
                  <div className="task-name">{tasks.active.name}</div>
                  <div className="task-desc">{tasks.active.description}</div>
                </div>
              </div>
            ) : (
              <p className="no-task">暂无进行中的任务</p>
            )}
          </div>
          
          <div className="task-section">
            <h4>已完成 ({tasks.completed.length})</h4>
            {tasks.completed.length === 0 ? (
              <p className="no-task">暂无已完成的任务</p>
            ) : (
              <div className="completed-list">
                {tasks.completed.map(taskId => (
                  <div key={taskId} className="task-item completed">
                    <div className="task-icon">✅</div>
                    <div className="task-info">
                      <div className="task-name">{taskId}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
