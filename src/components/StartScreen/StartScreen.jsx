import React from 'react';
import { useGame } from '../../context/GameContext';
import './StartScreen.css';

export default function StartScreen() {
  const { dispatch } = useGame();
  
  const handleStart = () => {
    dispatch({ type: 'START_GAME' });
  };
  
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="game-title">⚔️ 勇者斗恶龙 🐉</h1>
        <p className="game-subtitle">Jrpg Adventure</p>
        <button className="start-button" onClick={handleStart}>
          开始游戏
        </button>
        <p className="version">v1.0.0</p>
      </div>
    </div>
  );
}
