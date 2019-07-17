import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  InputLabel,
  InputAdornment,
  Input,
  FormHelperText,
  Grid,
  Checkbox,
  Fab,
  Switch,
  Popover
} from "@material-ui/core";
// Icons
import Person from "@material-ui/icons/Person";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import InputField from "../../../components/Forms/InputField";
import { red } from "@material-ui/core/colors";

class CompanyDetailForm extends Component {
 
  componentWillMount = () => {
    const { dataObject } = this.props;
    this.setState({
      companyName: dataObject.companyName,
    email: dataObject.email,
    phone: dataObject.phone,
    hidePersonalInfo: dataObject.hidePersonalInfo,
    showInfoPopup: dataObject.showInfoPopup,
    setAnchorEl: ""
    });
  };

  validateUserInput = () => {
    if (!this.state.companyName) {
      this.setState({ errorMessage: "Company Name - Required" });
      return;
    }
    if (this.state.companyName.length < 2) {
      this.setState({
        errorMessage: "Company Name - Minimum be 2 characters or more"
      });
      return;
    }

    if (this.state.phone === "" && this.state.email === "" || (this.state.phone === undefined && this.state.email === undefined)) {
      this.setState({
        errorMessage: "Email or Contact Number, one of them is required"
      });
      return;
    }

    if (
      this.state.email !== "" && this.state.email !== undefined &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)
    ) {
      this.setState({
        errorMessage: "Email - Invalid email address"
      });
      return;
    }

    return true;
  };

  handleNext = event => {
    const { classes, activeStep, handleJobBack, steps, handleNext } = this.props;
    const formValidated = this.validateUserInput();

    if (formValidated === true) {
      handleNext(this.state);
    }
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    this.setState({ [name]: value });
  }
  handleSwitch = (event, checekd) => {
    const name = event.target.name;
    console.log(name, checekd);

    this.setState({ [name]: checekd });
  };

  handleInfoClick = event => {
    this.setState({ showInfoPopup: true, setAnchorEl: event.currentTarget });
  };

  handleInfoClose = () => {
    this.setState({ showInfoPopup: false, setAnchorEl: null });
  };

  render() {
    const { classes, activeStep, handleJobBack, steps } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes.margin} />
        <div className={classes.margin}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel>Company Name*</InputLabel>
            <Input
              name="companyName"
              value={this.state.companyName}
              endAdornment={
                <InputAdornment position="end">
                  <Person />
                </InputAdornment>
              }
              autoComplete={true}
              onChange={event => this.handleUserInput(event)}
            />
          </FormControl>
        </div>

        <div className={classes.margin}>
          <FormControl
            fullWidth
            className={(classes.margin, classes.textField)}
          >
            <InputLabel>Email</InputLabel>
            <Input
              name="email"
              value={this.state.email}
              endAdornment={
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              }
              autoComplete={true}
              onChange={event => this.handleUserInput(event)}
            />
          </FormControl>
        </div>
        <div className={classes.margin}>
          <FormControl
            fullWidth
            className={(classes.margin, classes.textField)}
          >
            <InputLabel>Contact Number</InputLabel>
            <Input
              name="phone"
              value={this.state.phone}
              endAdornment={
                <InputAdornment position="end">
                  <Phone />
                </InputAdornment>
              }
              autoComplete={true}
              onChange={event => this.handleUserInput(event)}
            />
          </FormControl>
        </div>
        <div className={classes.margin}>
          <Switch
            name="hidePersonalInfo"
            value={this.state.hidePersonalInfo}
            checekd={this.state.hidePersonalInfo}
            onChange={this.handleSwitch}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          {"Hide Company's detail in Job Post"}
          <span className={classes.infoButton}>
            <SpeakerNotes onClick={this.handleInfoClick} />
            <Popover
              id={"shareInfo"}
              open={this.state.showInfoPopup}
              anchorEl={this.state.setAnchorEl}
              onClose={this.handleInfoClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
            >
              <div className={classes.infoPopup}>
                {
                  "Company Name, Email and contact number will not be shown to public."
                }
                <br />
                {"You will be notified by us via your contact information."}
              </div>
            </Popover>
          </span>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2}>
            <Grid item xs={8} className={classes.lblArea}>
              <span className={classes.errorMessage}>
                {this.state.errorMessage}
              </span>
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              <Button
                onClick={handleJobBack}
                className={classes.backButton}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}

const styles = theme => ({
  margin: {
    paddingBottom: 10
  },
  errorMessage: {
    color: "#F00"
  },
  textField: {
    "&:-webkit-autofill": {
      boxShadow: "0 0 0 2px white inset",
      color: theme.palette.primary.main,
      fontSize: 14,
      width: "100%"
    }
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  radioLabel: {
    paddingRight: 20
  },
  formControlLabel: {
    marginBottom: 0
  },
  infoButton: {
    padding: 10,
    width: 35,
    height: 20
  },
  infoPopup: {
    padding: 10,
    height: 65
  }
});

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 2) {
    errors.firstName = "Minimum be 2 characters or more";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length < 2) {
    errors.lastName = "Minimum be 2 characters or more";
  }
  return errors;
};

CompanyDetailForm = reduxForm({
  form: "CompanyDetailForm",
  validate
})(CompanyDetailForm);

export default withStyles(styles)(CompanyDetailForm);

CompanyDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleJobBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
