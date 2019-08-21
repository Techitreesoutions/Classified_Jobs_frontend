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
import { deleteEmptyFromObject } from "../../../util/utilityFunctions";

import CreateThePost from "../Candidate/CreateThePost";

let formObj = {};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "10px 0 0 0",
    fontSize: "14px"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: "center"
  },
  StepLbl: {},
  ResetBtn: { backgroundColor: "#f2f2f2" },
  ResetBtnBdr: { borderTop: "1px solid #ddd", padding: "10px 0" }
}));

function getSteps() {
  return [
    "Job Details",
    "Company details",
    "Summary",
    "Preview",
    "Create the post"
  ];
}

function getStepContent(stepIndex, handleNext, handleJobBack, handleComplete) {
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
          activeStep={1}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
          steps={steps}
        />
      );
    case 2:
      return (
        <DescriptionForJobPostForm
          activeStep={2}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
          steps={steps}
        />
      );
    case 3:
      return (
        <JobPostPreview
          activeStep={3}
          dataObject={formObj}
          handleNext={handleNext}
          handleJobBack={handleJobBack}
          steps={steps}
        />
      );
    case 4:
      return (
        <CreateThePost
          dataObject={formObj}
          activeStep={4}
          handleNext={handleComplete}
          handleBack={handleJobBack}
          steps={steps}
        />
      );
    default:
      return "Preview";
  }
}

export default function HorizontalLabelPositionBelowStepper({
  handleClose,
  handleSave
}) {
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

    delete formObj.skillsOptionList;
    // Removing all values which is undefined/null/empty
    formObj = deleteEmptyFromObject(formObj);

    handleSave(formObj);
    //we need to close the pop up
    handleClose();
    //reset the form
    handleReset();
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

  function handleJobBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    //need to clear the old states stored
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step
            key={label}
            className={classes.step}
            classes={{ completed: classes.completed }}
          >
            <StepLabel className={classes.StepLbl}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep + 1 === steps.length ? (
          <div className={classes.StepperBottom}>
            <Typography className={classes.instructions}>
              All steps completed.
              <br />
              Note:
              <br />
              The post you previewed will not be allowed to delete or update by
              you.
              <br />
              If you want to delete or update the post;
              <br />
              please mail us the details at hello@techitree.com.
            </Typography>
            {getStepContent(
              activeStep,
              handleNext,
              handleJobBack,
              handleComplete
            )}
            <div className={classes.ResetBtnBdr}>
              <Button onClick={handleReset} className={classes.ResetBtn}>
                Reset
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {getStepContent(
              activeStep,
              handleNext,
              handleJobBack,
              handleComplete
            )}
            <div className={classes.ResetBtnBdr}>
              <Button onClick={handleReset} className={classes.ResetBtn}>
                Reset
              </Button>
            </div>
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
