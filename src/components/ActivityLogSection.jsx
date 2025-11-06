import React, { useState, useMemo } from 'react';
import { Clock, Calendar } from 'lucide-react';
import ActivityItem from './ActivityItem';

const ActivityLogSection = ({ currentSite, activities, formatTime }) => {
  const [dateFilter, setDateFilter] = useState('today');
  const [customDays, setCustomDays] = useState(7);

  // Filter activities based on selected date range
  const filteredActivities = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return activities.filter(activity => {
      const activityDate = new Date(activity.timestamp);

      switch(dateFilter) {
        case 'today':
          return activityDate >= todayStart;
        case 'yesterday': {
          const yesterdayStart = new Date(todayStart);
          yesterdayStart.setDate(yesterdayStart.getDate() - 1);
          return activityDate >= yesterdayStart && activityDate < todayStart;
        }
        case 'week': {
          const weekStart = new Date(todayStart);
          weekStart.setDate(weekStart.getDate() - 7);
          return activityDate >= weekStart;
        }
        case 'month': {
          const monthStart = new Date(todayStart);
          monthStart.setDate(monthStart.getDate() - 30);
          return activityDate >= monthStart;
        }
        case 'custom': {
          const customStart = new Date(todayStart);
          customStart.setDate(customStart.getDate() - customDays);
          return activityDate >= customStart;
        }
        case 'all':
          return true;
        default:
          return true;
      }
    });
  }, [activities, dateFilter, customDays]);

  // Group activities by date
  const groupedActivities = useMemo(() => {
    const groups = {};

    filteredActivities.forEach(activity => {
      const date = new Date(activity.timestamp).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });

    return groups;
  }, [filteredActivities]);

  const sortedDates = Object.keys(groupedActivities).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Activity Log - {currentSite}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="custom">Custom Days</option>
            <option value="all">All Time</option>
          </select>

          {dateFilter === 'custom' && (
            <input
              type="number"
              min="1"
              max="365"
              value={customDays}
              onChange={(e) => setCustomDays(parseInt(e.target.value) || 7)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Days"
            />
          )}
        </div>
      </div>

      {filteredActivities.length > 0 ? (
        <div className="space-y-6">
          {sortedDates.map(date => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-indigo-200">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">{date}</h3>
                <span className="text-sm text-gray-500">({groupedActivities[date].length} activities)</span>
              </div>
              <div className="space-y-2 ml-6">
                {groupedActivities[date].map(activity => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    formatTime={formatTime}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Clock className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p>No activity recorded for the selected period.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLogSection;