import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payments = () => {
  return (
    <Elements stripe={promise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payments;
