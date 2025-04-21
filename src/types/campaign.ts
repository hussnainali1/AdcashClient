export interface Payout {
    country: string;
    amount: number;
  }
  
  export interface Campaign {
    _id: string;
    title: string;
    landingPageUrl: string;
    isRunning: boolean;
    payouts: Payout[];
    createdAt?: string;
    updatedAt?: string;
  }