import React, { useState } from 'react';
import { Payout } from '../../types/campaign';
import PayoutInput from '../PayoutInput/PayoutInput';
import { createCampaign } from '../../services/api';

const CampaignForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [title,  setTitle] = useState('');
  const [landingPageUrl,  setLandingPageUrl] = useState('');
  const [payouts, setPayouts] = useState<Payout[]>([{ country: '', amount: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!title || !landingPageUrl) {
      setError('Title and landing page URL are required');
      return;
    }
    
    if (payouts.length === 0 || payouts.some(p => !p.country || p.amount <= 0)) {
      setError('At least one valid payout is required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createCampaign({ title, landingPageUrl, payouts });
      onSuccess();
      // Reset form
      setTitle('');
      setLandingPageUrl('');
      setPayouts([{ country: '', amount: 0 }]);
    } catch (err) {
      setError('Failed to create campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      
      <div>
        <label>Landing Page URL:</label>
        <input 
          type="url" 
          value={landingPageUrl} 
          onChange={(e) => setLandingPageUrl(e.target.value)} 
          required 
        />
      </div>
      
      <PayoutInput payouts={payouts} setPayouts={setPayouts} />
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  );
};

export default CampaignForm;
