import { BellIcon, Moon, Sun, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { FiMoon, FiSun, FiVolume2, FiBell } from 'react-icons/fi';

export default function Settings({darkMode,setDarkMode}) {
  // const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="page settings-page">
      <h1>App Settings</h1>
      
      <div className="settings-grid">
        {/* Theme Setting */}
        <div className="setting-card">
          <h2><Moon /> Appearance</h2>
          <div className="setting-option">
            <label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              Dark Mode
            </label>
            <span className="theme-icon">
              {darkMode ? <Sun /> : <Moon />}
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="setting-card">
          <h2><BellIcon /> Notifications</h2>
          <div className="setting-option">
            <label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              Enable Notifications
            </label>
          </div>
        </div>

        {/* Sound Effects */}
        <div className="setting-card">
          <h2><Volume2 /> Sound</h2>
          <div className="setting-option">
            <label>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={() => setSoundEffects(!soundEffects)}
              />
              Enable Sound Effects
            </label>
          </div>
        </div>

        {/* Font Size */}
        <div className="setting-card">
          <h2>Text Size</h2>
          <div className="setting-option">
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
            <span className="font-size-preview" style={{ fontSize: `${fontSize}px` }}>
              Sample Text ({fontSize}px)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}