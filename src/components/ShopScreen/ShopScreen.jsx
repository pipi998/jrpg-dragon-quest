import React from 'react';
import { useGame } from '../../context/GameContext';
import { SHOP_ITEMS, ITEMS } from '../../data/items';
import './ShopScreen.css';

export default function ShopScreen() {
  const { state, dispatch } = useGame();
  const { player, shop } = state;
  
  const handleBuy = (itemId) => {
    const item = ITEMS[itemId];
    if (player.gold >= item.price) {
      dispatch({ type: 'BUY_ITEM', payload: { itemId } });
    }
  };
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_SHOP' });
  };
  
  return (
    <div className="shop-screen">
      <div className="shop-header">
        <h2>🏪 商店</h2>
        <div className="shop-gold">
          💰 {player.gold}
        </div>
      </div>
      
      <div className="shop-content">
        <div className="shop-items">
          {SHOP_ITEMS.map(itemId => {
            const item = ITEMS[itemId];
            const canBuy = player.gold >= item.price;
            return (
              <div key={itemId} className="shop-item">
                <div className="item-emoji">{item.emoji}</div>
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-desc">{item.description}</div>
                </div>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuy(itemId)}
                  disabled={!canBuy}
                >
                  💰 {item.price}
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="shop-inventory">
          <h4>🎒 背包</h4>
          <div className="inventory-list">
            {Object.entries(player.items).map(([itemId, count]) => {
              const item = ITEMS[itemId];
              if (!item) return null;
              return (
                <div key={itemId} className="inventory-item">
                  <span className="inv-emoji">{item.emoji}</span>
                  <span className="inv-name">{item.name}</span>
                  <span className="inv-count">x{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <button className="shop-close" onClick={handleClose}>
        离开商店
      </button>
    </div>
  );
}
