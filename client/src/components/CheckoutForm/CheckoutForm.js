import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import './CheckoutForm.css';

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
      <fieldset>
        <div className="form__input-container">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input type="string" id="name" placeholder="Jane Doe" className="form__input form__name" required />
        </div>
        <div className="form__input-container">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input type="email" id="email" placeholder="janedoe@email.com" className="form__input form__email" required />
        </div>
      </fieldset>
      <fieldset>
        <CardElement className="form__card" id="card-element" onChange={handleChange} />
      </fieldset>
      {error && (
        <div className="card-error text-center" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
      </p>
      {processing || disabled || succeeded ? (
        <button disabled className="">
          {processing ? 'Loading' : succeeded ? 'Success' : 'Buy Credits'}
        </button>
      ) : (
        <button disabled={processing || disabled || succeeded} id="submit" className="">
          Buy Credits
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
