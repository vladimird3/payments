import React, { useEffect, useState } from 'react'
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {STRIPE_SERVER_URL, PAYMENT_FREE, PAYMENT_SECOND_PLAN, PAYMENT_THIRD_PLAN, PAYMENT_FOURTH_PLAN, INDIVIDUAL_PLAN, INVESTOR_PLAN, PARTNER_PLAN, LEADER_PLAN} from "../constants/constants";
import "./Payment.css";

function Payment({users, setHide, stopPropagation, setSubscription, subscription}) {
  const stripe = useStripe();
  const elements = useElements();
  const [fullName, setFullName] = useState("");
  const [paymentAmout, setPaymentAmout] = useState(0);
  const [selectedPlan, setselectedPlan] = useState(false);
  const [email, setEmail] = useState("");

  const planSetting = (planName, planPrice) => {
    setSubscription({name: planName, price: planPrice});
  }

  const getUserName = () => {
    /*if (users){  
      return users.map(user => setFullName(user.by))
    }
    else return;*/
    setFullName(users)
  }

  useEffect(() => {
    getUserName();
  },[])

  const keyPressHandler = (e) => {
    if(e.keyCode === 13) {  
      if (fullName === "" || email === "" ) {
        alert("Enter Full Name and Email!");
      }
      else return handleSubmit;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(paymentAmout <=0) {
      alert("Thank you for subscription");
      setHide(true)
    }
    else {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
    })
    if(!error) {
        const {id} = paymentMethod
        fetch(STRIPE_SERVER_URL, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: paymentAmout* 100,
            description: subscription.name,
            receipt_email: email,
            recipientName: fullName,
            id: id,
          })
        }).then(()=> {
            alert("Successfull payment");
            setHide(true);
        }).catch((error)=> {
          console.log(error.message)
          alert("Opps, something went wrong, try again");
        })
      }
      else {
        if(CardElement)  alert("Check card number");
        else alert("Error, contact administrators");
      }
    }
  }

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#f14207",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#109935" },
            "::placeholder": { color: "#1474f2" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
  }

  return (
   <form 
    onSubmit={handleSubmit} 
    className="formContent" 
    onClick={stopPropagation}
    onKeyDown={(e) => keyPressHandler(e)}
   >
     <p className="closeBtn" onClick={() => setHide(true)}>X</p>
     <p>Choose your subscription plan:</p>
     <div className="paymentPack">
      <span onClick={()=> { setPaymentAmout(PAYMENT_FREE); setselectedPlan(false);  planSetting(INDIVIDUAL_PLAN, PAYMENT_FREE)}} title={`Free subscription plan`}>{INDIVIDUAL_PLAN}</span>
      <span onClick={()=> { setPaymentAmout(PAYMENT_SECOND_PLAN); setselectedPlan(true); planSetting(PARTNER_PLAN, PAYMENT_SECOND_PLAN)}} title={`${PARTNER_PLAN} plan for $${PAYMENT_SECOND_PLAN}`} >{PARTNER_PLAN}</span>
      <span onClick={()=> { setPaymentAmout(PAYMENT_THIRD_PLAN); setselectedPlan(true);  planSetting(LEADER_PLAN, PAYMENT_THIRD_PLAN)}} title={`${LEADER_PLAN} plan for $${PAYMENT_THIRD_PLAN}`}>{LEADER_PLAN}</span>
      <span onClick={()=> { setPaymentAmout(PAYMENT_FOURTH_PLAN); setselectedPlan(true);  planSetting(INVESTOR_PLAN, PAYMENT_FOURTH_PLAN)}} title={`${INVESTOR_PLAN} plan for $${PAYMENT_FOURTH_PLAN}`}>{INVESTOR_PLAN}</span>
     </div>
     {
       paymentAmout === 0? "" :  <CardElement options={CARD_OPTIONS} className="cardNumber" id="cardForPayment"/>
     }
     <div className="paymentInfo">
        <span className="paymentElement">
          <label htmlFor='fullName'>Full Name</label>
          <input id="fullName" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
        </span>
        <span className='paymentElement'>
          <label htmlFor='email'>Email</label>
          <input id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </span>
        <span className='paymentElement'>
          <label htmlFor='amount'>Amount</label>
          <input id="amount" value={`$ ${paymentAmout}`} className={selectedPlan===true? 'selectedPlan' : ""} disabled/>
        </span>
     </div>
     <button className='payBtn'>Pay</button>
   </form>
  )
}

export default Payment;