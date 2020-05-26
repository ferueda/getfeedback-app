import React, { Children } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentModal = () => {
  const absCentered = {
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  };

  return (
    <div role="container" id="modal-wrapper" className="fixed inset-0 shadow">
      <div id="modal-backdrop" className="fixed inset-0 z-50 bg-black bg-opacity-50">
        <div id="modal-box" className="absolute w-1/4 h-56 bg-white" style={absCentered}>
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
