import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const initialOptions = {
  clientId: "test",
  currency: "USD",
  intent: "capture",
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
