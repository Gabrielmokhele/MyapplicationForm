import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const multiStepContext = React.createContext();
const StepContext = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [FinalData, setFinalData] = useState([]);
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const [userId, setUserId] = useState('');

  const setStep = (step) => setCurrentStep(step);

  const submitData = async () => {
    try {
      setUserData("");
      setStep(1);
      navigate("/dashboard");
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
          registerEmail, 
          setRegisterEmail, 
          loginEmail, 
          setloginEmail, 
          userId, 
          setUserId,
        }}
      >
        {children}
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;

