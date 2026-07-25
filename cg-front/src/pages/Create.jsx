import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('group'); // 'group' or 'proposal'

  // Group Form State
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [privacy, setPrivacy] = useState('PUBLIC');

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    try {
      await axios.post('http://localhost:3000/api/v1/groups', {
        creator_id: currentUser.id,
        name: groupName,
        description: groupDesc,
        privacy,
      });

      navigate('/profile');
    } catch (err) {
      console.error('Error creating group:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New</h1>

      {/* Toggle Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 text-sm font-semibold">
        <button 
          onClick={() => setActiveTab('group')}
          className={`flex-1 py-2.5 rounded-xl transition ${activeTab === 'group' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          New Group
        </button>
        <button 
          onClick={() => setActiveTab('proposal')}
          className={`flex-1 py-2.5 rounded-xl transition ${activeTab === 'proposal' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          New Event Proposal
        </button>
      </div>

      {activeTab === 'group' ? (
        <form onSubmit={handleCreateGroup} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Group Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Barcelona Weekend Explorers"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-slate-900 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description</label>
            <textarea 
              rows="3"
              placeholder="What is this group about?"
              value={groupDesc}
              onChange={(e) => setGroupDesc(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-slate-900 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Privacy</label>
            <select 
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-slate-900 focus:bg-white transition"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-2xl hover:bg-slate-800 transition shadow-md text-sm mt-4"
          >
            Create Group
          </button>
        </form>
      ) : (
        <p className="text-sm text-slate-500">Proposal form coming next!</p>
      )}
    </div>
  );
}