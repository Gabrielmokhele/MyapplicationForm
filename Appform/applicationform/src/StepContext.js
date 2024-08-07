import React, { useState } from "react";
import App from "./App";
import axios from "axios";

export const multiStepContext = React.createContext();
const StepContext = () => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [FinalData, setFinalData] = useState([]);

  const LOCAL_API_URL = "http://localhost:5001/myfiles";
  const submitData = async () => {
    try {
      const response = await axios.post(`${LOCAL_API_URL}`, { ...userData });
      setFinalData((FinalData) => [...FinalData]);
      console.log(userData);
      setUserData("");
      setStep(1);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setStep,
          userData,
          setUserData,
          FinalData,
          setFinalData,
          submitData,
        }}
      >
        <App />
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
