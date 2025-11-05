import React from 'react';
import { LogIn, LogOut, Edit2, Trash2 } from 'lucide-react';

const ClientCard = ({ client, onSignIn, onSignOut, onEdit, onDelete, isSignedIn }) => {
  return (
    <div className={`border-2 rounded-lg p-4 hover:shadow-md transition ${
      isSignedIn ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{client.name}</h3>
          {isSignedIn ? (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              IN BUILDING
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-400 text-white text-xs font-semibold rounded-full">
              OUTSIDE
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Apartment {client.apartment}</p>
            {client.cardId && (
              <p className="text-xs text-gray-500">Card: {client.cardId}</p>
            )}
            {client.familyMembers && client.familyMembers.length > 0 && (
              <p className="text-xs text-blue-600 mt-1">
                👨‍👩‍👧‍👦 {client.familyMembers.length} family member{client.familyMembers.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(client)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
              title="Edit Client"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(client)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
              title="Delete Client"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {!isSignedIn ? (
          <button
            onClick={() => onSignIn(client)}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            <LogIn className="w-4 h-4" />
            Check In
          </button>
        ) : (
          <button
            onClick={() => onSignOut(client)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            Check Out
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientCard;