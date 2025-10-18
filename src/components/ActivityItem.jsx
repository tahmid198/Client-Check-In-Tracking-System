import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

const ActivityItem = ({ activity, formatTime }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          activity.action === 'IN' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {activity.action === 'IN' ? (
            <LogIn className="w-8 h-8 text-green-600" />
          ) : (
            <LogOut className="w-8 h-8 text-red-600" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{activity.clientName}</h3>
          <p className="text-sm text-gray-600">Apartment {activity.apartment}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${
          activity.action === 'IN' ? 'text-green-600' : 'text-red-600'
        }`}>
          {activity.action === 'IN' ? 'CHECKED IN' : 'CHECKED OUT'}
        </p>
        <p className="text-sm text-gray-600">{formatTime(activity.timestamp)}</p>
      </div>
    </div>
  );
};

export default ActivityItem;