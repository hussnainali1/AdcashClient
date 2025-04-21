import React, { useState } from 'react';
import CampaignForm from './components/CampaignForm/CampaignForm';
import CampaignList from './components/CampaignList/CampaignList';
import './App.css';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app">
      <h1>Campaign Management</h1>
      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create New Campaign'}
      </button>
      
      {showForm && (
        <CampaignForm onSuccess={() => {
          setShowForm(false);
          setRefreshKey(prev => prev + 1);
        }} />
      )}
      
      <CampaignList key={refreshKey} />
    </div>
  );
};

export default App;