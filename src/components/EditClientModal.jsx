import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Users } from 'lucide-react';

const EditClientModal = ({ client, onSave, onCancel }) => {
  const [editedClient, setEditedClient] = useState({
    name: client.name,
    apartment: client.apartment,
    cardId: client.cardId || '',
    familyMembers: client.familyMembers || []
  });

  const handleAddFamilyMember = () => {
    setEditedClient({
      ...editedClient,
      familyMembers: [...editedClient.familyMembers, '']
    });
  };

  const handleRemoveFamilyMember = (index) => {
    const updatedMembers = editedClient.familyMembers.filter((_, i) => i !== index);
    setEditedClient({ ...editedClient, familyMembers: updatedMembers });
  };

  const handleFamilyMemberChange = (index, value) => {
    const updatedMembers = [...editedClient.familyMembers];
    updatedMembers[index] = value;
    setEditedClient({ ...editedClient, familyMembers: updatedMembers });
  };

  const handleSave = () => {
    if (editedClient.name.trim() && editedClient.apartment.trim()) {
      // Filter out empty family member names
      const validFamilyMembers = editedClient.familyMembers.filter(member => member.trim() !== '');
      onSave({
        ...editedClient,
        familyMembers: validFamilyMembers
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Client</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={editedClient.name}
                onChange={(e) => setEditedClient({...editedClient, name: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Apartment # <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Apartment #"
                value={editedClient.apartment}
                onChange={(e) => setEditedClient({...editedClient, apartment: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card ID (Optional)
              </label>
              <input
                type="text"
                placeholder="Card ID"
                value={editedClient.cardId}
                onChange={(e) => setEditedClient({...editedClient, cardId: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-semibold text-gray-700">
                  Family Members (Optional)
                </label>
              </div>
              <button
                type="button"
                onClick={handleAddFamilyMember}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-sm transition"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            {editedClient.familyMembers.length > 0 && (
              <div className="space-y-2">
                {editedClient.familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Family Member Name"
                      value={member}
                      onChange={(e) => handleFamilyMemberChange(index, e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFamilyMember(index)}
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!editedClient.name.trim() || !editedClient.apartment.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClientModal;
