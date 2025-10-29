import React from 'react';
import { LogIn, LogOut, Users, UserCheck } from 'lucide-react';

const ActivityItem = ({ activity, formatTime }) => {
  const hasFamilyMembers = activity.familyMembers && activity.familyMembers.length > 0;
  const isVisitor = activity.isVisitor;

  const getVisitorTypeLabel = (type) => {
    const types = {
      guest: 'Guest',
      vendor: 'Vendor',
      contractor: 'Contractor',
      outside_employee: 'Outside Employee',
      volunteer: 'Volunteer',
      other: 'Other'
    };
    return types[type] || type;
  };

  const getVisitorTypeColor = (type) => {
    const colors = {
      guest: 'bg-blue-100 text-blue-700 border-blue-300',
      vendor: 'bg-purple-100 text-purple-700 border-purple-300',
      contractor: 'bg-orange-100 text-orange-700 border-orange-300',
      outside_employee: 'bg-green-100 text-green-700 border-green-300',
      volunteer: 'bg-pink-100 text-pink-700 border-pink-300',
      other: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[type] || colors.other;
  };

  return (
    <div className={`p-4 border-2 rounded-lg hover:bg-gray-50 ${
      isVisitor ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            activity.action === 'IN' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {activity.action === 'IN' ? (
              isVisitor ? <UserCheck className="w-8 h-8 text-green-600" /> : <LogIn className="w-8 h-8 text-green-600" />
            ) : (
              <LogOut className="w-8 h-8 text-red-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">{activity.clientName}</h3>
              {isVisitor && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getVisitorTypeColor(activity.visitorType)}`}>
                  {getVisitorTypeLabel(activity.visitorType)}
                </span>
              )}
            </div>
            {!isVisitor && activity.apartment && (
              <p className="text-sm text-gray-600">Apartment {activity.apartment}</p>
            )}
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
      {isVisitor && (activity.purpose || activity.visiting) && (
        <div className="mt-3 pl-20 ml-8 border-l-2 border-indigo-200">
          {activity.purpose && (
            <div className="mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Purpose:</p>
              <p className="text-sm text-gray-700">{activity.purpose}</p>
            </div>
          )}
          {activity.visiting && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Visiting:</p>
              <p className="text-sm text-gray-700">{activity.visiting}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityItem;