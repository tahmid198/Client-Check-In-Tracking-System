const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// ============= CLIENT API =============

export const clientAPI = {
  // Get all clients for a site
  getClientsBySite: async (site) => {
    const response = await fetch(`${API_BASE_URL}/clients/${encodeURIComponent(site)}`);
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  },

  // Get single client by ID
  getClientById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/clients/id/${id}`);
    if (!response.ok) throw new Error('Failed to fetch client');
    return response.json();
  },

  // Search client by cardId
  getClientByCardId: async (cardId) => {
    const response = await fetch(`${API_BASE_URL}/clients/card/${encodeURIComponent(cardId)}`);
    if (!response.ok) throw new Error('Client not found');
    return response.json();
  },

  // Create new client
  createClient: async (clientData) => {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    });
    if (!response.ok) throw new Error('Failed to create client');
    return response.json();
  },

  // Update client
  updateClient: async (id, clientData) => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    });
    if (!response.ok) throw new Error('Failed to update client');
    return response.json();
  },

  // Delete client
  deleteClient: async (id) => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete client');
    return response.json();
  }
};

// ============= VISITOR API =============

export const visitorAPI = {
  // Get active visitors for a site
  getActiveVisitors: async (site) => {
    const response = await fetch(`${API_BASE_URL}/visitors/${encodeURIComponent(site)}/active`);
    if (!response.ok) throw new Error('Failed to fetch visitors');
    return response.json();
  },

  // Check in visitor
  checkInVisitor: async (visitorData) => {
    const response = await fetch(`${API_BASE_URL}/visitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitorData)
    });
    if (!response.ok) throw new Error('Failed to check in visitor');
    return response.json();
  },

  // Check out visitor
  checkOutVisitor: async (id, checkOutTime) => {
    const response = await fetch(`${API_BASE_URL}/visitors/${id}/checkout`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOutTime })
    });
    if (!response.ok) throw new Error('Failed to check out visitor');
    return response.json();
  }
};

// ============= ACTIVITY API =============

export const activityAPI = {
  // Get today's activities for a site
  getTodayActivities: async (site) => {
    const response = await fetch(`${API_BASE_URL}/activities/${encodeURIComponent(site)}/today`);
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  },

  // Create activity
  createActivity: async (activityData) => {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData)
    });
    if (!response.ok) throw new Error('Failed to create activity');
    return response.json();
  },

  // Get all activities with optional filters
  getAllActivities: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/activities?${params}`);
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
