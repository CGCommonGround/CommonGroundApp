import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaPlus, FaUsers, FaShieldAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [preferences, setPreferences] = useState([]);
  const [groups, setGroups] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    Promise.all([
      axios.get(`http://localhost:3000/api/v1/users/${user.id}/profile`),
      axios.get(`http://localhost:3000/api/v1/users/${user.id}/groups`)
    ])
      .then(([profileRes, groupsRes]) => {
        setPreferences(profileRes.data.preferences || []);
        setGroups(groupsRes.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading profile data:', err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-slate-900 text-white text-3xl font-bold rounded-2xl flex items-center justify-center shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-sm text-slate-500">{user.email}</p>
            <span className="inline-flex items-center space-x-1 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full mt-2">
              <FaMapMarkerAlt className="text-slate-400" />
              <span>{user.city || 'Barcelona'}</span>
            </span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/create')}
          className="bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-slate-800 transition flex items-center space-x-2 shadow-sm"
        >
          <FaPlus className="text-xs" />
          <span>New Group or Proposal</span>
        </button>
      </div>

      {/* User Groups Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center space-x-2 mb-4">
          <FaUsers className="text-slate-700" />
          <h2 className="text-lg font-bold text-slate-900">Your Groups ({groups.length})</h2>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading groups...</p>
        ) : groups.length === 0 ? (
          <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 mb-3">You haven't created or joined any groups yet.</p>
            <button 
              onClick={() => navigate('/create')}
              className="text-xs font-semibold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition"
            >
              Create your first group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <div key={group.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-base">{group.name}</h3>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <FaShieldAlt className="text-[9px]" />
                      <span>{group.role}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{group.description || 'No description provided.'}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Privacy: {group.privacy}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Your Preferences</h2>
        {loading ? (
          <p className="text-sm text-slate-400">Loading preferences...</p>
        ) : preferences.length === 0 ? (
          <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            No preferences configured yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preferences.map((pref) => (
              <div key={pref.preference_id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="font-bold text-slate-800 text-sm">{pref.category}</p>
                <div className="text-xs text-slate-500 mt-2 space-y-1">
                  <p>Max Budget: <span className="font-semibold text-slate-700">${pref.max_budget}</span></p>
                  <p>Transport: <span className="font-semibold text-slate-700">{pref.preferred_transport}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}