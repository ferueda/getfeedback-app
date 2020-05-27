import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './PaymentModal.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentModal = ({ isVisible, setIsVisible }) => {
  // const openModal = () => {
  //   setIsVisible(true);
  // };

  const closeModal = () => {
    setIsVisible(false);
  };

  if (isVisible) {
    return (
      <div className="modal-wrapper">
        <div className="modal-backdrop" onClick={closeModal} />
        <div className="modal-box">
          <header className="modal__header">
            <h3 className="text-center modal__title">Secure Payment</h3>
            <p className="modal__descp text-center">$5 for 5 credits</p>
            <button className="modal__close-btn" onClick={closeModal}>
              X
            </button>
          </header>
          <section className="modal__content">
            <Elements stripe={promise}>
              <CheckoutForm />
            </Elements>
          </section>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentModal;
