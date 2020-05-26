import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const items = [{ id: 'xl-tshirt' }];

    axios
      .post('http://localhost:5000/create-payment-intent', { items })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  console.log(clientSecret);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" onChange={handleChange} />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">{processing ? 'Loading' : 'Pay'}</span>
      </button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
      </p>
    </form>
  );
};

export default CheckoutForm;
