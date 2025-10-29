import React, { useState } from 'react';
import { UserPlus, UserCheck, Users, ArrowRight, X } from 'lucide-react';

const VISITOR_TYPES = [
  { value: 'guest', label: 'Guest', color: 'blue' },
  { value: 'vendor', label: 'Vendor', color: 'purple' },
  { value: 'contractor', label: 'Contractor', color: 'orange' },
  { value: 'outside_employee', label: 'Outside Employee', color: 'green' },
  { value: 'volunteer', label: 'Volunteer', color: 'pink' },
  { value: 'other', label: 'Other', color: 'gray' }
];

const VisitorSignIn = ({ onVisitorSignIn, onVisitorSignOut, currentSite, activeVisitors }) => {
  const [showForm, setShowForm] = useState(false);
  const [visitor, setVisitor] = useState({
    name: '',
    type: 'guest',
    purpose: '',
    visiting: ''
  });

  const handleSignIn = () => {
    if (visitor.name.trim()) {
      onVisitorSignIn({
        ...visitor,
        name: visitor.name.trim(),
        purpose: visitor.purpose.trim(),
        visiting: visitor.visiting.trim()
      });
      setVisitor({ name: '', type: 'guest', purpose: '', visiting: '' });
      setShowForm(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && visitor.name.trim()) {
      handleSignIn();
    }
  };

  const getVisitorTypeColor = (type) => {
    const visitorType = VISITOR_TYPES.find(vt => vt.value === type);
    return visitorType ? visitorType.color : 'gray';
  };

  const getVisitorTypeLabel = (type) => {
    const visitorType = VISITOR_TYPES.find(vt => vt.value === type);
    return visitorType ? visitorType.label : type;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Visitor Sign In/Out</h2>
            <p className="text-sm text-gray-600">Track guests, vendors, contractors, and other visitors</p>
          </div>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            <UserPlus className="w-5 h-5" />
            New Visitor Check-In
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Visitor Check-In Form</h3>
            <button
              onClick={() => {
                setShowForm(false);
                setVisitor({ name: '', type: 'guest', purpose: '', visiting: '' });
              }}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visitor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter visitor's full name"
                value={visitor.name}
                onChange={(e) => setVisitor({ ...visitor, name: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visitor Type <span className="text-red-500">*</span>
              </label>
              <select
                value={visitor.type}
                onChange={(e) => setVisitor({ ...visitor, type: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {VISITOR_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Purpose of Visit
              </label>
              <input
                type="text"
                placeholder="e.g., Delivery, Meeting, Service"
                value={visitor.purpose}
                onChange={(e) => setVisitor({ ...visitor, purpose: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visiting (Person/Department)
              </label>
              <input
                type="text"
                placeholder="Who or what department are they visiting?"
                value={visitor.visiting}
                onChange={(e) => setVisitor({ ...visitor, visiting: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSignIn}
              disabled={!visitor.name.trim()}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <UserCheck className="w-5 h-5" />
              Check In Visitor
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setVisitor({ name: '', type: 'guest', purpose: '', visiting: '' });
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Active Visitors List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Currently Checked In Visitors ({activeVisitors.length})
        </h3>

        {activeVisitors.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No visitors currently checked in</p>
            <p className="text-sm text-gray-500 mt-2">Use the "New Visitor Check-In" button to sign in a visitor</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeVisitors.map((v) => {
              const colorClass = {
                blue: 'bg-blue-100 border-blue-300 text-blue-800',
                purple: 'bg-purple-100 border-purple-300 text-purple-800',
                orange: 'bg-orange-100 border-orange-300 text-orange-800',
                green: 'bg-green-100 border-green-300 text-green-800',
                pink: 'bg-pink-100 border-pink-300 text-pink-800',
                gray: 'bg-gray-100 border-gray-300 text-gray-800'
              }[getVisitorTypeColor(v.type)] || 'bg-gray-100 border-gray-300 text-gray-800';

              return (
                <div key={v.id} className="border-2 border-green-300 bg-green-50 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg mb-1">{v.name}</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${colorClass}`}>
                        {getVisitorTypeLabel(v.type)}
                      </span>
                    </div>
                  </div>

                  {v.purpose && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-600">Purpose:</p>
                      <p className="text-sm text-gray-800">{v.purpose}</p>
                    </div>
                  )}

                  {v.visiting && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600">Visiting:</p>
                      <p className="text-sm text-gray-800">{v.visiting}</p>
                    </div>
                  )}

                  <div className="mb-3 pt-3 border-t border-green-200">
                    <p className="text-xs font-semibold text-gray-600">Checked in:</p>
                    <p className="text-sm text-gray-800">{new Date(v.checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>

                  <button
                    onClick={() => onVisitorSignOut(v)}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Check Out
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorSignIn;
