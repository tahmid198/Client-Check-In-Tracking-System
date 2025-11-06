import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit2, Trash2, Search } from 'lucide-react';
import { clientAPI, visitorAPI } from '../services/api';
import AddClientForm from './AddClientForm';
import EditClientModal from './EditClientModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const UserManagement = ({ currentSite }) => {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Client states
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showDeleteClient, setShowDeleteClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', apartment: '', cardId: '', familyMembers: [] });

  // Load clients
  useEffect(() => {
    loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSite]);

  const loadClients = async () => {
    try {
      const data = await clientAPI.getClientsBySite(currentSite);
      setClients(data);
    } catch (error) {
      console.error('Failed to load clients:', error);
    }
  };

  const handleAddClient = async () => {
    try {
      await clientAPI.createClient({
        ...newClient,
        site: currentSite
      });
      setNewClient({ name: '', apartment: '', cardId: '', familyMembers: [] });
      setShowAddClient(false);
      loadClients();
    } catch (error) {
      console.error('Failed to add client:', error);
    }
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowEditClient(true);
  };

  const handleSaveEdit = async (editedData) => {
    try {
      await clientAPI.updateClient(selectedClient.id, {
        ...editedData,
        site: currentSite
      });
      setShowEditClient(false);
      setSelectedClient(null);
      loadClients();
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setShowDeleteClient(true);
  };

  const confirmDeleteClient = async () => {
    try {
      await clientAPI.deleteClient(selectedClient.id);
      setShowDeleteClient(false);
      setSelectedClient(null);
      loadClients();
    } catch (error) {
      console.error('Failed to delete client:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.cardId && client.cardId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('clients')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'clients'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Clients
        </button>
        <button
          onClick={() => setActiveTab('visitors')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'visitors'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Visitors
        </button>
      </div>

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div>
          {/* Search and Add */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, apartment, or card ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddClient(!showAddClient)}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <UserPlus className="w-5 h-5" />
              Add Client
            </button>
          </div>

          {/* Add Client Form */}
          {showAddClient && (
            <div className="mb-6">
              <AddClientForm
                newClient={newClient}
                setNewClient={setNewClient}
                currentSite={currentSite}
                onSave={handleAddClient}
                onCancel={() => setShowAddClient(false)}
              />
            </div>
          )}

          {/* Clients Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 border">Name</th>
                  <th className="text-left p-3 border">Apartment</th>
                  <th className="text-left p-3 border">Card ID</th>
                  <th className="text-left p-3 border">Family Members</th>
                  <th className="text-center p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">{client.name}</td>
                    <td className="p-3 border">{client.apartment}</td>
                    <td className="p-3 border">{client.cardId || '-'}</td>
                    <td className="p-3 border">
                      {client.familyMembers && client.familyMembers.length > 0 ? (
                        <div className="text-sm">
                          {client.familyMembers.join(', ')}
                        </div>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="p-3 border">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client)}
                          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No clients found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visitors Tab */}
      {activeTab === 'visitors' && (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p>Visitor management coming soon</p>
          <p className="text-sm mt-2">This will allow you to view and manage all visitor records</p>
        </div>
      )}

      {/* Modals */}
      {showEditClient && selectedClient && (
        <EditClientModal
          client={selectedClient}
          onSave={handleSaveEdit}
          onCancel={() => {
            setShowEditClient(false);
            setSelectedClient(null);
          }}
        />
      )}

      {showDeleteClient && selectedClient && (
        <DeleteConfirmationModal
          client={selectedClient}
          onConfirm={confirmDeleteClient}
          onCancel={() => {
            setShowDeleteClient(false);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
