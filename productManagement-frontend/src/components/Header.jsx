import React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import './Header.css';
const Header = ({ onAddProduct }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { handleSearch, searchQuery } = useProducts();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery || '');
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(inputValue);
    }, 300); 

    return () => clearTimeout(timeout);
  }, [inputValue, handleSearch]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"><img style={{height:'36px',width:'36px'}} src="products-logo-store.jpg"/></span>
            <h1 className="logo-text">ProductStore</h1>
          </div>
        </div>
        <div className="header-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={inputValue}
              onChange={handleInputChange}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        <div className="header-right">
          <button 
            onClick={onAddProduct}
            className="btn btn-primary add-product-btn">
            Add Product
          </button>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <div className="user-menu">
            <button 
              className="user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}>
              <span className="user-avatar">👤</span>
              <span className="user-name">{user?.username}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <p className="user-email">{user?.email}</p>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="logout-btn" >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
