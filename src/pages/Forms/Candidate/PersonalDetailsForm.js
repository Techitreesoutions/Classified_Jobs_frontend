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

class PersonalDetailsForm extends Component {

  validateUserInput = () => {
    if (!this.state.firstName) {
      this.setState({ errorMessage: "First Name - Required" });
      return;
    }
    if (this.state.firstName.length < 2) {
      this.setState({
        errorMessage: "First Name - Minimum be 2 characters or more"
      });
      return;
    }

    if (this.state.lastName && this.state.lastName.length < 2) {
      this.setState({
        errorMessage: "Last Name - Minimum be 2 characters or more"
      });
      return;
    }

    if (this.state.gender === "") {
      this.setState({
        errorMessage: "Gender - Required"
      });
      return;
    }

    if (this.state.phone === "" && this.state.email === "") {
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

  componentWillMount = () => {
    const { dataObject } = this.props;
    this.setState({
      firstName:dataObject.firstName,
      lastName:dataObject.lastName,
      gender:dataObject.gender,
      email: dataObject.email,
      phone: dataObject.phone,
      hidePersonalInfo: dataObject.hidePersonalInfo,
      showInfoPopup: dataObject.showInfoPopup,
      setAnchorEl: ""
    });
  };

  handleNext = event => {
    const { classes, activeStep, handleBack, steps, handleNext } = this.props;
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
    const { classes, activeStep, handleBack, steps, dataObject } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes.margin}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel>First Name*</InputLabel>
            <Input
              name="firstName"
              value={this.state.firstName}
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
          <FormControl fullWidth className={classes.textField}>
            <InputLabel>Last Name</InputLabel>
            <Input
              name="lastName"
              value={this.state.lastName}
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
        <span className={classes.radioGroup}>
          <span className={classes.radioLabel}>{"Gender"}</span>
          <div className="input">
            <Radio
              id="Male"
              type="radio"
              value={"Male"}
              name="gender"
              checked={this.state.gender == "Male"}
              onChange={event => this.handleUserInput(event)}
            />
            {"Male"}
          </div>
          <div className="input">
            <Radio
              id="Female"
              type="radio"
              value={"Female"}
              name="gender"
              checked={this.state.gender === "Female"}
              onChange={event => this.handleUserInput(event)}
            />
            {"Female"}
          </div>
          <div className="input">
            <Radio
              id="Others"
              type="radio"
              value={"Others"}
              name="gender"
              checked={this.state.gender === "Others"}
              onChange={event => this.handleUserInput(event)}
            />
            {"Others"}
          </div>
        </span>
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
          {"Hide my personal detail"}
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
                  "Your Name, Email and contact number will not be shown to public."
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
                disabled={activeStep === 0}
                onClick={handleBack}
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

PersonalDetailsForm = reduxForm({
  form: "PersonalDetailsForm",
  validate
})(PersonalDetailsForm);

export default withStyles(styles)(PersonalDetailsForm);

PersonalDetailsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
