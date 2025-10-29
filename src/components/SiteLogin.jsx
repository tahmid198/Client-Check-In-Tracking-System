import React, { useState } from 'react';
import { Lock, Users } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const SiteLogin = ({ onLogin }) => {
  const [selectedSite, setSelectedSite] = useState('Main Campus');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleLogin = () => {
    if (SITE_CONFIG[selectedSite].password === password) {
      onLogin(selectedSite);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center justify-center mb-4">
            {logo ? (
              <img
                src={logo}
                alt="Volunteers of America Logo"
                className="w-20 h-20 object-contain"
              />
            ) : (
              <Users className="w-20 h-20 text-indigo-600" />
            )}
          </div>
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Volunteers of America</h2>
          <div className="flex items-center justify-center">
            <Lock className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Site Access</h1>
          </div>
        </div>

        <p className="text-gray-600 text-center mb-6">
          Select your program site and enter the access password
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Site
            </label>
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {Object.keys(SITE_CONFIG).map(site => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter site password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Access Site
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 font-semibold mb-2">Demo Passwords:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>Main Campus: <span className="font-mono">main123</span></li>
            <li>Eastside Center: <span className="font-mono">east456</span></li>
            <li>Westside Hub: <span className="font-mono">west789</span></li>
            <li>Downtown Facility: <span className="font-mono">down101</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteLogin;