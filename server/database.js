const Database = require('better-sqlite3');
const path = require('path');

// Create database file in server directory
const db = new Database(path.join(__dirname, 'checkin.db'), { verbose: console.log });

// Initialize database tables
function initDatabase() {
  // Clients table with cardID
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      apartment TEXT NOT NULL,
      site TEXT NOT NULL,
      cardId TEXT,
      familyMembers TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Visitors table
  db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      purpose TEXT,
      visiting TEXT,
      site TEXT NOT NULL,
      checkInTime DATETIME NOT NULL,
      checkOutTime DATETIME,
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Activities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER,
      visitorId INTEGER,
      clientName TEXT NOT NULL,
      apartment TEXT,
      site TEXT NOT NULL,
      action TEXT NOT NULL,
      timestamp DATETIME NOT NULL,
      isVisitor INTEGER DEFAULT 0,
      visitorType TEXT,
      purpose TEXT,
      visiting TEXT,
      familyMembers TEXT,
      totalPeople INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (clientId) REFERENCES clients(id),
      FOREIGN KEY (visitorId) REFERENCES visitors(id)
    )
  `);

  console.log('Database tables initialized successfully');
}

// Insert sample data (only if tables are empty)
function insertSampleData() {
  const clientCount = db.prepare('SELECT COUNT(*) as count FROM clients').get();

  if (clientCount.count === 0) {
    const insertClient = db.prepare(`
      INSERT INTO clients (name, apartment, site, cardId, familyMembers)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertClient.run('John Smith', '101', 'Main Campus', 'CARD001', JSON.stringify(['Jane Smith', 'Jimmy Smith']));
    insertClient.run('Sarah Johnson', '205', 'Main Campus', 'CARD002', JSON.stringify([]));
    insertClient.run('Michael Brown', '302', 'Eastside Center', 'CARD003', JSON.stringify(['Emily Brown', 'Lucas Brown', 'Sophia Brown']));

    console.log('Sample client data inserted');
  }
}

// Initialize on module load
initDatabase();
insertSampleData();

module.exports = db;
