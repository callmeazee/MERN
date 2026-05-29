import { useState } from "react";

const Ex49 = () => {
  const [settings, setSettings] = useState({
    notification: false,
    darkmode: true,
    payment: false,
  });

  const handleChange = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.checked;
     
       

    setSettings({
      ...settings,
      [key]: value,
    });

    
  };
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      Create an object state that stores multiple settings and updates only
      selected values. <h1 className="font-medium text-2xl text-center"></h1>
      <div className="flex gap-3">
        <input
          type="checkbox"
          name="notification"
          onChange={handleChange}
          checked={settings.notification}
        />
        <label> Notification </label>
        <input
          type="checkbox"
          name="darkmode"
          onChange={handleChange}
          checked={settings.darkmode}
        />
        <label>Dark Mode</label>
        <input
          type="checkbox"
          name="payment"
          onChange={handleChange}
          checked={settings.payment}
        />
        <label>Payment Checkout</label>
      </div>
      <div>
        <h2>Notification: {settings.notification.toString()}</h2>
        <h2>Dark Mode: {settings.darkmode.toString()}</h2>
        <h2>Payment: {settings.payment.toString()}</h2>
      </div>
    </div>
  );
};

export default Ex49;
