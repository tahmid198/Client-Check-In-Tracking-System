import React from 'react';

const AddClientForm = ({ newClient, setNewClient, currentSite, onSave, onCancel }) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-700 mb-3">New Client</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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