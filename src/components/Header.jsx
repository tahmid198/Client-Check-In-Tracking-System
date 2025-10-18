import React from 'react';
import { Users, Lock, Maximize } from 'lucide-react';

const Header = ({ currentSite, onLogout, isFullscreen, onToggleFullscreen }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Client Check-In System</h1>
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
            <button
              onClick={onToggleFullscreen}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
            >
              <Maximize className="w-4 h-4" />
              Fullscreen
            </button>
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