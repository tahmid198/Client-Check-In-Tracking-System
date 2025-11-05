#!/usr/bin/env node

const Database = require('better-sqlite3');
const path = require('path');

// Open database
const db = new Database(path.join(__dirname, 'checkin.db'), { readonly: true });

console.log('\n=== CLIENT CHECK-IN TRACKING DATABASE ===\n');

// Show Clients
console.log('📋 CLIENTS:');
console.log('─'.repeat(80));
const clients = db.prepare('SELECT * FROM clients ORDER BY site, name').all();
clients.forEach(client => {
  const family = client.familyMembers ? JSON.parse(client.familyMembers) : [];
  console.log(`ID: ${client.id}`);
  console.log(`  Name: ${client.name}`);
  console.log(`  Apartment: ${client.apartment}`);
  console.log(`  Site: ${client.site}`);
  console.log(`  Card ID: ${client.cardId || 'N/A'}`);
  console.log(`  Family Members: ${family.length > 0 ? family.join(', ') : 'None'}`);
  console.log(`  Created: ${new Date(client.createdAt).toLocaleString()}`);
  console.log('');
});

// Show Active Visitors
console.log('\n👥 ACTIVE VISITORS:');
console.log('─'.repeat(80));
const activeVisitors = db.prepare('SELECT * FROM visitors WHERE isActive = 1 ORDER BY checkInTime DESC').all();
if (activeVisitors.length === 0) {
  console.log('No active visitors\n');
} else {
  activeVisitors.forEach(visitor => {
    console.log(`ID: ${visitor.id}`);
    console.log(`  Name: ${visitor.name}`);
    console.log(`  Type: ${visitor.type}`);
    console.log(`  Site: ${visitor.site}`);
    console.log(`  Purpose: ${visitor.purpose || 'N/A'}`);
    console.log(`  Visiting: ${visitor.visiting || 'N/A'}`);
    console.log(`  Checked In: ${new Date(visitor.checkInTime).toLocaleString()}`);
    console.log('');
  });
}

// Show Today's Activities
console.log('\n📊 TODAY\'S ACTIVITIES:');
console.log('─'.repeat(80));
const today = new Date().toISOString().split('T')[0];
const activities = db.prepare(`
  SELECT * FROM activities
  WHERE DATE(timestamp) = DATE(?)
  ORDER BY timestamp DESC
`).all(today);

if (activities.length === 0) {
  console.log('No activities today\n');
} else {
  activities.forEach(activity => {
    const time = new Date(activity.timestamp).toLocaleTimeString();
    const type = activity.isVisitor ? '👤 VISITOR' : '🏠 CLIENT';
    const action = activity.action === 'IN' ? '✅ CHECK IN' : '❌ CHECK OUT';

    console.log(`[${time}] ${type} - ${action}`);
    console.log(`  Name: ${activity.clientName}`);
    console.log(`  Site: ${activity.site}`);

    if (activity.apartment) {
      console.log(`  Apartment: ${activity.apartment}`);
    }

    if (activity.familyMembers) {
      const family = JSON.parse(activity.familyMembers);
      if (family.length > 0) {
        console.log(`  Family: ${family.join(', ')} (${activity.totalPeople} total)`);
      }
    }

    if (activity.isVisitor) {
      console.log(`  Type: ${activity.visitorType}`);
      if (activity.purpose) console.log(`  Purpose: ${activity.purpose}`);
      if (activity.visiting) console.log(`  Visiting: ${activity.visiting}`);
    }
    console.log('');
  });
}

// Database Stats
console.log('\n📈 DATABASE STATISTICS:');
console.log('─'.repeat(80));
const stats = {
  totalClients: db.prepare('SELECT COUNT(*) as count FROM clients').get().count,
  totalVisitors: db.prepare('SELECT COUNT(*) as count FROM visitors').get().count,
  activeVisitors: db.prepare('SELECT COUNT(*) as count FROM visitors WHERE isActive = 1').get().count,
  totalActivities: db.prepare('SELECT COUNT(*) as count FROM activities').get().count,
  todayActivities: activities.length
};

console.log(`Total Clients: ${stats.totalClients}`);
console.log(`Total Visitors (all time): ${stats.totalVisitors}`);
console.log(`Active Visitors (checked in): ${stats.activeVisitors}`);
console.log(`Total Activities (all time): ${stats.totalActivities}`);
console.log(`Today's Activities: ${stats.todayActivities}`);

// Sites
console.log('\n🏢 SITES:');
const sites = db.prepare('SELECT DISTINCT site FROM clients ORDER BY site').all();
sites.forEach(s => {
  const count = db.prepare('SELECT COUNT(*) as count FROM clients WHERE site = ?').get(s.site).count;
  console.log(`  ${s.site}: ${count} clients`);
});

console.log('\n' + '='.repeat(80) + '\n');

db.close();
