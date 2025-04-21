import React, { useState, useEffect } from 'react';
import { Campaign } from '../../types/campaign';
import { getCampaigns, toggleCampaignStatus } from '../../services/api';

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    title: '',
    landingPageUrl: '',
    isRunning: ''
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await getCampaigns(filters);
        setCampaigns(data);
      } catch (err) {
        setError('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, [filters]);

  const handleToggleStatus = async (id: string) => {
    try {
      const updatedCampaign = await toggleCampaignStatus(id);
      setCampaigns(campaigns.map(c => 
        c._id === id ? updatedCampaign : c
      ));
    } catch (err) {
      setError('Failed to toggle campaign status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title"
          value={filters.title}
          onChange={(e) => setFilters({...filters, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Filter by URL"
          value={filters.landingPageUrl}
          onChange={(e) => setFilters({...filters, landingPageUrl: e.target.value})}
        />
        <select
          value={filters.isRunning}
          onChange={(e) => setFilters({...filters, isRunning: e.target.value})}
        >
          <option value="">All Statuses</option>
          <option value="true">Running</option>
          <option value="false">Stopped</option>
        </select>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Landing Page URL</th>
            <th>Payouts</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(campaign => (
            <tr key={campaign._id}>
              <td>{campaign.title}</td>
              <td>
                <a href={campaign.landingPageUrl} target="_blank" rel="noopener noreferrer">
                  {campaign.landingPageUrl}
                </a>
              </td>
              <td>
                <ul>
                  {campaign.payouts.map((payout, index) => (
                    <li key={index}>
                      {payout.country}: ${payout.amount.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{campaign.isRunning ? 'Running' : 'Stopped'}</td>
              <td>
                <button onClick={() => handleToggleStatus(campaign._id)}>
                  {campaign.isRunning ? 'Stop' : 'Start'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;