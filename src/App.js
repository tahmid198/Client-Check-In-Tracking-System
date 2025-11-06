import React, { useState, useEffect } from 'react';
import SiteLogin from './components/SiteLogin';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import SignInOutSection from './components/SignInOutSection';
import ActivityLogSection from './components/ActivityLogSection';
import FamilySelectionModal from './components/FamilySelectionModal';
import VisitorSignIn from './components/VisitorSignIn';
import UserManagement from './components/UserManagement';
import { clientAPI, visitorAPI, activityAPI } from './services/api';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSite, setCurrentSite] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [clients, setClients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', apartment: '', cardId: '', familyMembers: [] });
  const [activeTab, setActiveTab] = useState('signin');
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data when site is selected
  useEffect(() => {
    if (currentSite) {
      loadSiteData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSite]);

  const loadSiteData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load clients, visitors, and activities for the current site
      const [clientsData, visitorsData, activitiesData] = await Promise.all([
        clientAPI.getClientsBySite(currentSite),
        visitorAPI.getActiveVisitors(currentSite),
        activityAPI.getTodayActivities(currentSite)
      ]);

      setClients(clientsData);
      setVisitors(visitorsData);
      setActivities(activitiesData);
    } catch (err) {
      console.error('Error loading site data:', err);
      setError('Failed to load data. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (site) => {
    setIsAuthenticated(true);
    setCurrentSite(site);
    setNewClient({ name: '', apartment: '', cardId: '', familyMembers: [] });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentSite(null);
    setActiveTab('signin');
    setIsFullscreen(false);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(true);
    setActiveTab('signin');
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleSignIn = (client) => {
    if (client.familyMembers && client.familyMembers.length > 0) {
      setPendingAction({ client, action: 'IN' });
      setShowFamilyModal(true);
    } else {
      confirmSignIn(client, []);
    }
  };

  const handleSignOut = (client) => {
    if (client.familyMembers && client.familyMembers.length > 0) {
      setPendingAction({ client, action: 'OUT' });
      setShowFamilyModal(true);
    } else {
      confirmSignOut(client, []);
    }
  };

  const confirmSignIn = async (client, selectedFamilyMembers) => {
    try {
      const activity = {
        clientId: client.id,
        clientName: client.name,
        apartment: client.apartment,
        site: client.site,
        action: 'IN',
        timestamp: new Date().toISOString(),
        familyMembers: selectedFamilyMembers,
        totalPeople: selectedFamilyMembers.length + 1,
        isVisitor: false
      };

      const savedActivity = await activityAPI.createActivity(activity);
      setActivities([savedActivity, ...activities]);
      setShowFamilyModal(false);
      setPendingAction(null);
    } catch (err) {
      console.error('Error creating check-in activity:', err);
      setError('Failed to record check-in');
    }
  };

  const confirmSignOut = async (client, selectedFamilyMembers) => {
    try {
      const activity = {
        clientId: client.id,
        clientName: client.name,
        apartment: client.apartment,
        site: client.site,
        action: 'OUT',
        timestamp: new Date().toISOString(),
        familyMembers: selectedFamilyMembers,
        totalPeople: selectedFamilyMembers.length + 1,
        isVisitor: false
      };

      const savedActivity = await activityAPI.createActivity(activity);
      setActivities([savedActivity, ...activities]);
      setShowFamilyModal(false);
      setPendingAction(null);
    } catch (err) {
      console.error('Error creating check-out activity:', err);
      setError('Failed to record check-out');
    }
  };

  const handleFamilyConfirm = (selectedMembers) => {
    if (pendingAction) {
      if (pendingAction.action === 'IN') {
        confirmSignIn(pendingAction.client, selectedMembers);
      } else {
        confirmSignOut(pendingAction.client, selectedMembers);
      }
    }
  };

  const handleFamilyCancel = () => {
    setShowFamilyModal(false);
    setPendingAction(null);
  };

  const handleAddClient = async () => {
    if (newClient.name && newClient.apartment) {
      try {
        // Filter out empty family member names
        const validFamilyMembers = (newClient.familyMembers || []).filter(member => member.trim() !== '');

        const clientData = {
          name: newClient.name,
          apartment: newClient.apartment,
          site: currentSite,
          cardId: newClient.cardId || null,
          familyMembers: validFamilyMembers
        };

        const savedClient = await clientAPI.createClient(clientData);
        setClients([...clients, savedClient]);
        setNewClient({ name: '', apartment: '', cardId: '', familyMembers: [] });
        setShowAddClient(false);
      } catch (err) {
        console.error('Error adding client:', err);
        setError('Failed to add client');
      }
    }
  };

  const handleVisitorSignIn = async (visitorData) => {
    try {
      const checkInTime = new Date().toISOString();

      const visitorPayload = {
        ...visitorData,
        site: currentSite,
        checkInTime
      };

      const savedVisitor = await visitorAPI.checkInVisitor(visitorPayload);
      setVisitors([...visitors, savedVisitor]);

      const activity = {
        visitorId: savedVisitor.id,
        clientName: savedVisitor.name,
        site: savedVisitor.site,
        action: 'IN',
        timestamp: checkInTime,
        isVisitor: true,
        visitorType: savedVisitor.type,
        purpose: savedVisitor.purpose,
        visiting: savedVisitor.visiting
      };

      const savedActivity = await activityAPI.createActivity(activity);
      setActivities([savedActivity, ...activities]);
    } catch (err) {
      console.error('Error checking in visitor:', err);
      setError('Failed to check in visitor');
    }
  };

  const handleVisitorSignOut = async (visitor) => {
    try {
      const checkOutTime = new Date().toISOString();

      await visitorAPI.checkOutVisitor(visitor.id, checkOutTime);
      setVisitors(visitors.filter(v => v.id !== visitor.id));

      const activity = {
        visitorId: visitor.id,
        clientName: visitor.name,
        site: visitor.site,
        action: 'OUT',
        timestamp: checkOutTime,
        isVisitor: true,
        visitorType: visitor.type,
        purpose: visitor.purpose,
        visiting: visitor.visiting
      };

      const savedActivity = await activityAPI.createActivity(activity);
      setActivities([savedActivity, ...activities]);
    } catch (err) {
      console.error('Error checking out visitor:', err);
      setError('Failed to check out visitor');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getClientStatus = (clientId) => {
    const clientActivities = activities
      .filter(a => a.clientId === clientId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (clientActivities.length === 0) return false;
    
    return clientActivities[0].action === 'IN';
  };

  const filteredClients = clients.filter(c => c.site === currentSite);
  const activeVisitors = visitors.filter(v => v.site === currentSite);
  const todayActivities = activities.filter(a => {
    const activityDate = new Date(a.timestamp).toDateString();
    const today = new Date().toDateString();
    return activityDate === today && a.site === currentSite;
  });

  if (!isAuthenticated) {
    return <SiteLogin onLogin={handleLogin} />;
  }

  if (isFullscreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Fullscreen Header with Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">{currentSite}</h2>
              </div>
              <button
                onClick={handleExitFullscreen}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Exit Fullscreen
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  activeTab === 'signin'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Client Check In/Out
              </button>
              <button
                onClick={() => setActiveTab('visitors')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  activeTab === 'visitors'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Visitor Sign In/Out
              </button>
            </div>
          </div>

          {activeTab === 'signin' && (
            <SignInOutSection
              currentSite={currentSite}
              filteredClients={filteredClients}
              showAddClient={showAddClient}
              setShowAddClient={setShowAddClient}
              newClient={newClient}
              setNewClient={setNewClient}
              onAddClient={handleAddClient}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
              getClientStatus={getClientStatus}
              isFullscreen={isFullscreen}
              onExitFullscreen={handleExitFullscreen}
            />
          )}

          {activeTab === 'visitors' && (
            <VisitorSignIn
              currentSite={currentSite}
              onVisitorSignIn={handleVisitorSignIn}
              onVisitorSignOut={handleVisitorSignOut}
              activeVisitors={activeVisitors}
            />
          )}

          {showFamilyModal && pendingAction && (
            <FamilySelectionModal
              client={pendingAction.client}
              action={pendingAction.action}
              onConfirm={handleFamilyConfirm}
              onCancel={handleFamilyCancel}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Header
          currentSite={currentSite}
          onLogout={handleLogout}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {activeTab === 'signin' && (
          <SignInOutSection
            currentSite={currentSite}
            filteredClients={filteredClients}
            showAddClient={showAddClient}
            setShowAddClient={setShowAddClient}
            newClient={newClient}
            setNewClient={setNewClient}
            onAddClient={handleAddClient}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            getClientStatus={getClientStatus}
            isFullscreen={isFullscreen}
            onExitFullscreen={handleExitFullscreen}
          />
        )}

        {activeTab === 'visitors' && (
          <VisitorSignIn
            currentSite={currentSite}
            onVisitorSignIn={handleVisitorSignIn}
            onVisitorSignOut={handleVisitorSignOut}
            activeVisitors={activeVisitors}
          />
        )}

        {activeTab === 'log' && (
          <ActivityLogSection
            currentSite={currentSite}
            todayActivities={todayActivities}
            formatTime={formatTime}
          />
        )}

        {activeTab === 'management' && (
          <UserManagement currentSite={currentSite} />
        )}

        {showFamilyModal && pendingAction && (
          <FamilySelectionModal
            client={pendingAction.client}
            action={pendingAction.action}
            onConfirm={handleFamilyConfirm}
            onCancel={handleFamilyCancel}
          />
        )}
      </div>
    </div>
  );
}

export default App;