const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ============= CLIENT ENDPOINTS =============

// Get all clients for a specific site
app.get('/api/clients/:site', (req, res) => {
  try {
    const { site } = req.params;
    const clients = db.prepare('SELECT * FROM clients WHERE site = ? ORDER BY name').all(site);

    // Parse familyMembers JSON string back to array
    const parsedClients = clients.map(client => ({
      ...client,
      familyMembers: client.familyMembers ? JSON.parse(client.familyMembers) : []
    }));

    res.json(parsedClients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single client by ID
app.get('/api/clients/id/:id', (req, res) => {
  try {
    const { id } = req.params;
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    client.familyMembers = client.familyMembers ? JSON.parse(client.familyMembers) : [];
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search client by cardId
app.get('/api/clients/card/:cardId', (req, res) => {
  try {
    const { cardId } = req.params;
    const client = db.prepare('SELECT * FROM clients WHERE cardId = ?').get(cardId);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    client.familyMembers = client.familyMembers ? JSON.parse(client.familyMembers) : [];
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new client
app.post('/api/clients', (req, res) => {
  try {
    const { name, apartment, site, cardId, familyMembers } = req.body;

    const stmt = db.prepare(`
      INSERT INTO clients (name, apartment, site, cardId, familyMembers)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      apartment,
      site,
      cardId || null,
      JSON.stringify(familyMembers || [])
    );

    const newClient = db.prepare('SELECT * FROM clients WHERE id = ?').get(result.lastInsertRowid);
    newClient.familyMembers = newClient.familyMembers ? JSON.parse(newClient.familyMembers) : [];

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client
app.put('/api/clients/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, apartment, site, cardId, familyMembers } = req.body;

    const stmt = db.prepare(`
      UPDATE clients
      SET name = ?, apartment = ?, site = ?, cardId = ?, familyMembers = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name,
      apartment,
      site,
      cardId || null,
      JSON.stringify(familyMembers || []),
      id
    );

    const updatedClient = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
    updatedClient.familyMembers = updatedClient.familyMembers ? JSON.parse(updatedClient.familyMembers) : [];

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete client
app.delete('/api/clients/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM clients WHERE id = ?');
    stmt.run(id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= VISITOR ENDPOINTS =============

// Get active visitors for a site
app.get('/api/visitors/:site/active', (req, res) => {
  try {
    const { site } = req.params;
    const visitors = db.prepare(`
      SELECT * FROM visitors
      WHERE site = ? AND isActive = 1
      ORDER BY checkInTime DESC
    `).all(site);

    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check in visitor
app.post('/api/visitors', (req, res) => {
  try {
    const { name, type, purpose, visiting, site, checkInTime } = req.body;

    const stmt = db.prepare(`
      INSERT INTO visitors (name, type, purpose, visiting, site, checkInTime, isActive)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `);

    const result = stmt.run(name, type, purpose || null, visiting || null, site, checkInTime);
    const newVisitor = db.prepare('SELECT * FROM visitors WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newVisitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check out visitor
app.put('/api/visitors/:id/checkout', (req, res) => {
  try {
    const { id } = req.params;
    const { checkOutTime } = req.body;

    const stmt = db.prepare(`
      UPDATE visitors
      SET checkOutTime = ?, isActive = 0
      WHERE id = ?
    `);

    stmt.run(checkOutTime, id);
    const updatedVisitor = db.prepare('SELECT * FROM visitors WHERE id = ?').get(id);

    res.json(updatedVisitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= ACTIVITY ENDPOINTS =============

// Get today's activities for a site
app.get('/api/activities/:site/today', (req, res) => {
  try {
    const { site } = req.params;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const activities = db.prepare(`
      SELECT * FROM activities
      WHERE site = ? AND DATE(timestamp) = DATE(?)
      ORDER BY timestamp DESC
    `).all(site, today);

    // Parse familyMembers for activities that have them
    const parsedActivities = activities.map(activity => ({
      ...activity,
      familyMembers: activity.familyMembers ? JSON.parse(activity.familyMembers) : [],
      isVisitor: Boolean(activity.isVisitor)
    }));

    res.json(parsedActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create activity
app.post('/api/activities', (req, res) => {
  try {
    const {
      clientId,
      visitorId,
      clientName,
      apartment,
      site,
      action,
      timestamp,
      isVisitor,
      visitorType,
      purpose,
      visiting,
      familyMembers,
      totalPeople
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO activities (
        clientId, visitorId, clientName, apartment, site, action, timestamp,
        isVisitor, visitorType, purpose, visiting, familyMembers, totalPeople
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      clientId || null,
      visitorId || null,
      clientName,
      apartment || null,
      site,
      action,
      timestamp,
      isVisitor ? 1 : 0,
      visitorType || null,
      purpose || null,
      visiting || null,
      familyMembers ? JSON.stringify(familyMembers) : null,
      totalPeople || 1
    );

    const newActivity = db.prepare('SELECT * FROM activities WHERE id = ?').get(result.lastInsertRowid);
    newActivity.familyMembers = newActivity.familyMembers ? JSON.parse(newActivity.familyMembers) : [];
    newActivity.isVisitor = Boolean(newActivity.isVisitor);

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all activities (for reports/analytics)
app.get('/api/activities', (req, res) => {
  try {
    const { site, startDate, endDate } = req.query;

    let query = 'SELECT * FROM activities WHERE 1=1';
    const params = [];

    if (site) {
      query += ' AND site = ?';
      params.push(site);
    }

    if (startDate) {
      query += ' AND DATE(timestamp) >= DATE(?)';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND DATE(timestamp) <= DATE(?)';
      params.push(endDate);
    }

    query += ' ORDER BY timestamp DESC';

    const activities = db.prepare(query).all(...params);

    const parsedActivities = activities.map(activity => ({
      ...activity,
      familyMembers: activity.familyMembers ? JSON.parse(activity.familyMembers) : [],
      isVisitor: Boolean(activity.isVisitor)
    }));

    res.json(parsedActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database location: ${require('path').join(__dirname, 'checkin.db')}`);
});
