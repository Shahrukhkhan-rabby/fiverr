import React, { useEffect, useState } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm.jsx";

const stripePromise = loadStripe(
  "pk_test_51QclRxCctxdKj14xKY6fERiVTD5401ZAj8lusylQHO4MqLXdcE9cCGjBujzj1mozoArTSCCiB5yUTo9Gi7yBiXuB003MGh3uvr"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    )
      
    }
  </div>;
};

export default Pay;
