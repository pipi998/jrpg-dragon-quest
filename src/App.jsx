import React, { useEffect } from 'react';
import { GameProvider, useGame, SCREENS } from './context/GameContext';
import StartScreen from './components/StartScreen/StartScreen';
import MapScreen from './components/MapScreen/MapScreen';
import BattleScreen from './components/BattleScreen/BattleScreen';
import ShopScreen from './components/ShopScreen/ShopScreen';
import StatusPanel from './components/StatusPanel/StatusPanel';
import TaskPanel from './components/TaskPanel/TaskPanel';
import DialogBox from './components/DialogBox/DialogBox';
import './App.css';

function Game() {
  const { state, dispatch } = useGame();
  const { screen, notifications } = state;
  
  // 通知自动消失
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'DISMISS_NOTIFICATION', payload: { id: notifications[0].id } });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications, dispatch]);
  
  const renderScreen = () => {
    switch (screen) {
      case SCREENS.START:
        return <StartScreen />;
      case SCREENS.MAP:
        return <MapScreen />;
      case SCREENS.BATTLE:
        return <BattleScreen />;
      case SCREENS.SHOP:
        return <ShopScreen />;
      default:
        return <StartScreen />;
    }
  };
  
  return (
    <div className="game">
      {renderScreen()}
      <StatusPanel />
      <TaskPanel />
      <DialogBox />
      
      {/* 通知 */}
      <div className="notifications">
        {notifications.map(notif => (
          <div key={notif.id} className="notification">
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
