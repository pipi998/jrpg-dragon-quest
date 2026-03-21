import React, { useState } from 'react';
import { useGame, SCREENS } from '../../context/GameContext';
import './DialogBox.css';

export default function DialogBox() {
  const { state, dispatch } = useGame();
  const { dialog, battle } = state;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!dialog) return null;
  
  const messages = dialog.messages || [];
  const currentMessage = messages[currentIndex];
  const isLast = currentIndex >= messages.length - 1;
  
  const handleClick = () => {
    if (isLast) {
      // 关闭对话框
      dispatch({ type: 'CLOSE_DIALOG' });
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  return (
    <div className="dialog-overlay" onClick={handleClick}>
      <div className="dialog-box" onClick={e => e.stopPropagation()}>
        <div className="dialog-speaker">
          <span className="speaker-emoji">
            {currentMessage?.speaker?.split(' ')[0] || '💬'}
          </span>
          <span className="speaker-name">
            {currentMessage?.speaker?.replace(/^\S+\s*/, '') || '??? '}
          </span>
        </div>
        <div className="dialog-content">
          {currentMessage?.text || ''}
        </div>
        <div className="dialog-hint">
          {isLast ? '点击关闭' : '点击继续 ▼'}
        </div>
      </div>
    </div>
  );
}
