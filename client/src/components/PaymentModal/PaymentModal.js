import React, { Children } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './PaymentModal.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentModal = () => {
  const absCentered = {
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  };

  return (
    <div role="container" id="modal-wrapper" className="modal-wrapper">
      <div id="modal-backdrop" className="modal-backdrop">
        <div id="modal-box" className="modal-box" style={absCentered}>
          <header className="modal__header">
            <h3 className="text-center modal__title">Payment Process</h3>
            <p className="modal__descp text-center">$5 for 5 credits</p>
          </header>
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
