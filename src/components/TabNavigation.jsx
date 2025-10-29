import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setActiveTab('signin')}
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
          activeTab === 'signin'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Client Check In/Out
      </button>
      <button
        onClick={() => setActiveTab('visitors')}
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
          activeTab === 'visitors'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Visitor Sign In/Out
      </button>
      <button
        onClick={() => setActiveTab('log')}
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
          activeTab === 'log'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Today's Activity
      </button>
    </div>
  );
};

export default TabNavigation;