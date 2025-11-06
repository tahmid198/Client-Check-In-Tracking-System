import React from 'react';
import { UserPlus, Users, Minimize } from 'lucide-react';
import AddClientForm from './AddClientForm';
import ClientCard from './ClientCard';

const SignInOutSection = ({
  currentSite,
  filteredClients,
  showAddClient,
  setShowAddClient,
  newClient,
  setNewClient,
  onAddClient,
  onSignIn,
  onSignOut,
  getClientStatus,
  isFullscreen,
  onExitFullscreen
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clients - {currentSite}</h2>
        <div className="flex gap-2">
          {isFullscreen && (
            <button
              onClick={onExitFullscreen}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
            >
              <Minimize className="w-4 h-4" />
              Exit Fullscreen
            </button>
          )}
          <button
            onClick={() => setShowAddClient(!showAddClient)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <UserPlus className="w-5 h-5" />
            Add Client
          </button>
        </div>
      </div>

      {showAddClient && (
        <AddClientForm
          newClient={newClient}
          setNewClient={setNewClient}
          currentSite={currentSite}
          onSave={onAddClient}
          onCancel={() => setShowAddClient(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => (
          <ClientCard
            key={client.id}
            client={client}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            isSignedIn={getClientStatus(client.id)}
          />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p>No clients registered at this site yet.</p>
        </div>
      )}
    </div>
  );
};

export default SignInOutSection;