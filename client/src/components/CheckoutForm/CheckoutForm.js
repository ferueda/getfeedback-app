import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const items = { id: 'credits', amount: 10 };

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

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="payment-form">
      <CardElement
        className="max-w-xs m-auto bg-gray-100 border border-solid border-gray-200 rounded py-3 px-2 shadow"
        id="card-element"
        onChange={handleChange}
      />
      {error && (
        <div className="card-error text-center" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? 'result-message text-center' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
      </p>
      {processing || disabled || succeeded ? (
        <button
          disabled
          className="block m-auto text-white border border-solid border-white rounded py-3 px-6 mt-3 bg-indigo-700 bg-opacity-50 outline-none cursor-not-allowed"
        >
          {processing ? 'Loading' : succeeded ? 'Success' : 'Buy Credits'}
        </button>
      ) : (
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className="block m-auto text-white border border-solid border-white rounded py-3 px-6 mt-3 bg-indigo-500 hover:bg-indigo-700 outline-none transition ease-out duration-200"
        >
          Buy Credits
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
