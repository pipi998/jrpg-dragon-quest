import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './BattleScreen.css';

export default function BattleScreen() {
  const { state, dispatch } = useGame();
  const { battle, player } = state;
  const [showSkillPanel, setShowSkillPanel] = useState(false);
  
  if (!battle) return null;
  
  const handleAction = (action) => {
    dispatch({ type: 'BATTLE_ACTION', payload: { action } });
  };
  
  const handleUseSkill = (skillId) => {
    dispatch({ type: 'BATTLE_ACTION', payload: { action: 'use_skill', skillId } });
    setShowSkillPanel(false);
  };
  
  const handleEndBattle = () => {
    dispatch({ type: 'END_BATTLE' });
  };
  
  const { enemy, playerHp, turn, logs, skillUses } = battle;
  const isPlayerTurn = turn === 'player';
  const isDefeated = enemy.hp <= 0;
  const isDead = playerHp <= 0;
  
  // 获取技能剩余使用次数
  const getSkillRemainingUses = (skillId) => {
    const used = skillUses?.[skillId] || 0;
    return 3 - used;
  };
  
  return (
    <div className="battle-screen">
      <div className="battle-header">
        <h2>⚔️ 战斗</h2>
      </div>
      
      <div className="battle-arena">
        {/* 敌方 */}
        <div className={`enemy-side ${isDefeated ? 'defeated' : ''}`}>
          <div className="enemy-emoji">
            {isDefeated ? '💀' : enemy.emoji}
          </div>
          <div className="enemy-name">{enemy.name}</div>
          <div className="enemy-hp">
            <div 
              className="hp-bar enemy-hp-bar"
              style={{ width: `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%` }}
            />
            <span className="hp-text">
              {Math.max(0, enemy.hp)} / {enemy.maxHp}
            </span>
          </div>
          {enemy.isBoss && <div className="boss-label">BOSS</div>}
        </div>
        
        {/* 玩家侧 */}
        <div className={`player-side ${isDead ? 'dead' : ''}`}>
          <div className="player-emoji">🧙‍♂️</div>
          <div className="player-name">勇者</div>
          <div className="player-hp">
            <div 
              className="hp-bar player-hp-bar"
              style={{ width: `${(playerHp / player.maxHp) * 100}%` }}
            />
            <span className="hp-text">
              {playerHp} / {player.maxHp}
            </span>
          </div>
          {player.skills.length > 0 && (
            <div className="player-skills">
              {player.skills.map(skill => {
                const remaining = getSkillRemainingUses(skill.id);
                return (
                  <span 
                    key={skill.id} 
                    className={`skill-badge ${remaining === 0 ? 'skill-exhausted' : ''}`} 
                    title={`${skill.name}: ${skill.description} (剩余 ${remaining}/3 次)`}
                  >
                    {skill.emoji}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* 战斗日志 */}
      <div className="battle-logs">
        {logs.slice(-6).map((log, index) => (
          <div key={index} className="log-line">{log}</div>
        ))}
      </div>
      
      {/* 技能面板 */}
      {showSkillPanel && player.skills.length > 0 && (
        <div className="skill-panel">
          <div className="skill-panel-title">🎯 选择技能 (每场战斗限3次)</div>
          <div className="skill-buttons">
            {player.skills.map(skill => {
              const remaining = getSkillRemainingUses(skill.id);
              const isExhausted = remaining === 0;
              return (
                <button
                  key={skill.id}
                  className={`skill-btn ${isExhausted ? 'disabled' : ''}`}
                  onClick={() => handleUseSkill(skill.id)}
                  disabled={!isPlayerTurn || isExhausted}
                  title={skill.description}
                >
                  <span className="skill-icon">{skill.emoji}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-uses">{remaining}/3</span>
                </button>
              );
            })}
          </div>
          <button 
            className="close-skill-panel"
            onClick={() => setShowSkillPanel(false)}
          >
            关闭
          </button>
        </div>
      )}
      
      {/* 操作面板 */}
      {!isDefeated && !isDead && !battle.escaped && !showSkillPanel && (
        <div className="battle-actions">
          <button 
            className="action-btn attack"
            onClick={() => handleAction('attack')}
            disabled={!isPlayerTurn}
          >
            ⚔️ 攻击
          </button>
          <button 
            className="action-btn rest"
            onClick={() => handleAction('rest')}
            disabled={!isPlayerTurn}
          >
            💤 休整
          </button>
          <button 
            className="action-btn potion"
            onClick={() => handleAction('use_potion')}
            disabled={!isPlayerTurn || (player.items.potion || 0) <= 0}
            title={`药水: ${player.items.potion || 0}`}
          >
            🧪 药水 ({player.items.potion || 0})
          </button>
          {player.skills.length > 0 && (
            <button 
              className="action-btn skill"
              onClick={() => setShowSkillPanel(true)}
              disabled={!isPlayerTurn}
            >
              ✨ 技能
            </button>
          )}
          <button 
            className="action-btn escape"
            onClick={() => handleAction('escape')}
            disabled={!isPlayerTurn}
          >
            🏃 逃跑
          </button>
        </div>
      )}
      
      {/* 战斗结束 */}
      {(isDefeated || isDead || battle.escaped) && (
        <div className="battle-end">
          {isDefeated && <div className="victory">🎉 胜利！</div>}
          {isDead && <div className="defeat">💀 战斗失败...</div>}
          {battle.escaped && <div className="escaped">🏃 逃跑成功！</div>}
          <button className="continue-btn" onClick={handleEndBattle}>
            继续
          </button>
        </div>
      )}
    </div>
  );
}
