import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ProfessionalDetailsForm from "./ProfessionalDetailsForm";
import DescriptionForm from "./DescriptionForm";
import Preview from "./Preview";

let formObj = {};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
}));

function getSteps() {
  return ["Personal details", "Professional details", "Summary", "Preview"];
}

function getStepContent(stepIndex, handleNext, handleBack) {
  const steps = getSteps();
  //stepIndex = 2;
  switch (stepIndex) {
    case 0:
      return (
        <PersonalDetailsForm
          activeStep={0}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    case 1:
      return (
        <ProfessionalDetailsForm
          activeStep={1}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    case 2:
      return (
        <DescriptionForm
          activeStep={1}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    case 3:
      return (
        <Preview
          dataObject={formObj}
          activeStep={1}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    default:
      return "Preview";
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext(objParam) {
    formObj = Object.assign(formObj, objParam);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    console.log(formObj);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, handleNext, handleBack)}
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
