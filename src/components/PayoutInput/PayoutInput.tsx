import React from 'react';
import { Payout } from '../../types/campaign';

interface PayoutInputProps {
  payouts: Payout[];
  setPayouts: React.Dispatch<React.SetStateAction<Payout[]>>;
}

const PayoutInput: React.FC<PayoutInputProps> = ({ payouts, setPayouts }) => {
  const handlePayoutChange = (index: number, field: keyof Payout, value: string | number) => {
    const newPayouts = [...payouts];
    newPayouts[index] = { ...newPayouts[index], [field]: value };
    setPayouts(newPayouts);
  };

  const addPayout = () => {
    setPayouts([...payouts, { country: '', amount: 0 }]);
  };

  const removePayout = (index: number) => {
    if (payouts.length <= 1) return;
    const newPayouts = [...payouts];
    newPayouts.splice(index, 1);
    setPayouts(newPayouts);
  };

  return (
    <div className="payouts-container">
      <label>Payouts:</label>
      {payouts.map((payout, index) => (
        <div key={index} className="payout-input">
          <input
            type="text"
            placeholder="Country code (e.g., US)"
            value={payout.country}
            onChange={(e) => handlePayoutChange(index, 'country', e.target.value.toUpperCase())}
          />
          <input
            type="number"
            placeholder="Amount"
            value={payout.amount}
            onChange={(e) => handlePayoutChange(index, 'amount', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
          />
          <button type="button" onClick={() => removePayout(index)} disabled={payouts.length <= 1}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addPayout}>
        Add Payout
      </button>
    </div>
  );
};

export default PayoutInput;