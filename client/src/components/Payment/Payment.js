import React, { useContext } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const Payment = ({ children }) => {
  const { dispatchUserFetch } = useContext(UserContext);

  const handleToken = async (token) => {
    const res = await axios.post('/api/stripe', token);

    dispatchUserFetch({
      type: 'FETCH_USER',
      payload: res.data,
    });
  };

  return (
    <StripeCheckout
      name="getFeedback"
      description="$5 for 5 credits"
      amount={500}
      token={(token) => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      {children}
    </StripeCheckout>
  );
};

export default Payment;
