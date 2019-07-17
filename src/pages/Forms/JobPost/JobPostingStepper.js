import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import JobDetailForm from "./JobDetailForm";
import CompoanyDetailForm from "./CompanyDetailForm";
import DescriptionForJobPostForm from "./DescriptionForJobPostForm";
import JobPostPreview from "./JobPostPreview";

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
  return ["Job Details", "Company details", "Summary", "Preview"];
}

function getStepContent(stepIndex, handleNext, handleJobBack) {
  const steps = getSteps();

  switch (stepIndex) {
    case 0:
      return (
        <JobDetailForm
          activeStep={0}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
          steps={steps}
        />
      );
    case 1:
      return (
        <CompoanyDetailForm
          activeStep={0}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
          steps={steps}
        />
      );
    case 2:
      return (
        <DescriptionForJobPostForm
          activeStep={0}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
          steps={steps}
        />
      );
    case 3:
      return (
        <JobPostPreview
          activeStep={0}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
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

  function handleJobBack() {
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
            {getStepContent(activeStep, handleNext, handleJobBack)}
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
