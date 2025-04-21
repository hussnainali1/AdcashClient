import axios from 'axios';
import { Payout } from '../types/campaign';

const API_URL = 'http://localhost:5000/api/campaigns';

export const createCampaign = async (campaignData: {
  title: string;
  landingPageUrl: string;
  payouts: Payout[];
}) => {
  const response = await axios.post(API_URL, campaignData);
  return response.data;
};

export const toggleCampaignStatus = async (id: string) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle-status`);
  return response.data;
};

export const getCampaigns = async (filters?: {
  title?: string;
  landingPageUrl?: string;
  isRunning?: string;
}) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};
