import React, { useState } from 'react';
import { X, Users } from 'lucide-react';

const FamilySelectionModal = ({ client, action, onConfirm, onCancel }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMember = (member) => {
    setSelectedMembers(prev =>
      prev.includes(member)
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedMembers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">
              {action === 'IN' ? 'Check In' : 'Check Out'} Family Members
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">{client.name}</span> (Main Client)
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Select additional family members who are {action === 'IN' ? 'checking in' : 'checking out'}:
          </p>

          {client.familyMembers && client.familyMembers.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {client.familyMembers.map((member, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  style={{
                    borderColor: selectedMembers.includes(member) ? '#3b82f6' : '#e5e7eb',
                    backgroundColor: selectedMembers.includes(member) ? '#eff6ff' : 'transparent'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member)}
                    onChange={() => toggleMember(member)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-800 font-medium">{member}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No family members registered</p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 rounded-lg transition font-medium text-white ${
              action === 'IN'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Confirm {action === 'IN' ? 'Check In' : 'Check Out'}
            {selectedMembers.length > 0 && ` (${selectedMembers.length + 1} total)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilySelectionModal;
