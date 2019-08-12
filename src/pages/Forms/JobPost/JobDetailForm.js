import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Select from "react-select";

import {
  FormControl,
  Button,
  InputLabel,
  InputAdornment,
  Input,
  Grid,
  Switch
} from "@material-ui/core";
// Icons
import Title from "@material-ui/icons/Title";
import Slider from "@material-ui/lab/Slider";

import CityList from "../../../data/cityList.json";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: 0,
    borderRadius: 0,
    borderBottom: "1px solid",
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
      borderBottom: "1px solid",
      borderRadius: 0
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isshowd ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "2px 0px"
  })
};
class JobDetailForm extends Component {

  componentWillMount = () => {
    const { dataObject } = this.props;
    
    if(Object.entries(dataObject).length === 0 && dataObject.constructor === Object){
      dataObject.experienceMin= 0;
      dataObject.experienceMax = 2;
      dataObject.salaryOfferMin = 0;
      dataObject.salaryOfferMax = 10;
    }

    if(dataObject.location !== undefined){
      dataObject.defaultLocation = dataObject.location.map(item => {
        return {value:item,label:this.getCityList().find(o=>o.value === item).label};
      });
    }
    this.setState({
      title: dataObject.title,
      experience: [dataObject.experienceMin,dataObject.experienceMax],
      location:dataObject.location,
      salaryOffer: [dataObject.salaryOfferMin,dataObject.salaryOfferMax],
      showExperience: dataObject.showExperience,
      showSalary: dataObject.showSalary,
      defaultLocation:dataObject.defaultLocation
    });
  };
  validateUserInput = () => {
    console.log(this.state.title);
    console.log(this.state.experience);
    console.log(this.state.location);
    console.log(this.state.salaryOffer);
    return true;
  };

  getCityList = () => {
    let cityListForSelect = [];
    CityList.push({ label: "Anywhere", value: "Anywhere" });
    CityList.map(item => {
      cityListForSelect.push({
        label: item.name + ", " + item.state,
        value: item.name
      });
    });
    return cityListForSelect;
  };

  getNumberList = maxValue => {
    let yearList = [];
    for (let i = 0; i <= maxValue; i++) {
      yearList.push({
        label: i,
        value: i
      });
    }
    return yearList;
  };

  getUnits = () => {
    return [
      { label: "Thousand", value: "Thousand" },
      { label: "Lacs", value: "Lacs" }
    ];
  };

  handleSelectChange = (value, event) => {
    console.log(value, event.name, Array.isArray(value));
    if (!Array.isArray(value)) {
      this.setState({
        [event.name]: value.value
      });
    } else if (Array.isArray(value)) {
      let list = [];
      list = value.map(item => {
        return item.value;
      });
      this.setState({
        [event.name]: list
      });
    }
  };

  handleNext = event => {
    const {handleNext } = this.props;
    const formValidated = this.validateUserInput();
    console.log(this.state.location);

    if (formValidated === true) {
      handleNext(this.state);
    }
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSwitch = (event, checekd) => {
    const name = event.target.name;
    console.log(name, checekd);

    this.setState({ [name]: checekd });
  };

  handleSalaryRangeChange = (event, value) => {
    this.setState({
      salaryOffer: value,
      salaryOfferMax:value[1],
      salaryOfferMin:value[0]
    });
    console.log("Salary", value[0], value[1]);
    
  };
  handleExperienceRangeChange = (event, value) => {
    this.setState({
      experience: value,
      experienceMax:value[1],
      experienceMin:value[0]
    });
    console.log("Experience", value[0], value[1]);
  };

  render() {
    const { classes, activeStep,  steps } = this.props;
    const cityList = this.getCityList();
    return (
      <form>
        <div className={classes.margin}>
          <FormControl
            fullWidth
            className={(classes.margin, classes.textField)}
          >
            <InputLabel>Title / Designation</InputLabel>
            <Input
              name="title"
              value={this.state.title}
              endAdornment={
                <InputAdornment position="end">
                  <Title />
                </InputAdornment>
              }
              autoComplete={true}
              onChange={event => this.handleUserInput(event)}
            />
          </FormControl>
        </div>

        <div className={classes.margin}>
          <Grid container>
            <Grid item xs={12}>
              <Select
                name="location"
                closeMenuOnSelect={true}
                options={cityList}
                selectedValue={this.state.location}
                defaultValue={this.state.defaultLocation}
                onChange={this.handleSelectChange}
                placeholder={"Select Job Location"}
                maxMenuHeight={100}
                isMulti={true}
                styles={customStyles}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Switch
                name="showExperience"
                checked={this.state.showExperience}
                value={this.state.showExperience}
                onChange={this.handleSwitch}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid item xs={3} className={classes.lblArea}>
              Experience
            </Grid>
            <Grid item xs={5} className={classes.lblArea}>
              <Slider
                aria-label="range-slider"
                name="experience"
                value={this.state.experience}
                onChange={this.handleExperienceRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelFormat={value => {
                  return `${value}`;
                }}
                max={20}
                disabled={!this.state.showExperience}
              />
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              Years
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Switch
                name="showSalary"
                value={this.state.showSalary}
                checked={this.state.showSalary}
                onChange={this.handleSwitch}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid item xs={3} className={classes.lblArea}>
              Salary Offer
            </Grid>
            <Grid item xs={5} className={classes.lblArea}>
              <Slider
                aria-label="range-slider"
                name="salaryOffer"
                value={this.state.salaryOffer}
                onChange={this.handleSalaryRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelFormat={value => {
                  return `${value}K`;
                }}
                max={100}
                disabled={!this.state.showSalary}
              />
            </Grid>

            <Grid item xs={2} className={classes.lblArea}>
              Per Month
            </Grid>
          </Grid>
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
    padding: 10
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
  lblArea: {
    display: "flex",
    alignItems: "right"
  }
});

export default withStyles(styles)(JobDetailForm);

JobDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleJobBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
