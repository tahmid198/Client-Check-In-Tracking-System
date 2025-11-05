# Client Check-In Tracking System

A modern, full-featured web application for managing client and visitor check-ins across multiple program sites. Built with React, Node.js, Express, and SQLite for **Volunteers of America**.

![Volunteers of America](https://img.shields.io/badge/Volunteers%20of%20America-Client%20Management-4955a4)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Key Features

### Core Functionality
- 🔐 **Site-Based Authentication** - Password-protected access for different program sites
- 🗄️ **Local SQL Database** - Persistent data storage with SQLite
- 💳 **Card ID Support** - Optional card IDs for quick client lookup
- 👨‍👩‍👧‍👦 **Family Checkout Tracking** - Track how many people and who checked in/out
- 👥 **Visitor Management** - Complete sign-in system for guests, vendors, contractors, etc.
- 📊 **Real-Time Status** - Visual indicators for who's in the building
- 📝 **Activity Logging** - Comprehensive check-in/check-out history
- 🖥️ **Fullscreen Kiosk Mode** - Dedicated self-service interface
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### Advanced Features
- **Family Member Selection** - Choose which family members are checking in/out
- **Visitor Types** - Guest, Vendor, Contractor, Outside Employee, Volunteer, Other
- **Purpose Tracking** - Record why visitors are here and who they're visiting
- **Persistent Storage** - All data saved to local SQLite database
- **REST API** - Complete backend API for data management
- **Multi-Site Support** - Separate data for each program site

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [Features Deep Dive](#features-deep-dive)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

## ✅ Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 14.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- Basic understanding of terminal/command line

Verify installation:
```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 2. Start Backend Server

```bash
cd server
npm start
```

You should see:
```
Server running on http://localhost:3001
Database location: /path/to/server/checkin.db
Database tables initialized successfully
Sample client data inserted
```

### 3. Start Frontend (New Terminal)

```bash
npm start
```

App opens at http://localhost:3000

### 4. Login

**Default Sites & Passwords:**
| Site | Password |
|------|----------|
| Main Campus | `main123` |
| Eastside Center | `east456` |
| Westside Hub | `west789` |
| Downtown Facility | `down101` |

## 📦 Installation

### Detailed Setup

1. **Clone or Download:**
   ```bash
   git clone <your-repository-url>
   cd Client-Check-In-Tracking-System
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Verify Installation:**
   ```bash
   # Check that all dependencies are installed
   npm ls --depth=0
   cd server && npm ls --depth=0
   ```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm start
# App opens on http://localhost:3000
```

### Production Mode

1. Build frontend:
   ```bash
   npm run build
   ```

2. Start backend:
   ```bash
   cd server
   npm start
   ```

3. Serve frontend build (optional):
   ```bash
   npm install -g serve
   serve -s build
   ```

## 🗄️ Database Setup

The application uses **SQLite** for local data persistence.

### Database Location
- **File:** `server/checkin.db`
- **Auto-created** on first server start
- **Sample data** included for testing

### Database Schema

**Clients:**
- ID, Name, Apartment, Site, **Card ID**, Family Members, Timestamps

**Visitors:**
- ID, Name, Type, Purpose, Visiting, Site, Check-in/out Times

**Activities:**
- Complete log of all check-ins/check-outs with family/visitor details

### Sample Data

3 pre-loaded clients:
1. **John Smith** - Apt 101, Main Campus, Card: CARD001
   - Family: Jane Smith, Jimmy Smith
2. **Sarah Johnson** - Apt 205, Main Campus, Card: CARD002
3. **Michael Brown** - Apt 302, Eastside Center, Card: CARD003
   - Family: Emily Brown, Lucas Brown, Sophia Brown

### Database Operations

**Backup:**
```bash
cp server/checkin.db server/checkin-backup.db
```

**Reset:**
```bash
cd server
rm checkin.db
npm start  # Recreates with sample data
```

**View Data:**
Use any SQLite viewer or:
```bash
sqlite3 server/checkin.db
.tables
SELECT * FROM clients;
.quit
```

📖 **Full database documentation:** See `DATABASE_SETUP.md`

## 🎯 Features Deep Dive

### 1. Client Management
- **Add Clients** with name, apartment, and optional card ID
- **Family Members** - Add multiple family members per client
- **Card ID Lookup** - Quick search by card number
- **Site-Specific** - Clients belong to specific sites

### 2. Family Checkout Tracking
When a client with family checks in/out:
- **Select Family Members** - Choose who's with them
- **Count Tracking** - Shows "3 people" in activity log
- **Named List** - Displays all family member names
- **Flexible** - Can check in alone or with family

### 3. Visitor Sign-In System

**Visitor Types:**
- 🔵 Guest
- 🟣 Vendor
- 🟠 Contractor
- 🟢 Outside Employee
- 🩷 Volunteer
- ⚪ Other

**Visitor Form:**
- Name (required)
- Type (required)
- Purpose of visit (optional)
- Who they're visiting (optional)

**Active Visitors:**
- Real-time display of checked-in visitors
- Shows check-in time, purpose, and visiting info
- One-click checkout

### 4. Activity Logging
- **Real-time Updates** - Instant activity recording
- **Today's Log** - All activities for current day
- **Visual Distinction** - Visitors highlighted in indigo
- **Detailed Info** - Family members, visitor purpose, timestamps
- **Historical Data** - All activities saved to database

### 5. Fullscreen Kiosk Mode
- **Tab Navigation** - Switch between clients and visitors
- **Streamlined UI** - Optimized for touchscreens
- **Self-Service** - Perfect for reception desk
- **Exit Button** - Return to normal mode

### 6. Volunteers of America Branding
- **Logo Support** - Add your VOA logo (PNG/SVG)
- **Company Name** - Displayed on all pages
- **Professional** - Branded login and header

## 📁 Project Structure

```
Client-Check-In-Tracking-System/
├── server/                          # Backend API
│   ├── server.js                   # Express server
│   ├── database.js                 # SQLite database setup
│   ├── package.json                # Backend dependencies
│   ├── checkin.db                  # SQLite database (auto-created)
│   └── .gitignore                  # Ignore database file
├── src/
│   ├── components/
│   │   ├── SiteLogin.jsx           # Login screen
│   │   ├── Header.jsx              # Header with VOA branding
│   │   ├── TabNavigation.jsx       # Tab switcher
│   │   ├── AddClientForm.jsx       # Add client with card ID & family
│   │   ├── ClientCard.jsx          # Client card with check-in/out
│   │   ├── FamilySelectionModal.jsx # Family member selection
│   │   ├── VisitorSignIn.jsx       # Visitor management
│   │   ├── SignInOutSection.jsx    # Client check-in interface
│   │   ├── ActivityItem.jsx        # Activity log entry
│   │   └── ActivityLogSection.jsx  # Activity log view
│   ├── services/
│   │   └── api.js                  # API service layer
│   ├── config/
│   │   └── siteConfig.js           # Site passwords
│   ├── assets/
│   │   ├── voa-logo.svg            # VOA logo (placeholder)
│   │   └── README.md               # Logo instructions
│   ├── App.js                      # Main application
│   ├── index.js                    # Entry point
│   └── index.css                   # Tailwind imports
├── DATABASE_SETUP.md               # Database documentation
├── package.json                    # Frontend dependencies
├── tailwind.config.js              # Tailwind config
└── README.md                       # This file
```

## ⚙️ Configuration

### Site Passwords

Edit `src/config/siteConfig.js`:

```javascript
export const SITE_CONFIG = {
  'Main Campus': { password: 'main123' },
  'Eastside Center': { password: 'east456' },
  'Westside Hub': { password: 'west789' },
  'Downtown Facility': { password: 'down101' }
};
```

### Add VOA Logo

1. Place your logo as `src/assets/voa-logo.png`
2. Recommended: PNG with transparent background, 200x200px
3. Logo appears automatically on header and login

### API Configuration

Default: `http://localhost:3001/api`

To change:
```bash
REACT_APP_API_URL=http://your-server:3001/api npm start
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Client Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/clients/:site` | Get all clients for site |
| GET | `/clients/id/:id` | Get client by ID |
| GET | `/clients/card/:cardId` | Get client by card ID |
| POST | `/clients` | Create new client |
| PUT | `/clients/:id` | Update client |
| DELETE | `/clients/:id` | Delete client |

### Visitor Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/visitors/:site/active` | Get active visitors |
| POST | `/visitors` | Check in visitor |
| PUT | `/visitors/:id/checkout` | Check out visitor |

### Activity Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/activities/:site/today` | Today's activities |
| POST | `/activities` | Create activity |
| GET | `/activities?site=&date=` | Query activities |

### Example Requests

**Get Clients:**
```bash
curl http://localhost:3001/api/clients/Main%20Campus
```

**Search by Card ID:**
```bash
curl http://localhost:3001/api/clients/card/CARD001
```

**Create Client:**
```bash
curl -X POST http://localhost:3001/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "apartment": "404",
    "site": "Main Campus",
    "cardId": "CARD123",
    "familyMembers": ["John Doe", "Baby Doe"]
  }'
```

## 📖 Usage Guide

### Client Check-In/Out

1. **Login** to your site
2. **Find client card** on main page
3. **Click "Check In"** or "Check Out"
4. **Select family members** (if applicable)
5. **Confirm** - Activity logs automatically

### Add New Client

1. **Click "Add Client"** button
2. **Enter:**
   - Full name (required)
   - Apartment number (required)
   - Card ID (optional)
3. **Add family members:**
   - Click "Add Member"
   - Enter names
   - Remove with trash icon
4. **Click "Save Client"**

### Visitor Sign-In

1. **Click "Visitor Sign In/Out"** tab
2. **Click "New Visitor Check-In"**
3. **Fill form:**
   - Name (required)
   - Type: Guest, Vendor, etc.
   - Purpose (optional)
   - Visiting (optional)
4. **Click "Check In Visitor"**

### Visitor Check-Out

1. **Go to "Visitor Sign In/Out"** tab
2. **Find visitor** in active list
3. **Click "Check Out"** button

### View Activity Log

1. **Click "Today's Activity"** tab
2. **See all check-ins/outs:**
   - Green = Check-in
   - Red = Check-out
   - Indigo background = Visitor
3. **Family members** listed below main name
4. **Visitor details** show purpose and visiting

### Fullscreen Mode

1. **Click "Fullscreen"** in header
2. **Use tabs** to switch between clients/visitors
3. **Click "Exit Fullscreen"** to return

## 🏗️ Building for Production

### Build Frontend

```bash
npm run build
```

Creates optimized build in `build/` folder.

### Deploy

**Option 1: Same Server**
```bash
# Build frontend
npm run build

# Start backend (serves API)
cd server && npm start

# Serve frontend
serve -s build
```

**Option 2: Separate Servers**
```bash
# Backend on server1:3001
cd server && npm start

# Frontend with API URL
REACT_APP_API_URL=http://server1:3001/api npm run build
# Deploy build/ folder to web server
```

### Production Checklist

- [ ] Change all site passwords
- [ ] Set up database backups
- [ ] Configure HTTPS
- [ ] Set environment variables
- [ ] Test all features
- [ ] Add monitoring/logging
- [ ] Implement proper authentication

## 🔧 Troubleshooting

### "Failed to load data"

**Cause:** Backend not running or port issue

**Solution:**
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Start backend if not running
cd server && npm start
```

### Port Already in Use

**Backend (3001):**
```bash
PORT=3002 npm start
# Update frontend: REACT_APP_API_URL=http://localhost:3002/api
```

**Frontend (3000):**
```bash
PORT=3001 npm start
```

### Database Locked

```bash
# Close all apps using database
# Delete lock files
cd server
rm checkin.db-journal
npm start
```

### Reset Everything

```bash
# Delete node_modules
rm -rf node_modules server/node_modules

# Delete database
rm server/checkin.db

# Reinstall
npm install
cd server && npm install && cd ..

# Restart both servers
cd server && npm start &
npm start
```

### Styles Not Loading

```bash
# Verify Tailwind setup
cat postcss.config.js
cat src/index.css

# Restart dev server
npm start
```

## 🛡️ Security

### Current Security

- ✅ Site-based password authentication
- ✅ Local database (not exposed to internet)
- ✅ CORS configured for localhost
- ✅ Input validation on forms

### Production Security Requirements

⚠️ **Before deploying to production:**

1. **Implement proper authentication**
   - Hash and salt passwords
   - Use JWT or sessions
   - Add user roles (admin, staff, etc.)

2. **Secure the database**
   - Encrypt sensitive data
   - Regular backups
   - Access controls

3. **Use HTTPS**
   - SSL/TLS certificates
   - Secure all API calls

4. **Add audit logging**
   - Who did what when
   - Failed login attempts
   - Data modifications

5. **Follow compliance**
   - GDPR for EU data
   - HIPAA if health data
   - Local privacy laws

6. **Implement rate limiting**
   - Prevent brute force
   - API throttling

7. **Data validation**
   - Sanitize all inputs
   - Prevent SQL injection
   - XSS protection

## 📊 Dependencies

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | DOM rendering |
| react-scripts | 5.0.1 | Build tools |
| lucide-react | ^0.263.1 | Icons |
| tailwindcss | ^3.4.18 | Styling |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web server |
| better-sqlite3 | ^9.2.2 | SQLite database |
| cors | ^2.8.5 | Cross-origin requests |
| body-parser | ^1.20.2 | Parse request bodies |

## 📝 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server (port 3000) |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from CRA (⚠️ irreversible) |

### Backend

| Command | Description |
|---------|-------------|
| `npm start` | Start API server (port 3001) |
| `npm run dev` | Start with auto-reload (nodemon) |

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'voa-blue': '#4955a4',
        'voa-green': '#00a651',
      }
    }
  }
}
```

### Add Custom Fields

1. Update database schema in `server/database.js`
2. Add fields to frontend forms
3. Update API handlers in `server/server.js`
4. Update frontend API calls in `src/services/api.js`

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💡 Support

For issues, questions, or feature requests:

- Check `DATABASE_SETUP.md` for database help
- Review this README
- Contact your system administrator
- Create an issue in the repository

## 🙏 Acknowledgments

Developed for **Volunteers of America** to streamline client and visitor management across program sites.

---

**Version:** 2.0.0
**Last Updated:** 2025
**Developed for:** Volunteers of America
**Tech Stack:** React + Node.js + Express + SQLite + Tailwind CSS
