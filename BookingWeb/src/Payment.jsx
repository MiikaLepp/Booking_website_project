import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51QqwslPfORZMqnCyNpec2unq4gRzDXOJyVMy4O8dl1YDfP5XMvZVonfPMMaHGnOMpNe6BiNS1l57fdgY4swfJEE500esZM1IMP');
const Payment = () => {
  return (
    <div>
      <h1>Stripe Payment Example</h1>
      {/* Wrap the CheckoutForm component with the Elements component and provide the Stripe promise */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
export default Payment;