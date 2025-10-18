import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const SiteLogin = ({ onLogin }) => {
  const [selectedSite, setSelectedSite] = useState('Main Campus');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-12 h-12 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Site Access</h1>
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