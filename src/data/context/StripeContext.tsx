import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

const StripeContext = ({ children }) => (
    <Elements stripe={stripePromise}>
        {children}
    </Elements>
);

export default StripeContext;
