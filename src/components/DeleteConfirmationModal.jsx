import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ client, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Delete Client?</h2>
            <p className="text-sm text-gray-600">This action cannot be undone</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">You are about to delete:</p>
          <p className="font-bold text-gray-800 text-lg">{client.name}</p>
          <p className="text-sm text-gray-600">Apartment {client.apartment}</p>
          {client.cardId && (
            <p className="text-sm text-gray-600">Card ID: {client.cardId}</p>
          )}
          {client.familyMembers && client.familyMembers.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Family Members: {client.familyMembers.join(', ')}
            </p>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Warning:</strong> All activity history for this client will remain in the system,
            but the client profile will be permanently deleted.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(client.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            <Trash2 className="w-5 h-5" />
            Delete Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
