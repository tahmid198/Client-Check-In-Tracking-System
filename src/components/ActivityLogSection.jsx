import React from 'react';
import { Clock } from 'lucide-react';
import ActivityItem from './ActivityItem';

const ActivityLogSection = ({ currentSite, todayActivities, formatTime }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Today's Activity - {currentSite}</h2>
      </div>

      {todayActivities.length > 0 ? (
        <div className="space-y-2">
          {todayActivities.map(activity => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              formatTime={formatTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Clock className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p>No activity recorded today at this site.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLogSection;