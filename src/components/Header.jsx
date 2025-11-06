import React from 'react';
import { Users, Lock, Maximize, Settings } from 'lucide-react';

const Header = ({ currentSite, onLogout, isFullscreen, onToggleFullscreen, onOpenSettings }) => {
  // Try to load logo if it exists, otherwise use default icon
  let logo = null;
  try {
    // Try PNG first, then SVG
    try {
      logo = require('../assets/voa-logo.png');
    } catch (e) {
      logo = require('../assets/voa-logo.svg');
    }
  } catch (e) {
    // Logo not found, will use default icon
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {logo ? (
            <img
              src={logo}
              alt="Volunteers of America Logo"
              className="w-16 h-16 object-contain"
            />
          ) : (
            <Users className="w-16 h-16 text-indigo-600" />
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-indigo-700">Volunteers of America</h2>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Client Check-In System</h1>
            <p className="text-sm text-gray-600 mt-1">
              Logged in to: <span className="font-semibold text-indigo-600">{currentSite}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Time</p>
            <p className="text-lg font-semibold text-gray-700">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {!isFullscreen && (
            <>
              <button
                onClick={onToggleFullscreen}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
              >
                <Maximize className="w-4 h-4" />
                Fullscreen
              </button>
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                title="User Management"
              >
                <Settings className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <Lock className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;