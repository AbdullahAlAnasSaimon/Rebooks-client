import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const product = useLoaderData();
  return (
    <div>
      <h2 className='text-2xl font-semibold'>Payment for {product.product_name}</h2>
      <p className='text-lg'>Please pay ${product.product_price} for get the book.</p>
      <div className='w-96 my-10'>
        <Elements stripe={stripePromise}>
          <CheckoutForm 
          product={product}/>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;