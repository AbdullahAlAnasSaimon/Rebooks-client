import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ product }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { product_price, user_name, user_email, _id, productID } = product;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://ebooks-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ product_price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [product_price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user_name,
            email: user_email
          },
        },
      },
    );

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {

      const payment = {
        price: product_price,
        transactionId: paymentIntent.id,
        email: user_email,
        bookedId: _id,
        productID

      }

      fetch(`https://ebooks-server.vercel.app/payment`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
      .then(res => res.json())
      .then(data => {
        toast.success('Payment Successfull');
        setTransactionId(paymentIntent.id);
      })


      // store payment infor in db

    }
    setProcessing(false);

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-xs btn-primary mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {
        <p className='mt-5 inline-block'> TrxId: {transactionId}</p>
      }
    </>

  );
};

export default CheckoutForm;