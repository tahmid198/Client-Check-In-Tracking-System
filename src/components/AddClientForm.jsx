import React from 'react';
import { Plus, Trash2, Users } from 'lucide-react';

const AddClientForm = ({ newClient, setNewClient, currentSite, onSave, onCancel }) => {
  const handleAddFamilyMember = () => {
    setNewClient({
      ...newClient,
      familyMembers: [...(newClient.familyMembers || []), '']
    });
  };

  const handleRemoveFamilyMember = (index) => {
    const updatedMembers = newClient.familyMembers.filter((_, i) => i !== index);
    setNewClient({ ...newClient, familyMembers: updatedMembers });
  };

  const handleFamilyMemberChange = (index, value) => {
    const updatedMembers = [...newClient.familyMembers];
    updatedMembers[index] = value;
    setNewClient({ ...newClient, familyMembers: updatedMembers });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-700 mb-3">New Client</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Full Name"
          value={newClient.name}
          onChange={(e) => setNewClient({...newClient, name: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Apartment #"
          value={newClient.apartment}
          onChange={(e) => setNewClient({...newClient, apartment: e.target.value})}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-700">Family Members (Optional)</h4>
          </div>
          <button
            type="button"
            onClick={handleAddFamilyMember}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        {newClient.familyMembers && newClient.familyMembers.length > 0 && (
          <div className="space-y-2">
            {newClient.familyMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Family Member Name"
                  value={member}
                  onChange={(e) => handleFamilyMemberChange(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFamilyMember(index)}
                  className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={onSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Save Client
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddClientForm;