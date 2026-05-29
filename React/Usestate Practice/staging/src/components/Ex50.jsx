import { useState } from "react";

const Ex50 = () => {
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
    <div
      className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4"
      style={{
        background: settings.darkmode ? "#323232" : "#f5f5f5",
        color: settings.darkmode ? "white" : "black",
      }}>
      Build a settings page where users can enable or disable different options
      dynamically. <h1 className="font-medium text-2xl text-center"></h1>
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

        {settings.notification && (
          <div className=" flex bg-blue-400 rounded-lg p-6 fixed bottom-12">
            info: We are getting back soon in future
          </div>
        )}
      </div>
    </div>
  );
};

export default Ex50;