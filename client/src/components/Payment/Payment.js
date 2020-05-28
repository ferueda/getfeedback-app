import React, { useContext } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const Payment = () => {
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
      <button className="btn btn--active">Add Credits</button>
    </StripeCheckout>
  );
};

export default Payment;
