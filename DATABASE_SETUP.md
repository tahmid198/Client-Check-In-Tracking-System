# Database Setup Instructions

This application now uses a local SQL database (SQLite) to persist all data including clients, visitors, and activities.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Database Features

- **Local SQL Database**: SQLite database stored in `server/checkin.db`
- **Card ID Support**: Each client can have a unique card ID for quick lookup
- **Persistent Data**: All data is saved to the database and persists between sessions
- **Automatic Initialization**: Database tables are created automatically on first run

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `better-sqlite3` - SQLite database driver
- `body-parser` - Parse request bodies
- `nodemon` - Development server with auto-reload

### 2. Start the Backend Server

```bash
# From the server directory
npm start

# OR for development with auto-reload
npm run dev
```

The server will start on http://localhost:3001

You should see:
```
Server running on http://localhost:3001
Database location: /path/to/server/checkin.db
Database tables initialized successfully
Sample client data inserted
```

### 3. Start the Frontend

In a **new terminal window**:

```bash
# From the project root directory
npm start
```

The React app will start on http://localhost:3000

## Database Schema

### Clients Table
```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  apartment TEXT NOT NULL,
  site TEXT NOT NULL,
  cardId TEXT,
  familyMembers TEXT,  -- Stored as JSON
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Visitors Table
```sql
CREATE TABLE visitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,  -- guest, vendor, contractor, etc.
  purpose TEXT,
  visiting TEXT,
  site TEXT NOT NULL,
  checkInTime DATETIME NOT NULL,
  checkOutTime DATETIME,
  isActive INTEGER DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Activities Table
```sql
CREATE TABLE activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId INTEGER,
  visitorId INTEGER,
  clientName TEXT NOT NULL,
  apartment TEXT,
  site TEXT NOT NULL,
  action TEXT NOT NULL,  -- IN or OUT
  timestamp DATETIME NOT NULL,
  isVisitor INTEGER DEFAULT 0,
  visitorType TEXT,
  purpose TEXT,
  visiting TEXT,
  familyMembers TEXT,  -- Stored as JSON
  totalPeople INTEGER DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### Clients
- `GET /api/clients/:site` - Get all clients for a site
- `GET /api/clients/id/:id` - Get client by ID
- `GET /api/clients/card/:cardId` - Search client by card ID
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Visitors
- `GET /api/visitors/:site/active` - Get active visitors for a site
- `POST /api/visitors` - Check in visitor
- `PUT /api/visitors/:id/checkout` - Check out visitor

### Activities
- `GET /api/activities/:site/today` - Get today's activities for a site
- `POST /api/activities` - Create activity record
- `GET /api/activities?site=&startDate=&endDate=` - Get activities with filters

## Sample Data

The database includes 3 sample clients:
- John Smith - Apartment 101, Main Campus, Card ID: CARD001 (with family)
- Sarah Johnson - Apartment 205, Main Campus, Card ID: CARD002
- Michael Brown - Apartment 302, Eastside Center, Card ID: CARD003 (with family)

## Using Card IDs

Card IDs are optional but useful for quick client lookup:

1. When adding a client, enter their card ID in the "Card ID" field
2. You can later search for clients by card ID using the API:
   ```javascript
   GET /api/clients/card/CARD001
   ```

## Troubleshooting

### "Failed to load data" Error

1. Make sure the backend server is running on port 3001
2. Check the terminal for error messages
3. Verify the database file was created: `server/checkin.db`

### Port Already in Use

If port 3001 is taken:
```bash
# Set a different port
PORT=3002 npm start
```

Then update the frontend:
```bash
# In the project root
REACT_APP_API_URL=http://localhost:3002/api npm start
```

### Database Locked Error

If you get a "database is locked" error:
1. Close all applications accessing the database
2. Delete `server/checkin.db` and `server/checkin.db-journal`
3. Restart the server to recreate the database

### Reset Database

To start fresh:
```bash
cd server
rm checkin.db checkin.db-journal
npm start
```

This will recreate the database with sample data.

## Production Deployment

### Option 1: Same Machine
Run both frontend and backend on the same machine:
1. Build the React app: `npm run build`
2. Serve the build folder with the Express server
3. Keep SQLite database file secure

### Option 2: Separate Machines
1. Deploy backend to a server
2. Set environment variable for frontend:
   ```bash
   REACT_APP_API_URL=http://your-server:3001/api
   ```
3. Rebuild frontend with new API URL

## Backup and Recovery

### Manual Backup
```bash
cp server/checkin.db server/checkin-backup-$(date +%Y%m%d).db
```

### Automated Backup Script
Create `server/backup.sh`:
```bash
#!/bin/bash
cp checkin.db backups/checkin-$(date +%Y%m%d-%H%M%S).db
```

Run daily via cron or Task Scheduler.

## Security Notes

- The database file is stored locally in `server/checkin.db`
- Add proper authentication before deploying to production
- Consider encrypting the database file for sensitive data
- Implement user roles and permissions for multi-user environments
- Use HTTPS in production

## Need Help?

Check the console logs in both terminal windows for detailed error messages.
