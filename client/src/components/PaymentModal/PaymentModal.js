import React, { Children, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './PaymentModal.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentModal = ({ isVisible, setIsVisible }) => {
  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  if (isVisible) {
    return (
      <div role="container" id="modal-wrapper" className="modal-wrapper">
        <div id="modal-backdrop" className="modal-backdrop" onClick={closeModal}>
          <div id="modal-box" className="modal-box">
            <header className="modal__header">
              <h3 className="text-center modal__title">Secure Payment Process</h3>
              <p className="modal__descp text-center">$5 for 5 credits</p>
            </header>
            <Elements stripe={promise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentModal;
