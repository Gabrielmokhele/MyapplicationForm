import React, { useContext } from "react";
import Header from "./Component/Header/header";
import FirstStep from "./Component/FirstStep";
import SecondStep from "./Component/SecondStep";
import ThirdStep from "./Component/ThirdStep";
import { Stepper, StepLabel, Step, Container, Stack } from "@mui/material";
import { multiStepContext } from "./StepContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { currentStep, FinalData } = useContext(multiStepContext);

  const ShowStep = (step) => {
    console.log(step);
    if (step === 1) {
      return <FirstStep />;
    } else if (step === 2) {
      return <SecondStep />;
    } else if (step === 3) {
      return <ThirdStep />;
    }
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Stepper
            className="centre-stepper"
            activeStep={currentStep - 1}
            orientation="horizontal"
          >
            <Step>
              <StepLabel></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step>
          </Stepper>

          <Stack sx={{ mt: 4 }}>{ShowStep(currentStep)}</Stack>
        </Container>
      </QueryClientProvider>
    </div>
  );
}

export default App;
