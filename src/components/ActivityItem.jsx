import React from 'react';
import { LogIn, LogOut, Users } from 'lucide-react';

const ActivityItem = ({ activity, formatTime }) => {
  const hasFamilyMembers = activity.familyMembers && activity.familyMembers.length > 0;

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center justify-between">
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
            {hasFamilyMembers && (
              <div className="flex items-center gap-1 mt-1">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-600">
                  {activity.totalPeople} {activity.totalPeople === 1 ? 'person' : 'people'}
                </p>
              </div>
            )}
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
      {hasFamilyMembers && (
        <div className="mt-3 pl-20 border-l-2 border-gray-200 ml-8">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Family Members:</p>
          <ul className="space-y-1">
            {activity.familyMembers.map((member, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                {member}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;