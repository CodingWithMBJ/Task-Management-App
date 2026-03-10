import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
      }}
    >
      <TaskProvider>
        <App />
      </TaskProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
