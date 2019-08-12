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
import CreateThePost from "./CreateThePost";

let formObj = {};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",fontSize:"14px",
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
  return ["Personal details", "Professional details", "Summary", "Preview","Create the post"];
}

function getStepContent(stepIndex, handleNext, handleBack,handleComplete) {
  const steps = getSteps();
  //stepIndex = 2;
  switch (stepIndex) {
    case 0:
      return (
        <PersonalDetailsForm
        dataObject={formObj}
          activeStep={0}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    case 1:
      return (
        <ProfessionalDetailsForm
        dataObject={formObj}
          activeStep={1}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    case 2:
      return (
        <DescriptionForm
        dataObject={formObj}
          activeStep={2}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
    case 3:
      return (
        <Preview
          dataObject={formObj}
          activeStep={3}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={steps}
        />
      );
      case 4:
        return (
          <CreateThePost
            dataObject={formObj}
            activeStep={4}
            handleNext={handleComplete}
            handleBack={handleBack}
            steps={steps}
          />
        );
    default:
      return "Preview";
  }
}

export default function HorizontalLabelPositionBelowStepper({handleClose,handleSave}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    console.log("old form object",formObj);
    
      delete formObj.skillsOptionList;
       var valueArray = Object.values(formObj);
       var keyAaray = Object.keys(formObj);
       console.log("form object",formObj);
      valueArray.map((item,index) => {
        let temp = keyAaray[index]
        if(item === undefined || item === "" || item === null)
        {
          delete formObj[temp];
        }
      });
      console.log("new form object",formObj);
      handleSave(formObj);
      handleClose();
      
  }

  function handleNext(objParam) {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    formObj = Object.assign(formObj, objParam);
    //setActiveStep(prevActiveStep => prevActiveStep + 1);
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
        {activeStep+1 === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed.
              Note:
              The post you previewed will not be allowed to delete or update by you.
              If you want to delete or update the post; please mail us the details at hello@techitree.com.
            </Typography>
            {getStepContent(activeStep, handleNext, handleBack,handleComplete)}
            <Button onClick={handleReset}>Reset</Button>            
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, handleNext, handleBack,handleComplete)}
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
