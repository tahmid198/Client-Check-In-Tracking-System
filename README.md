# Client Check-In System

A modern, secure web application for managing client check-ins and check-outs across multiple program sites. Built with React and Tailwind CSS.

## Features

- 🔐 **Site-Based Authentication** - Password-protected access for different program sites
- ✅ **Two-Step Verification** - Clients verify identity with apartment number before checking in/out
- 📊 **Real-Time Status Tracking** - Visual indicators show who's in the building vs outside
- 📝 **Activity Logging** - Track all check-in/check-out activity with timestamps
- 👥 **Client Management** - Add and manage client profiles for each site
- 🖥️ **Fullscreen Mode** - Dedicated kiosk mode for self-service check-in stations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Usage](#usage)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
  - Download from [https://nodejs.org/](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## Installation

1. **Clone or download the project:**
   ```bash
   # If using git
   git clone <your-repository-url>
   cd client-checkin-system
   
   # Or extract the downloaded ZIP file and navigate to the folder
   cd client-checkin-system
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages listed in `package.json`.

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm start
```

The application will automatically open in your default browser at:
```
http://localhost:3000
```

If it doesn't open automatically, manually navigate to `http://localhost:3000`

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Project Structure

```
client-checkin-system/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── SiteLogin.jsx       # Login screen component
│   │   ├── Header.jsx          # Header with site info and logout
│   │   ├── TabNavigation.jsx   # Tab switcher component
│   │   ├── AddClientForm.jsx   # Form to add new clients
│   │   ├── ClientCard.jsx      # Individual client card with check-in/out
│   │   ├── SignInOutSection.jsx # Main check-in/out interface
│   │   ├── ActivityItem.jsx    # Single activity log entry
│   │   └── ActivityLogSection.jsx # Today's activity log
│   ├── config/
│   │   └── siteConfig.js       # Site passwords configuration
│   ├── App.js                  # Main application component
│   ├── index.js                # Application entry point
│   └── index.css               # Tailwind CSS imports
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | Core React library |
| react-dom | ^18.2.0 | React DOM rendering |
| react-scripts | 5.0.1 | Create React App scripts |
| lucide-react | ^0.263.1 | Icon library |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^3.3.0 | Utility-first CSS framework |
| autoprefixer | ^10.4.14 | PostCSS plugin for vendor prefixes |
| postcss | ^8.4.24 | CSS transformation tool |

### Installing Dependencies Manually

If you need to reinstall dependencies:

```bash
# Remove existing node_modules and lock file
rm -rf node_modules package-lock.json

# Install production dependencies
npm install react react-dom react-scripts lucide-react

# Install development dependencies
npm install -D tailwindcss autoprefixer postcss

# Initialize Tailwind (if needed)
npx tailwindcss init
```

## Configuration

### Site Passwords

Edit `src/config/siteConfig.js` to change site passwords:

```javascript
export const SITE_CONFIG = {
  'Main Campus': { password: 'main123' },
  'Eastside Center': { password: 'east456' },
  'Westside Hub': { password: 'west789' },
  'Downtown Facility': { password: 'down101' }
};
```

**Security Note:** For production use, implement proper authentication with encrypted passwords stored in a secure database.

### Adding New Sites

1. Open `src/config/siteConfig.js`
2. Add a new entry to `SITE_CONFIG`:
   ```javascript
   'New Site Name': { password: 'yourpassword' }
   ```

### Tailwind CSS Configuration

Customize styling in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc.
    },
  },
  plugins: [],
}
```

## Usage

### Default Login Credentials

| Site | Password |
|------|----------|
| Main Campus | `main123` |
| Eastside Center | `east456` |
| Westside Hub | `west789` |
| Downtown Facility | `down101` |

### How to Use the Application

1. **Login:**
   - Select your program site from the dropdown
   - Enter the site password
   - Click "Access Site"

2. **Check In/Out:**
   - Find the client's name card
   - Click "Check In" or "Check Out"
   - Enter the client's apartment number to verify
   - Click "Verify" or press Enter

3. **Add New Client:**
   - Click "Add Client" button
   - Enter client name and apartment number
   - Click "Save Client"

4. **View Activity Log:**
   - Click "Today's Activity" tab
   - See all check-ins and check-outs for the current day

5. **Fullscreen Mode:**
   - Click "Fullscreen" button for kiosk mode
   - Great for self-service stations
   - Click "Exit Fullscreen" to return to normal view

6. **Logout:**
   - Click "Logout" to return to login screen
   - Required to switch sites

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Serve Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build
```

The production build will be available at `http://localhost:3000` (or another port if 3000 is in use).

### Deploy to a Web Server

After running `npm run build`, upload the contents of the `build/` folder to your web server or hosting service (Netlify, Vercel, AWS, etc.).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App (⚠️ irreversible) |

## Troubleshooting

### Tailwind Styles Not Loading

1. Ensure `postcss.config.js` exists in the root directory:
   ```javascript
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

2. Verify `src/index.css` contains:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. Make sure `src/index.js` imports `index.css`:
   ```javascript
   import './index.css';
   ```

4. Restart the development server:
   ```bash
   npm start
   ```

### Port 3000 Already in Use

```bash
# On macOS/Linux
PORT=3001 npm start

# On Windows (Command Prompt)
set PORT=3001 && npm start

# On Windows (PowerShell)
$env:PORT=3001; npm start
```

### Dependencies Installation Failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### "Module not found" Errors

```bash
# Reinstall specific package
npm install <package-name>

# Example:
npm install lucide-react
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Persistence

**Important:** This application stores data in memory only. All client data and activity logs will be lost when:
- The page is refreshed
- The browser is closed
- The server is restarted

For production use, integrate a database solution (Firebase, MongoDB, PostgreSQL, etc.) to persist data.

## Security Considerations

⚠️ **This is a demo application.** For production use:

1. Implement proper backend authentication
2. Use HTTPS for all connections
3. Store passwords securely (hashed and salted)
4. Add role-based access control
5. Implement data encryption
6. Add audit logging
7. Set up regular backups
8. Follow GDPR/privacy regulations

## Future Enhancements

- [ ] Database integration for data persistence
- [ ] Export activity logs to CSV/PDF
- [ ] Email/SMS notifications
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Barcode/QR code scanning
- [ ] Biometric authentication

## Support

For issues, questions, or contributions, please contact your system administrator or create an issue in the project repository.

## License

This project is licensed under the MIT License.

---

**Version:** 1.0.0  
**Last Updated:** 2025
**Developed for:** Volunteers of America  
