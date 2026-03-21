import React from 'react';
import { useGame, SCREENS } from '../../context/GameContext';
import { getUpgradeCost, MAX_LEVEL } from '../../systems/battle';
import { ITEMS } from '../../data/items';
import './StatusPanel.css';

export default function StatusPanel() {
  const { state, dispatch } = useGame();
  const { player, statusPanel } = state;
  
  if (!statusPanel) return null;
  
  const upgradeCost = getUpgradeCost(player.level);
  const canUpgrade = upgradeCost && player.gold >= upgradeCost && player.level < MAX_LEVEL;
  
  const handleUpgrade = (attr) => {
    dispatch({ type: 'UPGRADE_ATTRIBUTE', payload: { attribute: attr } });
  };
  
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_STATUS' });
  };
  
  return (
    <div className="status-overlay" onClick={handleClose}>
      <div className="status-panel" onClick={e => e.stopPropagation()}>
        <div className="status-header">
          <h2>📊 人物状态</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <div className="status-content">
          <div className="player-info">
            <div className="player-avatar">🧙‍♂️</div>
            <div className="player-details">
              <h3>勇者</h3>
              <p className="level">等级 {player.level} / {MAX_LEVEL}</p>
              <div className="exp-bar">
                <div 
                  className="exp-fill" 
                  style={{ width: `${Math.min(100, (player.exp / (player.level * 100)) * 100)}%` }}
                />
              </div>
              <p className="exp-text">{player.exp} / {player.level * 100} 经验</p>
            </div>
          </div>
          
          <div className="attributes">
            <div className="attr-row">
              <span className="attr-icon">⚔️</span>
              <span className="attr-name">攻击力</span>
              <span className="attr-value">{player.attack}</span>
              <button 
                className="upgrade-btn"
                onClick={() => handleUpgrade('attack')}
                disabled={!canUpgrade}
              >
                +2 💰{upgradeCost}
              </button>
            </div>
            <div className="attr-row">
              <span className="attr-icon">❤️</span>
              <span className="attr-name">体力上限</span>
              <span className="attr-value">{player.maxHp}</span>
              <button 
                className="upgrade-btn"
                onClick={() => handleUpgrade('hp')}
                disabled={!canUpgrade}
              >
                +15 💰{upgradeCost}
              </button>
            </div>
          </div>
          
          <div className="resources">
            <div className="resource">
              <span className="res-icon">💰</span>
              <span className="res-name">金币</span>
              <span className="res-value">{player.gold}</span>
            </div>
          </div>
          
          <div className="skills-section">
            <h4>✨ 技能 ({player.skills.length})</h4>
            {player.skills.length === 0 ? (
              <p className="no-skills">暂无技能</p>
            ) : (
              <div className="skills-list">
                {player.skills.map(skill => (
                  <div key={skill.id} className="skill-item">
                    <span className="skill-emoji">{skill.emoji}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-desc">{skill.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="items-section">
            <h4>🎒 道具</h4>
            <div className="items-list">
              {Object.entries(player.items).map(([itemId, count]) => {
                const item = ITEMS[itemId];
                return (
                  <div key={itemId} className="item">
                    <span className="item-emoji">{item?.emoji || '📦'}</span>
                    <span className="item-name">{item?.name || itemId}</span>
                    <span className="item-count">x{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
