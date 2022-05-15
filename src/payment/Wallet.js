import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment';
//import useUserSubscription from '../task/users/userHooks';
import "./Payment.css";
import { PUBLISH_KEY } from '../constants/constants';

export default function Wallet({/*itemId,*/ setSubscription, subscription}) {
    const stripePromise = loadStripe(PUBLISH_KEY);
    const [hide, setHide] = useState(true);
    //const { users } = useUserSubscription(itemId);

    const clickHandle = (e) => {
        e.preventDefault();
        setHide(!hide);
    }

    return (
        <span>
             <button className="payBtMenu" onClick={(e) => clickHandle(e)}>Pay</button>
             {
                hide === true? "" :
                <div className='paymentPopUp' onClick={(e) => clickHandle(e)}>
                    <Elements stripe={stripePromise}>
                        <Payment 
                            users = "Alex"
                            setHide={setHide} 
                            stopPropagation = {(e) => {e.stopPropagation()}}
                            setSubscription={setSubscription}
                            subscription={subscription}
                        />
                    </Elements>
                </div> 
             }    
        </span>
  )
}
