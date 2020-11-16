import React from "react";

import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
//import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="container p-2">
     
    <UserProvider>
      <Application />
      
      <div className="footer">
      <p></p>
      </div>
    </UserProvider>
    <ToastContainer />
    </div>
    

  );
}

export default App;
