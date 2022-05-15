import './App.css';
import Wallet from './payment/Wallet';
import { useState } from 'react';

function App() {
  const [subscription, setSubscription] = useState({
    name: "",
    price: null
  })

  return (
    <div className="App">
      {
        subscription.name? <h2>Your Subscription: {subscription.name}</h2> : ""
      }
      <Wallet subscription={subscription} setSubscription={setSubscription} />
    </div>
  );
}

export default App;
